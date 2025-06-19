
import { useResumes } from "@/hooks/useResumes";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ResumePreview } from "@/components/ResumePreview";

const DownloadedResumes = () => {
  const { user } = useAuth();
  const { downloadedResumes, deleteDownloadedResume, loading } = useResumes();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<any>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to view your downloaded resumes
          </h2>
          <p className="text-gray-600 mb-6">
            Create an account to access your downloaded resumes
          </p>
          <Button onClick={() => setShowAuthModal(true)}>
            Sign In / Sign Up
          </Button>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }

  const handleEdit = (resumeId: string) => {
    navigate(`/builder?downloaded=${resumeId}`);
  };

  const handlePreview = (resume: any) => {
    setSelectedResume(resume);
    setShowPreviewModal(true);
  };

  const handleDelete = async (resumeId: string) => {
    if (window.confirm("Are you sure you want to delete this downloaded resume?")) {
      await deleteDownloadedResume(resumeId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your downloaded resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Downloaded Resumes</h1>
            <p className="text-gray-600 mt-2">Manage your downloaded resume templates</p>
          </div>
          <Button 
            onClick={() => navigate('/builder')}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Resume
          </Button>
        </div>

        {downloadedResumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No downloaded resumes yet</h3>
                <p className="text-gray-600 mb-6">
                  Purchase and download resume templates to see them here
                </p>
                <Button 
                  onClick={() => navigate('/templates')}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Browse Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {downloadedResumes.map((resume) => (
              <Card key={resume.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-50 to-pink-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-20 bg-white rounded-lg shadow-md flex items-center justify-center mb-3 mx-auto">
                        <span className="text-xl font-bold text-purple-600">CV</span>
                      </div>
                      <div className="text-sm text-gray-700 font-medium truncate">
                        {resume.resume_data.fullName || 'Untitled'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {resume.template_id || 'Modern'} Template
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handlePreview(resume)}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(resume.id)}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-lg">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Downloaded {new Date(resume.downloaded_at).toLocaleDateString()}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {resume.template_id || 'Modern'} Template
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(resume)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEdit(resume.id)}
                      className="flex-1 bg-gradient-primary hover:opacity-90"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedResume?.title || 'Resume Preview'}</DialogTitle>
          </DialogHeader>
          {selectedResume && (
            <div className="bg-white shadow-lg" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
              <ResumePreview 
                data={selectedResume.resume_data} 
                template={selectedResume.template_id || 'modern'} 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DownloadedResumes;
