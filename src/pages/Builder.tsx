
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AchievementsInput } from "@/components/AchievementsInput";
import { useResumes } from "@/hooks/useResumes";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Download, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResumeData } from "@/types/resume";

export const Builder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveResume, saveDownloadedResume } = useResumes();
  const { toast } = useToast();

  const [data, setData] = useState<ResumeData>({
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
    achievements: []
  });

  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [resumeTitle, setResumeTitle] = useState("");
  const [isFromDownloaded, setIsFromDownloaded] = useState(false);
  const [resumeId, setResumeId] = useState<string>();
  const [downloadedResumeId, setDownloadedResumeId] = useState<string>();

  useEffect(() => {
    if (location.state) {
      const { resumeData, title, templateId, isFromDownloaded: fromDownloaded, resumeId: rId, downloadedResumeId: dId } = location.state;
      if (resumeData) {
        // Ensure achievements field exists
        const updatedData = {
          ...resumeData,
          achievements: resumeData.achievements || []
        };
        setData(updatedData);
        setResumeTitle(title || "");
        setCurrentTemplate(templateId || "modern");
        setIsFromDownloaded(fromDownloaded || false);
        setResumeId(rId);
        setDownloadedResumeId(dId);
      }
    }
  }, [location.state]);

  const updateField = (field: keyof ResumeData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: keyof ResumeData, newItem: any) => {
    setData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), newItem]
    }));
  };

  const updateArrayItem = (field: keyof ResumeData, index: number, updatedItem: any) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => i === index ? updatedItem : item)
    }));
  };

  const removeArrayItem = (field: keyof ResumeData, index: number) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !data.skills.includes(skill.trim())) {
      updateField("skills", [...data.skills, skill.trim()]);
    }
  };

  const removeSkill = (index: number) => {
    updateField("skills", data.skills.filter((_, i) => i !== index));
  };

  const addLanguage = (language: string) => {
    if (language.trim() && !data.languages.includes(language.trim())) {
      updateField("languages", [...data.languages, language.trim()]);
    }
  };

  const removeLanguage = (index: number) => {
    updateField("languages", data.languages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const title = resumeTitle || `${data.fullName || 'Untitled'} Resume`;
    await saveResume(data, title, resumeId, currentTemplate);
    toast({
      title: "Success",
      description: "Resume saved successfully",
    });
  };

  const handleDownload = async () => {
    const title = resumeTitle || `${data.fullName || 'Untitled'} Resume`;
    await saveDownloadedResume(data, title, currentTemplate);
    
    toast({
      title: "Success",
      description: "Resume downloaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="sticky top-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
                <p className="text-gray-600">Create your professional resume</p>
              </div>

              <div className="mb-6">
                <Label htmlFor="resume-title">Resume Title</Label>
                <Input
                  id="resume-title"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="Enter resume title"
                  className="mb-4"
                />
                <TemplateSelector 
                  currentTemplate={currentTemplate} 
                  onTemplateChange={setCurrentTemplate} 
                />
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 mt-6">
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
                            value={data.fullName}
                            onChange={(e) => updateField("fullName", e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={data.location}
                            onChange={(e) => updateField("location", e.target.value)}
                            placeholder="New York, NY"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={data.website}
                            onChange={(e) => updateField("website", e.target.value)}
                            placeholder="www.johndoe.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={data.linkedin}
                            onChange={(e) => updateField("linkedin", e.target.value)}
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={data.github}
                          onChange={(e) => updateField("github", e.target.value)}
                          placeholder="github.com/johndoe"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={data.summary}
                        onChange={(e) => updateField("summary", e.target.value)}
                        placeholder="Write a brief summary of your professional experience and goals..."
                        rows={4}
                      />
                    </CardContent>
                  </Card>

                  <AchievementsInput
                    achievements={data.achievements}
                    onChange={(achievements) => updateField("achievements", achievements)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Work Experience
                        <Button
                          onClick={() => addArrayItem("experience", { position: "", company: "", duration: "", description: "" })}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {data.experience.map((exp, index) => (
                        <div key={index} className="grid gap-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Experience {index + 1}</Label>
                            <Button
                              onClick={() => removeArrayItem("experience", index)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`position-${index}`}>Position</Label>
                              <Input
                                id={`position-${index}`}
                                value={exp.position}
                                onChange={(e) => updateArrayItem("experience", index, { ...exp, position: e.target.value })}
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`company-${index}`}>Company</Label>
                              <Input
                                id={`company-${index}`}
                                value={exp.company}
                                onChange={(e) => updateArrayItem("experience", index, { ...exp, company: e.target.value })}
                                placeholder="Tech Company Inc."
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`duration-${index}`}>Duration</Label>
                            <Input
                              id={`duration-${index}`}
                              value={exp.duration}
                              onChange={(e) => updateArrayItem("experience", index, { ...exp, duration: e.target.value })}
                              placeholder="Jan 2020 - Present"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`description-${index}`}>Description</Label>
                            <Textarea
                              id={`description-${index}`}
                              value={exp.description}
                              onChange={(e) => updateArrayItem("experience", index, { ...exp, description: e.target.value })}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Projects
                        <Button
                          onClick={() => addArrayItem("projects", { name: "", description: "", technologies: "", link: "" })}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {data.projects.map((project, index) => (
                        <div key={index} className="grid gap-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Project {index + 1}</Label>
                            <Button
                              onClick={() => removeArrayItem("projects", index)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                              <Input
                                id={`project-name-${index}`}
                                value={project.name}
                                onChange={(e) => updateArrayItem("projects", index, { ...project, name: e.target.value })}
                                placeholder="Awesome Project"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`project-link-${index}`}>Link (Optional)</Label>
                              <Input
                                id={`project-link-${index}`}
                                value={project.link}
                                onChange={(e) => updateArrayItem("projects", index, { ...project, link: e.target.value })}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`project-description-${index}`}>Description</Label>
                            <Textarea
                              id={`project-description-${index}`}
                              value={project.description}
                              onChange={(e) => updateArrayItem("projects", index, { ...project, description: e.target.value })}
                              placeholder="Describe what this project does..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`project-technologies-${index}`}>Technologies Used</Label>
                            <Input
                              id={`project-technologies-${index}`}
                              value={project.technologies}
                              onChange={(e) => updateArrayItem("projects", index, { ...project, technologies: e.target.value })}
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Education
                        <Button
                          onClick={() => addArrayItem("education", { degree: "", school: "", year: "", grade: "" })}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {data.education.map((edu, index) => (
                        <div key={index} className="grid gap-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Education {index + 1}</Label>
                            <Button
                              onClick={() => removeArrayItem("education", index)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`degree-${index}`}>Degree</Label>
                              <Input
                                id={`degree-${index}`}
                                value={edu.degree}
                                onChange={(e) => updateArrayItem("education", index, { ...edu, degree: e.target.value })}
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`school-${index}`}>School</Label>
                              <Input
                                id={`school-${index}`}
                                value={edu.school}
                                onChange={(e) => updateArrayItem("education", index, { ...edu, school: e.target.value })}
                                placeholder="University of Technology"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`year-${index}`}>Year</Label>
                              <Input
                                id={`year-${index}`}
                                value={edu.year}
                                onChange={(e) => updateArrayItem("education", index, { ...edu, year: e.target.value })}
                                placeholder="2020"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`grade-${index}`}>Grade (Optional)</Label>
                              <Input
                                id={`grade-${index}`}
                                value={edu.grade}
                                onChange={(e) => updateArrayItem("education", index, { ...edu, grade: e.target.value })}
                                placeholder="3.8 GPA"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Certifications
                        <Button
                          onClick={() => addArrayItem("certifications", { name: "", issuer: "", year: "" })}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Certification
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {data.certifications.map((cert, index) => (
                        <div key={index} className="grid gap-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Certification {index + 1}</Label>
                            <Button
                              onClick={() => removeArrayItem("certifications", index)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div>
                            <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                            <Input
                              id={`cert-name-${index}`}
                              value={cert.name}
                              onChange={(e) => updateArrayItem("certifications", index, { ...cert, name: e.target.value })}
                              placeholder="AWS Certified Solutions Architect"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                              <Input
                                id={`cert-issuer-${index}`}
                                value={cert.issuer}
                                onChange={(e) => updateArrayItem("certifications", index, { ...cert, issuer: e.target.value })}
                                placeholder="Amazon Web Services"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`cert-year-${index}`}>Year</Label>
                              <Input
                                id={`cert-year-${index}`}
                                value={cert.year}
                                onChange={(e) => updateArrayItem("certifications", index, { ...cert, year: e.target.value })}
                                placeholder="2023"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill (press Enter)"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addSkill(e.currentTarget.value);
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                          <Button
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              addSkill(input.value);
                              input.value = "";
                            }}
                            variant="outline"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {skill}
                              <button
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a language (press Enter)"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addLanguage(e.currentTarget.value);
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                          <Button
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              addLanguage(input.value);
                              input.value = "";
                            }}
                            variant="outline"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {data.languages.map((language, index) => (
                            <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {language}
                              <button
                                onClick={() => removeLanguage(index)}
                                className="ml-1 text-green-600 hover:text-green-800"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 mt-8">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Resume
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="sticky top-8">
              <ResumePreview data={data} template={currentTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
