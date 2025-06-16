
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumes } from "@/hooks/useResumes";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { ResumePreview } from "@/components/ResumePreview";

const SavedResumes = () => {
  const { user } = useAuth();
  const { resumes, deleteResume, loading } = useResumes();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to view your saved resumes
          </h2>
          <p className="text-gray-600 mb-6">
            Access all your saved resumes and continue building your perfect CV
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

  const handlePreviewResume = (resume: any) => {
    setSelectedResume(resume);
    setPreviewOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Saved Resumes</h1>
          <p className="text-gray-600">
            Manage, edit, and download your professional resumes
          </p>
        </div>

        {/* Create New Resume */}
        <div className="mb-8">
          <Link to="/builder">
            <Button className="bg-gradient-primary hover:opacity-90">
              Create New Resume
            </Button>
          </Link>
        </div>

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📄</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Start building your first professional resume</p>
            <Link to="/builder">
              <Button className="bg-gradient-primary hover:opacity-90">
                Create Your First Resume
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {resumes.map((resume) => (
              <Card 
                key={resume.id} 
                className="hover:shadow-lg transition-shadow bg-white border border-gray-200"
              >
                <CardContent className="p-0">
                  {/* Resume Preview */}
                  <div 
                    className="relative bg-white border-b cursor-pointer group"
                    onClick={() => handlePreviewResume(resume)}
                    style={{ height: '400px' }}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="transform scale-[0.25] origin-top-left w-[340%] h-[340%]">
                        <div className="bg-white shadow-lg" style={{ width: '8.5in', minHeight: '11in' }}>
                          <ResumePreview data={resume.resume_data} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-white rounded-full p-3 shadow-lg">
                          <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {resume.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          Updated: {new Date(resume.updated_at).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Template: {resume.template_id || 'Modern Professional'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreviewResume(resume)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteResume(resume.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Link to={`/builder?resume=${resume.id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Resume
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedResume?.title}</span>
                <div className="flex gap-2">
                  <Link to={`/builder?resume=${selectedResume?.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </DialogTitle>
            </DialogHeader>
            {selectedResume && (
              <div className="flex justify-center">
                <div className="bg-white shadow-lg">
                  <ResumePreview data={selectedResume.resume_data} />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SavedResumes;
