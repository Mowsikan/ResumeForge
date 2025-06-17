import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResumePreview } from "@/components/ResumePreview";
import { PricingModal } from "@/components/PricingModal";
import { TemplateSelector } from "@/components/TemplateSelector";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { usePurchases } from "@/hooks/usePurchases";
import { AuthModal } from "@/components/AuthModal";
import { Download, Save, Plus, Trash2, User, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    grade: string;
  }>;
  skills: string[];
  languages: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
}

// Default resume data with examples
const defaultResumeData: ResumeData = {
  fullName: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  website: "www.johndoe.com",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  summary: "Experienced software developer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and solving complex problems. Proven track record of delivering high-quality solutions in fast-paced environments.",
  experience: [
    {
      position: "Senior Software Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2022 - Present",
      description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews."
    },
    {
      position: "Software Developer",
      company: "Digital Innovations",
      duration: "Jun 2020 - Dec 2021",
      description: "Developed responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time. Optimized database queries improving performance by 40%."
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      year: "2020",
      grade: "3.8 GPA"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Git"],
  languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023"
    },
    {
      name: "React Professional Certificate",
      issuer: "Meta",
      year: "2022"
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      technologies: "React, Node.js, PostgreSQL, Stripe",
      link: "github.com/johndoe/ecommerce"
    },
    {
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates using WebSocket connections.",
      technologies: "Vue.js, Express.js, MongoDB, Socket.io",
      link: "github.com/johndoe/taskmanager"
    }
  ]
};

const Builder = () => {
  const { user } = useAuth();
  const { resumes, saveResume, deleteResume, loading } = useResumes();
  const { canDownload, consumeDownload, refreshPurchases } = usePurchases();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    if (!user && !loading) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  // Handle URL parameters for template and resume loading
  useEffect(() => {
    const templateParam = searchParams.get('template');
    const resumeParam = searchParams.get('resume');

    if (templateParam) {
      setCurrentTemplate(templateParam);
    }

    if (resumeParam && resumes.length > 0) {
      const resume = resumes.find(r => r.id === resumeParam);
      if (resume) {
        setResumeData(resume.resume_data);
        setResumeTitle(resume.title);
        setCurrentResumeId(resume.id);
        setCurrentTemplate(resume.template_id || 'modern');
      }
    }
  }, [searchParams, resumes]);

  // Listen for successful payments and refresh purchases
  useEffect(() => {
    const handlePaymentSuccess = () => {
      console.log('Payment success event detected, refreshing purchases...');
      setTimeout(() => {
        refreshPurchases();
      }, 1000);
    };

    window.addEventListener('paymentSuccess', handlePaymentSuccess);
    
    return () => {
      window.removeEventListener('paymentSuccess', handlePaymentSuccess);
    };
  }, [refreshPurchases]);

  // Add screenshot protection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable screenshot shortcuts
      if (e.key === 'PrintScreen' || 
          (e.ctrlKey && e.shiftKey && e.key === 'S') ||
          (e.metaKey && e.shiftKey && e.key === '4') ||
          (e.metaKey && e.shiftKey && e.key === '3')) {
        e.preventDefault();
        toast({
          title: "Screenshots Disabled",
          description: "Please purchase a plan to download your resume as PDF.",
          variant: "destructive"
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.resume-preview')) {
        e.preventDefault();
        toast({
          title: "Right-click Disabled",
          description: "Please purchase a plan to download your resume.",
          variant: "destructive"
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [toast]);

  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { position: "", company: "", duration: "", description: "" }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "", grade: "" }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !resumeData.languages.includes(newLanguage.trim())) {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleCertificationChange = (index: number, field: string, value: string) => {
    const newCertifications = [...resumeData.certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    setResumeData(prev => ({ ...prev, certifications: newCertifications }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", year: "" }]
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", technologies: "", link: "" }]
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const result = await saveResume(resumeData, resumeTitle, currentResumeId, currentTemplate);
    if (result && !currentResumeId) {
      setCurrentResumeId(result.id);
    }
  };

  const handleLoadResume = (resume: any) => {
    setResumeData(resume.resume_data);
    setResumeTitle(resume.title);
    setCurrentResumeId(resume.id);
    setCurrentTemplate(resume.template_id || 'modern');
  };

  const handleNewResume = () => {
    setResumeData({
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
      certifications: [],
      projects: []
    });
    setResumeTitle("My Resume");
    setCurrentResumeId(null);
    setCurrentTemplate("modern");
  };

  const handleDownload = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!canDownload) {
      setShowPricingModal(true);
      return;
    }

    try {
      const success = await consumeDownload();
      if (success) {
        // Create a simple PDF download using print functionality without watermark
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Resume - ${resumeData.fullName}</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                  .header { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 20px; margin-bottom: 20px; }
                  .name { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
                  .contact { color: #666; }
                  .section { margin-bottom: 25px; }
                  .section-title { font-size: 18px; font-weight: bold; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
                  .item { margin-bottom: 15px; }
                  .position { font-weight: bold; }
                  .company { color: #3b82f6; font-weight: 500; }
                  .duration { color: #666; font-size: 14px; }
                  .tags { display: flex; flex-wrap: wrap; gap: 10px; }
                  .tag { background: #eff6ff; color: #1d4ed8; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="header">
                  <div class="name">${resumeData.fullName}</div>
                  <div class="contact">${resumeData.email} • ${resumeData.phone} • ${resumeData.location}</div>
                  ${resumeData.website ? `<div class="contact">${resumeData.website}</div>` : ''}
                  ${resumeData.linkedin || resumeData.github ? `<div class="contact">${resumeData.linkedin ? resumeData.linkedin : ''} ${resumeData.github ? '• ' + resumeData.github : ''}</div>` : ''}
                </div>
                
                ${resumeData.summary ? `
                <div class="section">
                  <div class="section-title">Professional Summary</div>
                  <p>${resumeData.summary}</p>
                </div>
                ` : ''}
                
                ${resumeData.experience.length > 0 ? `
                <div class="section">
                  <div class="section-title">Work Experience</div>
                  ${resumeData.experience.map(exp => `
                    <div class="item">
                      <div class="position">${exp.position}</div>
                      <div class="company">${exp.company}</div>
                      <div class="duration">${exp.duration}</div>
                      ${exp.description ? `<p>${exp.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
                ` : ''}
                
                ${resumeData.education.length > 0 ? `
                <div class="section">
                  <div class="section-title">Education</div>
                  ${resumeData.education.map(edu => `
                    <div class="item">
                      <div class="position">${edu.degree}</div>
                      <div class="company">${edu.school}</div>
                      <div class="duration">${edu.year} ${edu.grade ? '• ' + edu.grade : ''}</div>
                    </div>
                  `).join('')}
                </div>
                ` : ''}
                
                ${resumeData.skills.length > 0 ? `
                <div class="section">
                  <div class="section-title">Skills</div>
                  <div class="tags">
                    ${resumeData.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                  </div>
                </div>
                ` : ''}
                
                ${resumeData.projects.length > 0 ? `
                <div class="section">
                  <div class="section-title">Projects</div>
                  ${resumeData.projects.map(project => `
                    <div class="item">
                      <div class="position">${project.name}</div>
                      <p>${project.description}</p>
                      <div class="duration">Technologies: ${project.technologies}</div>
                      ${project.link ? `<div class="duration">Link: ${project.link}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
                ` : ''}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
        }
        
        toast({
          title: "Success",
          description: "Resume downloaded successfully!",
        });
      } else {
        toast({
          title: "Download Failed",
          description: "Unable to process download. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "An error occurred while downloading your resume.",
        variant: "destructive",
      });
    }
  };

  const handlePricingModalClose = () => {
    setShowPricingModal(false);
    setTimeout(() => {
      refreshPurchases();
    }, 500);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to build your resume
          </h2>
          <p className="text-gray-600 mb-6">
            Create an account to save your progress and access all features
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Input
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="text-2xl font-bold border-none p-0 bg-transparent"
              placeholder="Resume Title"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleNewResume}>
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              onClick={handleDownload} 
              className={canDownload ? "bg-gradient-primary hover:opacity-90" : "bg-gray-400"}
            >
              <Download className="w-4 h-4 mr-2" />
              {canDownload ? "Download PDF" : "Buy to Download"}
            </Button>
          </div>
        </div>

        {/* Saved Resumes */}
        {resumes.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Saved Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      currentResumeId === resume.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div onClick={() => handleLoadResume(resume)}>
                        <h3 className="font-medium">{resume.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(resume.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResume(resume.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="website">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={resumeData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="www.johndoe.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">
                      <Linkedin className="w-4 h-4 inline mr-1" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={resumeData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">
                      <Github className="w-4 h-4 inline mr-1" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={resumeData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      placeholder="github.com/johndoe"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={resumeData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Write a brief summary of your professional experience and career objectives..."
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Work Experience
                  <Button size="sm" onClick={addExperience}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      {resumeData.experience.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                      />
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                    />
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Education
                  <Button size="sm" onClick={addEducation}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      {resumeData.education.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      />
                      <Input
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Year (e.g., 2020)"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      />
                      <Input
                        placeholder="Grade/GPA (optional)"
                        value={edu.grade}
                        onChange={(e) => handleEducationChange(index, "grade", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a language (e.g., English - Native)"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                  />
                  <Button onClick={addLanguage}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.languages.map((language, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                      <button
                        onClick={() => removeLanguage(language)}
                        className="ml-1 hover:text-green-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Certifications
                  <Button size="sm" onClick={addCertification}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Certification {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeCertification(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                      />
                      <Input
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) => handleCertificationChange(index, "year", e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Projects
                  <Button size="sm" onClick={addProject}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                    />
                    <Textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Technologies Used"
                        value={project.technologies}
                        onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
                      />
                      <Input
                        placeholder="Project Link (optional)"
                        value={project.link}
                        onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TemplateSelector 
                  currentTemplate={currentTemplate}
                  onTemplateChange={setCurrentTemplate}
                />
                <div className="resume-preview bg-white shadow-lg select-none relative" style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%', height: '166.67%', userSelect: 'none', pointerEvents: canDownload ? 'auto' : 'none' }}>
                  {/* Watermark overlay for non-premium users */}
                  {!canDownload && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <div className="absolute inset-0 bg-black bg-opacity-5"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 text-gray-300 text-6xl font-bold opacity-20 select-none">
                        RESUMEFORGE
                      </div>
                      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-45 text-gray-300 text-4xl font-bold opacity-15 select-none">
                        SAMPLE
                      </div>
                      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 rotate-45 text-gray-300 text-4xl font-bold opacity-15 select-none">
                        PREVIEW
                      </div>
                    </div>
                  )}
                  <ResumePreview data={resumeData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <PricingModal
        isOpen={showPricingModal}
        onClose={handlePricingModalClose}
      />
    </div>
  );
};

export default Builder;
