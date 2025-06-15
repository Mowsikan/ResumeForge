
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ResumePreview } from "@/components/ResumePreview";
import { PricingModal } from "@/components/PricingModal";

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
}

const Builder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    summary: "Experienced software developer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and leading development teams.",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Software Developer",
        duration: "2021 - Present",
        description: "Lead development of web applications using React and Node.js. Managed a team of 5 developers and improved system performance by 40%."
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "2019 - 2021",
        description: "Built responsive web applications using modern JavaScript frameworks. Collaborated with design team to implement pixel-perfect UIs."
      }
    ],
    education: [
      {
        school: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2019"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"]
  });

  const [showPricingModal, setShowPricingModal] = useState(false);

  const updateField = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const updateSkills = (skills: string) => {
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", duration: "", description: "" }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", year: "" }]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ResumeForge</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hidden lg:flex">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Resume Preview</DialogTitle>
                  </DialogHeader>
                  <div className="overflow-auto">
                    <ResumePreview data={resumeData} />
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                onClick={() => setShowPricingModal(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
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
                      onChange={(e) => updateField('fullName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.location}
                      onChange={(e) => updateField('location', e.target.value)}
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
                  placeholder="Write a brief summary of your professional background..."
                  value={resumeData.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Work Experience</CardTitle>
                  <Button onClick={addExperience} variant="outline" size="sm">
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={exp.duration}
                        onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation} variant="outline" size="sm">
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>School</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
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
              <CardContent>
                <Label>Skills (comma-separated)</Label>
                <Textarea
                  placeholder="JavaScript, React, Node.js, Python..."
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => updateSkills(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="h-[calc(100vh-8rem)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-full overflow-auto">
                  <ResumePreview data={resumeData} />
                </CardContent>
              </Card>
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
