import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeActions } from "@/components/ResumeActions";
import { AchievementsInput } from "@/components/AchievementsInput";
import { PricingModal } from "@/components/PricingModal";
import { ResumeEditLoader } from "@/components/ResumeEditLoader";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { usePurchases } from "@/hooks/usePurchases";
import { useToast } from "@/hooks/use-toast";
import { ResumeData } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Builder = () => {
  const { user } = useAuth();
  const { saveResume, saveDownloadedResume } = useResumes();
  const { canDownload, consumeDownload } = usePurchases();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Get URL parameters for editing
  const resumeIdFromUrl = searchParams.get('resume');
  const downloadedIdFromUrl = searchParams.get('downloaded');
  const templateFromUrl = searchParams.get('template');

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    achievements: [],
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: []
  });

  const [currentTemplate, setCurrentTemplate] = useState(templateFromUrl || "modern");
  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [isSaving, setIsSaving] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  
  // Track editing state
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [isFromDownloaded, setIsFromDownloaded] = useState(false);
  const [downloadedResumeId, setDownloadedResumeId] = useState<string | null>(null);

  // Handle loading resume data from URL parameters
  const handleLoadResume = (loadedData: any) => {
    console.log('Loading resume data:', loadedData);
    
    if (loadedData.resumeData) {
      setResumeData(loadedData.resumeData);
    }
    if (loadedData.title) {
      setResumeTitle(loadedData.title);
    }
    if (loadedData.templateId) {
      setCurrentTemplate(loadedData.templateId);
    }
    if (loadedData.resumeId) {
      setEditingResumeId(loadedData.resumeId);
    }
    if (loadedData.isFromDownloaded) {
      setIsFromDownloaded(loadedData.isFromDownloaded);
    }
    if (loadedData.downloadedResumeId) {
      setDownloadedResumeId(loadedData.downloadedResumeId);
    }
  };

  const updateResumeData = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { position: "", company: "", duration: "", description: "" }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "", grade: "" }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", technologies: "", link: "" }]
    }));
  };

  const updateProject = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", year: "" }]
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (skillsString: string) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    updateResumeData('skills', skillsArray);
  };

  const handleLanguagesChange = (languagesString: string) => {
    const languagesArray = languagesString.split(',').map(lang => lang.trim()).filter(lang => lang);
    updateResumeData('languages', languagesArray);
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your resume.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveResume(
        resumeData, 
        resumeTitle, 
        editingResumeId || undefined, 
        currentTemplate
      );
      
      if (result && !editingResumeId) {
        setEditingResumeId(result.id);
        setIsFromDownloaded(false);
        setDownloadedResumeId(null);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to download your resume.",
        variant: "destructive"
      });
      return;
    }

    if (!canDownload) {
      setShowPricingModal(true);
      return;
    }

    try {
      const success = await consumeDownload();
      if (success) {
        // Save to downloaded resumes
        await saveDownloadedResume(resumeData, resumeTitle, currentTemplate);
        
        // Generate and download PDF
        const element = document.getElementById('resume-preview');
        if (element) {
          const { jsPDF } = await import('jspdf');
          const html2canvas = (await import('html2canvas')).default;
          
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true
          });
          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const pageHeight = 295;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(`${resumeTitle}.pdf`);
          
          toast({
            title: "Success!",
            description: "Your resume has been downloaded successfully.",
          });
        }
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setCurrentTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResumeEditLoader onLoadResume={handleLoadResume} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <ResumeActions
                  currentTemplate={currentTemplate}
                  onTemplateChange={handleTemplateChange}
                  onSave={handleSave}
                  onDownload={handleDownload}
                  isSaving={isSaving}
                  title={resumeTitle}
                  onTitleChange={setResumeTitle}
                />
              </CardContent>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.fullName}
                          onChange={(e) => updateResumeData('fullName', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.email}
                          onChange={(e) => updateResumeData('email', e.target.value)}
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
                          onChange={(e) => updateResumeData('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.location}
                          onChange={(e) => updateResumeData('location', e.target.value)}
                          placeholder="New York, NY"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={resumeData.website}
                          onChange={(e) => updateResumeData('website', e.target.value)}
                          placeholder="https://johndoe.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.linkedin}
                          onChange={(e) => updateResumeData('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={resumeData.github}
                        onChange={(e) => updateResumeData('github', e.target.value)}
                        placeholder="https://github.com/johndoe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => updateResumeData('summary', e.target.value)}
                        placeholder="Brief description of your professional background and goals..."
                        rows={4}
                      />
                    </div>
                    <AchievementsInput
                      achievements={resumeData.achievements}
                      onChange={(achievements) => updateResumeData('achievements', achievements)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Work Experience</CardTitle>
                      <Button onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="Tech Corp"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={exp.duration}
                            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                            placeholder="Jan 2020 - Present"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Education</CardTitle>
                      <Button onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Education {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeEducation(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>
                          <div>
                            <Label>School</Label>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              placeholder="University of Technology"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducation(index, 'year', e.target.value)}
                              placeholder="2020"
                            />
                          </div>
                          <div>
                            <Label>Grade (Optional)</Label>
                            <Input
                              value={edu.grade}
                              onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                              placeholder="3.8 GPA"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Textarea
                        id="skills"
                        value={resumeData.skills.join(', ')}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        placeholder="JavaScript, React, Node.js, Python, SQL"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="languages">Languages (comma-separated)</Label>
                      <Input
                        id="languages"
                        value={resumeData.languages.join(', ')}
                        onChange={(e) => handleLanguagesChange(e.target.value)}
                        placeholder="English (Native), Spanish (Fluent)"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Projects</CardTitle>
                      <Button onClick={addProject}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Project {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProject(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <Label>Project Name</Label>
                          <Input
                            value={project.name}
                            onChange={(e) => updateProject(index, 'name', e.target.value)}
                            placeholder="E-commerce Website"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            placeholder="Built a full-stack e-commerce platform..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Technologies</Label>
                          <Input
                            value={project.technologies}
                            onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                        <div>
                          <Label>Link (Optional)</Label>
                          <Input
                            value={project.link}
                            onChange={(e) => updateProject(index, 'link', e.target.value)}
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="other" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Certifications</CardTitle>
                      <Button onClick={addCertification}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Certification {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCertification(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(index, 'name', e.target.value)}
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Issuer</Label>
                            <Input
                              value={cert.issuer}
                              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                              placeholder="Amazon Web Services"
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={cert.year}
                              onChange={(e) => updateCertification(index, 'year', e.target.value)}
                              placeholder="2023"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  id="resume-preview" 
                  className="bg-white shadow-lg overflow-hidden"
                  style={{ transform: 'scale(0.6)', transformOrigin: 'top center' }}
                >
                  <ResumePreview data={resumeData} template={currentTemplate} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <PricingModal 
        isOpen={showPricingModal} 
        onClose={() => setShowPricingModal(false)} 
      />
    </div>
  );
};

export default Builder;