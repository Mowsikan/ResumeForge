
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Crown, Palette } from "lucide-react";

interface TemplateSelectorProps {
  currentTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export const TemplateSelector = ({ currentTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design",
      premium: false,
      color: "from-blue-50 to-indigo-100"
    },
    {
      id: "professional",
      name: "Professional Elite",
      description: "Two-column layout with achievements sidebar",
      premium: true,
      color: "from-blue-50 to-slate-100"
    },
    {
      id: "sidebar",
      name: "Sidebar Professional",
      description: "Dark sidebar with contact and skills",
      premium: true,
      color: "from-blue-900 to-slate-800"
    },
    {
      id: "recruiter",
      name: "Recruiter Focused",
      description: "Clean layout optimized for HR professionals",
      premium: true,
      color: "from-blue-50 to-gray-100"
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Eye-catching design for creatives",
      premium: true,
      color: "from-purple-50 to-pink-100"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated for senior roles",
      premium: true,
      color: "from-gray-50 to-slate-100"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design",
      premium: false,
      color: "from-green-50 to-emerald-100"
    },
    {
      id: "technical",
      name: "Technical",
      description: "Optimized for developers",
      premium: false,
      color: "from-violet-50 to-purple-100"
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    onTemplateChange(templateId);
    setIsOpen(false);
  };

  const currentTemplateName = templates.find(t => t.id === currentTemplate)?.name || "Modern Professional";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Change Template
          <span className="text-sm text-gray-500">({currentTemplateName})</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4 p-4">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                currentTemplate === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-4">
                <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} rounded-lg mb-3 flex items-center justify-center relative`}>
                  {template.premium && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center mb-2 mx-auto">
                      <span className="text-lg font-bold text-gradient">CV</span>
                    </div>
                    <div className="text-xs text-gray-600">{template.name}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{template.name}</h3>
                    {template.premium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
