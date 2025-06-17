
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Eye, Edit, Trash2, Download } from "lucide-react";
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="truncate">{resume.title}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreviewResume(resume)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResume(resume.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Resume Preview Thumbnail */}
                  <div 
                    className="aspect-[3/4] bg-white rounded-lg border shadow-sm mb-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePreviewResume(resume)}
                  >
                    <div className="p-4 scale-50 origin-top-left">
                      <ResumePreview data={resume.resume_data} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Updated: {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Template: {resume.template_id || 'Modern Professional'}
                    </p>
                    
                    <div className="flex gap-2 pt-2">
                      <Link to={`/builder?resume=${resume.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreviewResume(resume)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
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
