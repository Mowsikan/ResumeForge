import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { PricingModal } from "@/components/PricingModal";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ResumePreview } from "@/components/ResumePreview";
import { Plus, Trash2, Download, Save, Star, Award } from "lucide-react";
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

const Builder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { saveResume } = useResumes();
  const [searchParams] = useSearchParams();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [resumeScore, setResumeScore] = useState(0);

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
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");

  // Calculate resume score
  useEffect(() => {
    const calculateScore = () => {
      let score = 0;
      const maxScore = 100;
      
      // Basic info (20 points)
      if (resumeData.fullName) score += 5;
      if (resumeData.email) score += 5;
      if (resumeData.phone) score += 5;
      if (resumeData.location) score += 5;
      
      // Summary (15 points)
      if (resumeData.summary && resumeData.summary.length > 50) score += 15;
      else if (resumeData.summary) score += 8;
      
      // Experience (25 points)
      const validExperience = resumeData.experience.filter(exp => exp.position && exp.company);
      if (validExperience.length >= 2) score += 25;
      else if (validExperience.length === 1) score += 15;
      
      // Education (15 points)
      const validEducation = resumeData.education.filter(edu => edu.degree && edu.school);
      if (validEducation.length >= 1) score += 15;
      
      // Skills (15 points)
      if (resumeData.skills.length >= 5) score += 15;
      else if (resumeData.skills.length >= 3) score += 10;
      else if (resumeData.skills.length >= 1) score += 5;
      
      // Additional sections (10 points)
      if (resumeData.certifications.some(cert => cert.name)) score += 3;
      if (resumeData.projects.some(proj => proj.name)) score += 3;
      if (resumeData.languages.length > 0) score += 2;
      if (resumeData.website || resumeData.linkedin || resumeData.github) score += 2;
      
      setResumeScore(Math.min(score, maxScore));
    };
    
    calculateScore();
  }, [resumeData]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your resume",
        variant: "destructive",
      });
      return;
    }

    const result = await saveResume(resumeData, resumeData.fullName || "Untitled Resume");
    if (result) {
      toast({
        title: "Success",
        description: "Resume saved successfully!",
      });
    }
  };

  const handleDownload = () => {
    setShowPricingModal(true);
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

  const updateExperience = (index: number, field: keyof ResumeData['experience'][0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
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

  const updateEducation = (index: number, field: keyof ResumeData['education'][0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage.trim()) {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage.trim()]
      }));
      setCurrentLanguage("");
    }
  };

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
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

  const updateCertification = (index: number, field: keyof ResumeData['certifications'][0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
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

  const updateProject = (index: number, field: keyof ResumeData['projects'][0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
              <p className="text-gray-600">Create your professional resume</p>
              
              {/* Resume Score */}
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Resume Strength</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className={`font-bold ${getScoreColor(resumeScore)}`}>
                      {resumeScore}/100
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      resumeScore >= 80 ? 'bg-green-500' : 
                      resumeScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${resumeScore}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${getScoreColor(resumeScore)}`}>
                  {getScoreLabel(resumeScore)}
                </span>
              </div>
            </div>

            {/* Template Selector */}
            <div className="mb-6">
              <TemplateSelector 
                currentTemplate={currentTemplate}
                onTemplateChange={setCurrentTemplate}
              />
            </div>

            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="certifications">Certs</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
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
                          onChange={(e) => setResumeData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.email}
                          onChange={(e) => setResumeData(prev => ({ ...prev, email: e.target.value }))}
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
                          onChange={(e) => setResumeData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.location}
                          onChange={(e) => setResumeData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={resumeData.website}
                          onChange={(e) => setResumeData(prev => ({ ...prev, website: e.target.value }))}
                          placeholder="www.johndoe.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.linkedin}
                          onChange={(e) => setResumeData(prev => ({ ...prev, linkedin: e.target.value }))}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={resumeData.github}
                          onChange={(e) => setResumeData(prev => ({ ...prev, github: e.target.value }))}
                          placeholder="github.com/johndoe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Write a brief professional summary..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`position-${index}`}>Position</Label>
                            <Input
                              id={`position-${index}`}
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`company-${index}`}>Company</Label>
                            <Input
                              id={`company-${index}`}
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="Google"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor={`duration-${index}`}>Duration</Label>
                            <Input
                              id={`duration-${index}`}
                              value={exp.duration}
                              onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                              placeholder="June 2020 - August 2023"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea
                            id={`description-${index}`}
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[80px]"
                          />
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addExperience} className="w-full flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`degree-${index}`}>Degree</Label>
                            <Input
                              id={`degree-${index}`}
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`school-${index}`}>School</Label>
                            <Input
                              id={`school-${index}`}
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              placeholder="University of California, Berkeley"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`year-${index}`}>Year</Label>
                            <Input
                              id={`year-${index}`}
                              value={edu.year}
                              onChange={(e) => updateEducation(index, 'year', e.target.value)}
                              placeholder="2020"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`grade-${index}`}>Grade</Label>
                            <Input
                              id={`grade-${index}`}
                              value={edu.grade}
                              onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                              placeholder="4.0"
                            />
                          </div>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addEducation} className="w-full flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Education
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add a skill"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                      />
                      <Button onClick={addSkill}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" onClick={() => removeSkill(index)} className="cursor-pointer">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add a language"
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                      />
                      <Button onClick={addLanguage}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.languages.map((language, index) => (
                        <Badge key={index} variant="secondary" onClick={() => removeLanguage(index)} className="cursor-pointer">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`name-${index}`}>Name</Label>
                            <Input
                              id={`name-${index}`}
                              value={cert.name}
                              onChange={(e) => updateCertification(index, 'name', e.target.value)}
                              placeholder="Certified Project Manager"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`issuer-${index}`}>Issuer</Label>
                            <Input
                              id={`issuer-${index}`}
                              value={cert.issuer}
                              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                              placeholder="Project Management Institute"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`year-${index}`}>Year</Label>
                          <Input
                            id={`year-${index}`}
                            value={cert.year}
                            onChange={(e) => updateCertification(index, 'year', e.target.value)}
                            placeholder="2022"
                          />
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => removeCertification(index)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addCertification} className="w-full flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Certification
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-2">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor={`name-${index}`}>Name</Label>
                            <Input
                              id={`name-${index}`}
                              value={project.name}
                              onChange={(e) => updateProject(index, 'name', e.target.value)}
                              placeholder="E-commerce Website"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor={`description-${index}`}>Description</Label>
                            <Textarea
                              id={`description-${index}`}
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              placeholder="Developed a fully functional e-commerce website..."
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor={`technologies-${index}`}>Technologies</Label>
                            <Input
                              id={`technologies-${index}`}
                              value={project.technologies}
                              onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                              placeholder="React, Node.js, Express, MongoDB"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor={`link-${index}`}>Link</Label>
                            <Input
                              id={`link-${index}`}
                              value={project.link}
                              onChange={(e) => updateProject(index, 'link', e.target.value)}
                              placeholder="https://github.com/johndoe/ecommerce"
                            />
                          </div>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => removeProject(index)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addProject} className="w-full flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Project
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>

            <div className="mt-6 flex gap-4">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Resume
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:w-1/2">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
              <div className="border rounded-lg bg-white overflow-hidden">
                <div className="relative">
                  <ResumePreview data={resumeData} />
                  {/* Watermark for non-premium users */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-10">
                      <span className="text-6xl font-bold text-gray-400">ResumeForge</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Change Template Button */}
              <div className="mt-4">
                <TemplateSelector 
                  currentTemplate={currentTemplate}
                  onTemplateChange={setCurrentTemplate}
                />
              </div>
            </div>
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
