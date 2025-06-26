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

const SavedResumes = () => {
  const { user } = useAuth();
  const { resumes, deleteResume, loading } = useResumes();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<any>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Sign in to view your saved resumes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Create an account to save and manage your resumes
          </p>
          <Button onClick={() => setShowAuthModal(true)} className="w-full sm:w-auto">
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
    navigate(`/builder?resume=${resumeId}`);
  };

  const handlePreview = (resume: any) => {
    setSelectedResume(resume);
    setShowPreviewModal(true);
  };

  const handleDelete = async (resumeId: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      await deleteResume(resumeId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Saved Resumes</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage and edit your saved resumes</p>
          </div>
          <Button 
            onClick={() => navigate('/builder')}
            className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="text-center py-8 sm:py-12">
            <CardContent>
              <div className="max-w-md mx-auto px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Create your first resume to get started
                </p>
                <Button 
                  onClick={() => navigate('/builder')}
                  className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                  {/* Resume thumbnail/preview */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-3 sm:p-4">
                      <div className="w-12 h-15 sm:w-16 sm:h-20 bg-white rounded-lg shadow-md flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                        <span className="text-lg sm:text-xl font-bold text-blue-600">CV</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700 font-medium truncate">
                        {resume.resume_data.fullName || 'Untitled'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {resume.template_id || 'Modern'} Template
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handlePreview(resume)}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(resume.id)}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base lg:text-lg">
                        {resume.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Updated {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {resume.template_id || 'Modern'} Template
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2 p-1"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-3 sm:mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(resume)}
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEdit(resume.id)}
                      className="flex-1 bg-gradient-primary hover:opacity-90 text-xs sm:text-sm"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">{selectedResume?.title || 'Resume Preview'}</DialogTitle>
          </DialogHeader>
          {selectedResume && (
            <div className="bg-white shadow-lg" style={{ transform: 'scale(0.6) scale(0.8)', transformOrigin: 'top center' }}>
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

export default SavedResumes;