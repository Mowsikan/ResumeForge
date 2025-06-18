
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ResumeData } from '@/pages/Builder';

interface Resume {
  id: string;
  title: string;
  resume_data: ResumeData;
  template_id: string;
  created_at: string;
  updated_at: string;
}

interface DownloadedResume {
  id: string;
  title: string;
  resume_data: ResumeData;
  template_id: string;
  downloaded_at: string;
}

export const useResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [downloadedResumes, setDownloadedResumes] = useState<DownloadedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchResumes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to match our Resume interface using unknown as intermediate
      const typedResumes = (data || []).map(resume => ({
        ...resume,
        resume_data: resume.resume_data as unknown as ResumeData
      }));
      
      setResumes(typedResumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDownloadedResumes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('downloaded_resumes')
        .select('*')
        .order('downloaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching downloaded resumes:', error);
        setDownloadedResumes([]);
        return;
      }
      
      const typedDownloadedResumes = (data || []).map(resume => ({
        ...resume,
        resume_data: resume.resume_data as unknown as ResumeData
      }));
      
      setDownloadedResumes(typedDownloadedResumes);
    } catch (error) {
      console.error('Error fetching downloaded resumes:', error);
      setDownloadedResumes([]);
    }
  };

  const saveResume = async (resumeData: ResumeData, title?: string, resumeId?: string, templateId?: string) => {
    if (!user) return null;

    try {
      const payload = {
        user_id: user.id,
        title: title || 'Untitled Resume',
        resume_data: resumeData as any, // Cast to any to satisfy Json type
        template_id: templateId || 'modern',
        updated_at: new Date().toISOString(),
      };

      console.log('Saving resume with payload:', payload);

      let result;
      if (resumeId) {
        // Update existing resume
        const { data, error } = await supabase
          .from('resumes')
          .update(payload)
          .eq('id', resumeId)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
        console.log('Resume updated successfully:', result);
      } else {
        // Create new resume
        const { data, error } = await supabase
          .from('resumes')
          .insert(payload)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
        console.log('Resume created successfully:', result);
      }

      toast({
        title: "Success",
        description: resumeId ? "Resume updated successfully" : "Resume saved successfully",
      });

      await fetchResumes(); // Refresh the list
      return result;
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
      return null;
    }
  };

  const saveDownloadedResume = async (resumeData: ResumeData, title: string, templateId: string) => {
    if (!user) return null;

    try {
      const payload = {
        user_id: user.id,
        title: title,
        resume_data: resumeData as any,
        template_id: templateId,
        downloaded_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('downloaded_resumes')
        .insert(payload)
        .select()
        .single();
      
      if (error) throw error;

      await fetchDownloadedResumes(); // Refresh the downloaded resumes list
      return data;
    } catch (error) {
      console.error('Error saving downloaded resume:', error);
      return null;
    }
  };

  const deleteResume = async (resumeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });

      await fetchResumes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchResumes();
    fetchDownloadedResumes();
  }, [user]);

  return {
    resumes,
    downloadedResumes,
    loading,
    saveResume,
    saveDownloadedResume,
    deleteResume,
    refreshResumes: fetchResumes,
    refreshDownloadedResumes: fetchDownloadedResumes,
  };
};
