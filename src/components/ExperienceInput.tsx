
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import { ResumeData } from "@/pages/Builder";

interface ExperienceInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ExperienceInput = ({ data, onChange }: ExperienceInputProps) => {
  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { position: "", company: "", duration: "", description: "" }]
    });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index)
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = data.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Work Experience</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addExperience}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {data.experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Experience {index + 1}</span>
            {data.experience.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                value={exp.position}
                onChange={(e) => updateExperience(index, "position", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => updateExperience(index, "company", e.target.value)}
                placeholder="Tech Corp"
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`duration-${index}`}>Duration</Label>
            <Input
              id={`duration-${index}`}
              value={exp.duration}
              onChange={(e) => updateExperience(index, "duration", e.target.value)}
              placeholder="Jan 2020 - Present"
            />
          </div>

          <div>
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={exp.description}
              onChange={(e) => updateExperience(index, "description", e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
