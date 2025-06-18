
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import { ResumeData } from "@/pages/Builder";

interface ProjectsInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ProjectsInput = ({ data, onChange }: ProjectsInputProps) => {
  const addProject = () => {
    onChange({
      ...data,
      projects: [...data.projects, { name: "", description: "", technologies: "", link: "" }]
    });
  };

  const removeProject = (index: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_, i) => i !== index)
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = data.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    onChange({ ...data, projects: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Projects</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addProject}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {data.projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Project {index + 1}</span>
            {data.projects.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div>
            <Label htmlFor={`project-name-${index}`}>Project Name</Label>
            <Input
              id={`project-name-${index}`}
              value={project.name}
              onChange={(e) => updateProject(index, "name", e.target.value)}
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <Label htmlFor={`project-description-${index}`}>Description</Label>
            <Textarea
              id={`project-description-${index}`}
              value={project.description}
              onChange={(e) => updateProject(index, "description", e.target.value)}
              placeholder="Describe your project..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor={`project-technologies-${index}`}>Technologies</Label>
            <Input
              id={`project-technologies-${index}`}
              value={project.technologies}
              onChange={(e) => updateProject(index, "technologies", e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <Label htmlFor={`project-link-${index}`}>Link</Label>
            <Input
              id={`project-link-${index}`}
              value={project.link}
              onChange={(e) => updateProject(index, "link", e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
