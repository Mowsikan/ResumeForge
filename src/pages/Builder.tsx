import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumePreview } from "@/components/ResumePreview";
import { useResumes } from "@/hooks/useResumes";
import { useAuth } from "@/hooks/useAuth";
import { TemplateSelector } from "@/components/TemplateSelector";
import { PersonalInfoInput } from "@/components/PersonalInfoInput";
import { SummaryInput } from "@/components/SummaryInput";
import { ExperienceInput } from "@/components/ExperienceInput";
import { EducationInput } from "@/components/EducationInput";
import { SkillsInput } from "@/components/SkillsInput";
import { LanguagesInput } from "@/components/LanguagesInput";
import { CertificationsInput } from "@/components/CertificationsInput";
import { ProjectsInput } from "@/components/ProjectsInput";
import { AchievementsInput } from "@/components/AchievementsInput";

export interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  grade: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  certifications: Certification[];
  projects: Project[];
  achievements: Achievement[];
}

interface Achievement {
  title: string;
  description: string;
}

const Builder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { saveResume, saveDownloadedResume } = useResumes();
  
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [resumeTitle, setResumeTitle] = useState("");
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isFromDownloaded, setIsFromDownloaded] = useState(false);
  const [downloadedResumeId, setDownloadedResumeId] = useState<string | null>(null);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [{ position: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", school: "", year: "", grade: "" }],
    skills: [],
    languages: [],
    certifications: [{ name: "", issuer: "", year: "" }],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    achievements: [],
  });

  useEffect(() => {
    // Check for state passed from Dashboard
    if (location.state) {
      const { resumeData, title, resumeId, templateId, isFromDownloaded, downloadedResumeId } = location.state;
      
      if (resumeData) {
        setResumeData(resumeData);
        setResumeTitle(title || "Untitled Resume");
        setCurrentResumeId(resumeId || null);
        setCurrentTemplate(templateId || "modern");
        setIsFromDownloaded(isFromDownloaded || false);
        setDownloadedResumeId(downloadedResumeId || null);
      }
    } else {
      // Check for template parameter in URL
      const params = new URLSearchParams(location.search);
      const templateParam = params.get('template');
      if (templateParam) {
        setCurrentTemplate(templateParam);
      }
    }
  }, [location]);

  const handleSaveResume = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your resume",
        variant: "destructive",
      });
      return;
    }

    if (!resumeTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your resume",
        variant: "destructive",
      });
      return;
    }

    const result = await saveResume(resumeData, resumeTitle, currentResumeId, currentTemplate);
    
    if (result) {
      setCurrentResumeId(result.id);
      setIsFromDownloaded(false);
    }
  };

  const handleDownload = async () => {
    try {
      // Logic for downloading the resume as PDF would go here
      // This is a placeholder for the actual PDF generation and download
      
      toast({
        title: "Download Started",
        description: "Your resume is being downloaded",
      });
      
      // Save to downloaded_resumes table if user is logged in
      if (user) {
        await saveDownloadedResume(resumeData, resumeTitle || "Untitled Resume", currentTemplate);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <TemplateSelector 
                currentTemplate={currentTemplate} 
                onTemplateChange={setCurrentTemplate}
              />
            </div>

            {/* Save Resume Section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="Enter resume title..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  onClick={handleSaveResume} 
                  disabled={!resumeTitle.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentResumeId ? 'Update Resume' : 'Save Resume'}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4">
                <PersonalInfoInput data={resumeData} onChange={setResumeData} />
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary" className="space-y-4">
                <SummaryInput data={resumeData} onChange={setResumeData} />
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                <ExperienceInput data={resumeData} onChange={setResumeData} />
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                <EducationInput data={resumeData} onChange={setResumeData} />
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <SkillsInput data={resumeData} onChange={setResumeData} />
                <LanguagesInput data={resumeData} onChange={setResumeData} />
                <CertificationsInput data={resumeData} onChange={setResumeData} />
                <AchievementsInput 
                  achievements={resumeData.achievements}
                  onChange={(achievements) => setResumeData(prev => ({ ...prev, achievements }))}
                />
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                <ProjectsInput data={resumeData} onChange={setResumeData} />
              </TabsContent>
            </Tabs>

            {/* Download Button */}
            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={handleDownload} 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Download Resume as PDF
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: '133.33%' }}>
                <ResumePreview data={resumeData} template={currentTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
