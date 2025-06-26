import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumePreview } from "@/components/ResumePreview";
import { PricingModal } from "@/components/PricingModal";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AchievementsInput } from "@/components/AchievementsInput";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { usePurchases } from "@/hooks/usePurchases";
import { AuthModal } from "@/components/AuthModal";
import { Download, Save, Plus, Trash2, User, MapPin, Globe, Github, Linkedin, Palette, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ResumeData } from "@/types/resume";

// Resume score calculation function
const calculateResumeScore = (data: ResumeData): { score: number; details: string[] } => {
  let score = 0;
  const details: string[] = [];

  // Basic info (20 points)
  if (data.fullName) { score += 5; details.push("✓ Full name provided"); }
  if (data.email) { score += 5; details.push("✓ Email provided"); }
  if (data.phone) { score += 5; details.push("✓ Phone number provided"); }
  if (data.location) { score += 5; details.push("✓ Location provided"); }

  // Professional summary (15 points)
  if (data.summary && data.summary.length > 50) {
    score += 15;
    details.push("✓ Professional summary included");
  } else if (data.summary) {
    score += 8;
    details.push("⚠ Professional summary too short");
  }

  // Work experience (25 points)
  const validExperience = data.experience.filter(exp => exp.position && exp.company);
  if (validExperience.length >= 2) {
    score += 25;
    details.push("✓ Multiple work experiences");
  } else if (validExperience.length === 1) {
    score += 15;
    details.push("⚠ Only one work experience");
  }

  // Education (15 points)
  const validEducation = data.education.filter(edu => edu.degree && edu.school);
  if (validEducation.length > 0) {
    score += 15;
    details.push("✓ Education information provided");
  }

  // Skills (10 points)
  if (data.skills.length >= 5) {
    score += 10;
    details.push("✓ Good number of skills listed");
  } else if (data.skills.length > 0) {
    score += 5;
    details.push("⚠ Few skills listed");
  }

  // Additional sections (15 points)
  if (data.certifications.length > 0) { score += 5; details.push("✓ Certifications included"); }
  if (data.projects.length > 0) { score += 5; details.push("✓ Projects included"); }
  if (data.languages.length > 0) { score += 5; details.push("✓ Languages included"); }

  return { score: Math.min(score, 100), details };
};

// 50% dummy data as default
const defaultResumeData: ResumeData = {
  fullName: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  website: "www.johndoe.com",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  summary: "Experienced software developer with 5+ years of expertise in full-stack development. Passionate about creating innovative solutions and leading cross-functional teams to deliver high-quality software products.",
  achievements: [
    "Improved system performance by 40% through code optimization",
    "Led a team of 5 developers on a critical project",
    "Reduced application load time by 60%"
  ],
  experience: [
    {
      position: "Senior Software Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2020 - Present",
      description: "Led development of web applications using React and Node.js. Improved system performance by 40% and mentored junior developers."
    },
    {
      position: "Software Developer",
      company: "Innovation Labs",
      duration: "Jun 2018 - Dec 2019",
      description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with designers and product managers to deliver user-friendly applications."
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      year: "2018",
      grade: "3.8 GPA"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Git", "TypeScript"],
  languages: ["English - Native", "Spanish - Conversational"],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2022"
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL. Implemented payment processing and inventory management.",
      technologies: "React, Node.js, PostgreSQL, Stripe API",
      link: "github.com/johndoe/ecommerce-platform"
    }
  ]
};

const Builder = () => {
  const { user } = useAuth();
  const { resumes, downloadedResumes, saveResume, saveDownloadedResume, deleteResume, loading, loadDownloadedResumeForEditing } = useResumes();
  const { canDownload, consumeDownload, refreshPurchases, purchases } = usePurchases();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedResumeForView, setSelectedResumeForView] = useState<any>(null);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [isFromDownloaded, setIsFromDownloaded] = useState(false);

  // Calculate resume score
  const { score, details } = calculateResumeScore(resumeData);

  // Calculate downloads remaining
  const downloadsRemaining = purchases.reduce((total, purchase) => {
    const isNotExpired = !purchase.expires_at || new Date(purchase.expires_at) > new Date();
    return total + (isNotExpired ? purchase.downloads_remaining : 0);
  }, 0);

  // Check if user is authenticated
  useEffect(() => {
    if (!user && !loading) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  // Handle URL parameters for template and resume loading
  // Track if a resume/downloaded resume has been loaded to prevent overwriting user edits
  const [hasLoadedResume, setHasLoadedResume] = useState(false);

  useEffect(() => {
    const templateParam = searchParams.get('template');
    const resumeParam = searchParams.get('resume');
    const downloadedParam = searchParams.get('downloaded');

    // Only set template if explicitly changed via URL param
    if (templateParam) {
      setCurrentTemplate(templateParam);
    }

    // Only load resume/downloaded resume once per param change
    if (!hasLoadedResume) {
      if (resumeParam && resumes.length > 0) {
        const resume = resumes.find(r => r.id === resumeParam);
        if (resume) {
          console.log('Loading saved resume:', resume);
          setResumeData(resume.resume_data);
          setResumeTitle(resume.title);
          setCurrentResumeId(resume.id);
          setCurrentTemplate(resume.template_id || 'modern');
          setIsFromDownloaded(false);
          setHasLoadedResume(true);
        }
      } else if (downloadedParam && downloadedResumes.length > 0) {
        const downloadedResume = downloadedResumes.find(r => r.id === downloadedParam);
        if (downloadedResume) {
          console.log('Loading downloaded resume:', downloadedResume);
          const loadedData = loadDownloadedResumeForEditing(downloadedResume);
          setResumeData(loadedData.resumeData);
          setResumeTitle(loadedData.title);
          setCurrentTemplate(loadedData.templateId);
          setCurrentResumeId(null); // Clear resume ID since this is from downloaded
          setIsFromDownloaded(true);
          setHasLoadedResume(true);
        }
      }
    }
  }, [searchParams, resumes, downloadedResumes, loadDownloadedResumeForEditing, hasLoadedResume]);

  // Reset hasLoadedResume when URL params change
  useEffect(() => {
    setHasLoadedResume(false);
  }, [searchParams]);


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

  const handleInputChange = (field: keyof ResumeData, value: string | string[]) => {
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

    console.log('Saving resume with template:', currentTemplate);
    
    try {
      let result;
      
      if (isFromDownloaded) {
        // If it's a downloaded resume, save it as a new resume in the saved resumes section
        result = await saveResume(resumeData, resumeTitle, undefined, currentTemplate);
        if (result) {
          setCurrentResumeId(result.id);
          setIsFromDownloaded(false); // Now it's a saved resume
          
          // Remove the downloaded resume since we've converted it to a saved resume
          if (currentResumeId) {
            await deleteResume(currentResumeId);
          }
          
          // Update URL to reflect the new saved resume
          navigate(`/builder?resume=${result.id}`);
          
          toast({
            title: "Success",
            description: "Resume has been saved to your saved resumes",
          });
        }
      } else {
        // For regular saved resumes, just update them
        result = await saveResume(resumeData, resumeTitle, currentResumeId, currentTemplate);
        
        if (result && !currentResumeId) {
          // This is a new resume being saved for the first time
          setCurrentResumeId(result.id);
          navigate(`/builder?resume=${result.id}`);
          
          toast({
            title: "Success",
            description: "Resume saved successfully",
          });
        } else if (result) {
          toast({
            title: "Success",
            description: "Resume updated successfully",
          });
        }
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLoadResume = (resume: any) => {
    console.log('Loading resume with template:', resume.template_id);
    setResumeData(resume.resume_data);
    setResumeTitle(resume.title);
    setCurrentResumeId(resume.id);
    setCurrentTemplate(resume.template_id || 'modern');
    setIsFromDownloaded(false);
    setHasLoadedResume(true); // Mark as loaded to prevent useEffect from overwriting
    // Update URL to reflect the loaded resume
    navigate(`/builder?resume=${resume.id}`);
  };

  // Ensure template changes are always editable regardless of resume source
  const handleTemplateChange = (templateId: string) => {
    setCurrentTemplate(templateId);
    // Optionally, persist template change to resume if loaded from saved/downloaded
    if (currentResumeId && !isFromDownloaded) {
      saveResume(resumeData, resumeTitle, currentResumeId, templateId);
    }
    if (isFromDownloaded) {
      // Optionally, persist template change for downloaded resumes as well
      // saveDownloadedResume(resumeData, resumeTitle, templateId);
    }
  };


  const handleNewResume = () => {
    setResumeData(defaultResumeData);
    setResumeTitle("My Resume");
    setCurrentResumeId(null);
    setCurrentTemplate("modern");
    setIsFromDownloaded(false);
    
    // Clear URL parameters
    navigate('/builder');
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
        // Save this resume to downloaded resumes with current template
        await saveDownloadedResume(resumeData, resumeTitle, currentTemplate);

        // Create a PDF download using print functionality without watermark and timestamp
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>${resumeData.fullName} - Resume</title>
                <style>
                  @page {
                    size: A4;
                    margin: 0.5cm;
                  }
                  @media print {
                    @page {
                      margin: 0;
                    }
                    body {
                      margin: 1.6cm;
                    }
                  }
                  body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  }
                  .header { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 20px; margin-bottom: 20px; }
                  .name { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
                  .contact { color: #666; }
                  .section { margin-bottom: 25px; page-break-inside: avoid; }
                  .section-title { font-size: 18px; font-weight: bold; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
                  .item { margin-bottom: 15px; page-break-inside: avoid; }
                  .position { font-weight: bold; }
                  .company { color: #3b82f6; font-weight: 500; }
                  .duration { color: #666; font-size: 14px; }
                  .tags { display: flex; flex-wrap: wrap; gap: 10px; }
                  .tag { background: #eff6ff; color: #1d4ed8; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
                </style>
                <script>
                  // Prevent browser from adding headers/footers
                  window.onbeforeprint = function() {
                    return false;
                  };
                </script>
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
          
          // Trigger download
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 100);
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

  const viewResume = (resume: any) => {
    setSelectedResumeForView(resume);
    setShowResumeModal(true);
  };

  const viewDownloadedResume = (resume: any) => {
    setSelectedResumeForView(resume);
    setShowResumeModal(true);
  };

  const editDownloadedResume = (resume: any) => {
    navigate(`/builder?downloaded=${resume.id}`);
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
            {isFromDownloaded && (
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Editing Downloaded Resume
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full">
            {/* Downloads remaining indicator */}
            {downloadsRemaining > 0 && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hidden sm:block">
                {downloadsRemaining} downloads remaining
              </div>
            )}
            <Button variant="outline" onClick={handleNewResume} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
            <Button variant="outline" onClick={handleSave} className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              onClick={handleDownload} 
              className={`w-full sm:w-auto ${canDownload ? "bg-gradient-primary hover:opacity-90" : "bg-gray-400"}`}
            >
              <Download className="w-4 h-4 mr-2" />
              {canDownload ? "Download PDF" : "Buy to Download"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section with Tabs */}
          <div className="space-y-6">
            {/* Resume Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Resume Score
                  <span className={`text-2xl font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {score}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`w-full bg-gray-200 rounded-full h-2 ${score >= 80 ? 'bg-green-200' : score >= 60 ? 'bg-yellow-200' : 'bg-red-200'}`}>
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-600 hover:text-gray-800">View score details</summary>
                    <div className="mt-2 space-y-1">
                      {details.map((detail, index) => (
                        <div key={index} className="text-xs text-gray-600">{detail}</div>
                      ))}
                    </div>
                  </details>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Form */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <div className="relative w-full">
                    <TabsList className="flex w-full overflow-x-auto no-scrollbar gap-2 sm:grid sm:grid-cols-5 sm:overflow-visible sm:static sm:px-0">
                      <TabsTrigger 
                        className="flex-none first:ml-44 sm:first:ml-0" 
                        value="personal"
                      >
                        Personal
                      </TabsTrigger>
                      <TabsTrigger 
                        className="flex-none" 
                        value="experience"
                      >
                        Experience
                      </TabsTrigger>
                      <TabsTrigger 
                        className="flex-none" 
                        value="education"
                      >
                        Education
                      </TabsTrigger>
                      <TabsTrigger 
                        className="flex-none" 
                        value="skills"
                      >
                        Skills
                      </TabsTrigger>
                      <TabsTrigger 
                        className="flex-none pr-4 sm:pr-0" 
                        value="achievements"
                      >
                        Achievements
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          value={resumeData.summary}
                          onChange={(e) => handleInputChange("summary", e.target.value)}
                          placeholder="Write a brief summary of your professional experience and career objectives..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="space-y-4">
                    <AchievementsInput
                      achievements={resumeData.achievements}
                      onChange={(achievements) => handleInputChange("achievements", achievements)}
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button size="sm" onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Experience
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Button size="sm" onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Education
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6">
                    {/* Skills */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Skills</h3>
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
                    </div>

                    {/* Languages */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Languages</h3>
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
                    </div>

                    {/* Certifications */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Certifications</h3>
                        <Button size="sm" onClick={addCertification}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-4">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Projects</h3>
                        <Button size="sm" onClick={addProject}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-4">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Resume Preview
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTemplateModal(true)}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Change Template
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="resume-preview bg-white shadow-lg select-none relative overflow-hidden" style={{ zoom: 0.8 as any, userSelect: 'none' }}>
                  {/* Watermark overlay */}
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
                  <ResumePreview data={resumeData} template={currentTemplate} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Saved Resumes Section */}
        {resumes.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Saved Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center mb-2 mx-auto">
                          <span className="text-lg font-bold text-blue-600">CV</span>
                        </div>
                        <div className="text-xs text-gray-600">{resume.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {resume.template_id || 'Modern'}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => viewResume(resume)}
                            className="bg-white bg-opacity-90 hover:bg-opacity-100"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleLoadResume(resume)}
                            className="bg-white bg-opacity-90 hover:bg-opacity-100"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">{resume.title}</h3>
                      <p className="text-xs text-gray-500">
                        Updated on {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewResume(resume)}
                          className="flex-1"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleLoadResume(resume)}
                          className="flex-1 bg-gradient-primary hover:opacity-90"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Downloaded Resumes Section at Bottom */}
        {downloadedResumes.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Downloaded Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {downloadedResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center mb-2 mx-auto">
                          <span className="text-lg font-bold text-blue-600">CV</span>
                        </div>
                        <div className="text-xs text-gray-600">{resume.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {resume.template_id || 'Modern'}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => viewDownloadedResume(resume)}
                            className="bg-white bg-opacity-90 hover:bg-opacity-100"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => editDownloadedResume(resume)}
                            className="bg-white bg-opacity-90 hover:bg-opacity-100"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">{resume.title}</h3>
                      <p className="text-xs text-gray-500">
                        Downloaded on {new Date(resume.downloaded_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDownloadedResume(resume)}
                          className="flex-1"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => editDownloadedResume(resume)}
                          className="flex-1 bg-gradient-primary hover:opacity-90"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <PricingModal
        isOpen={showPricingModal}
        onClose={handlePricingModalClose}
      />

      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a Template</DialogTitle>
          </DialogHeader>
          <TemplateSelector 
            currentTemplate={currentTemplate}
            onTemplateChange={(templateId) => {
              console.log('Template changed to:', templateId);
              setCurrentTemplate(templateId);
              setShowTemplateModal(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showResumeModal} onOpenChange={setShowResumeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedResumeForView?.title || 'Resume Preview'}</DialogTitle>
          </DialogHeader>
          {selectedResumeForView && (
            <div className="bg-white shadow-lg" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
              <ResumePreview 
                data={selectedResumeForView.resume_data} 
                template={selectedResumeForView.template_id || 'modern'} 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Builder;
