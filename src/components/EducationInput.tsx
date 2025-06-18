
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { ResumeData } from "@/pages/Builder";

interface EducationInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const EducationInput = ({ data, onChange }: EducationInputProps) => {
  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { degree: "", school: "", year: "", grade: "" }]
    });
  };

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Education</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {data.education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Education {index + 1}</span>
            {data.education.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`degree-${index}`}>Degree</Label>
              <Input
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div>
              <Label htmlFor={`school-${index}`}>School</Label>
              <Input
                id={`school-${index}`}
                value={edu.school}
                onChange={(e) => updateEducation(index, "school", e.target.value)}
                placeholder="University Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`year-${index}`}>Year</Label>
              <Input
                id={`year-${index}`}
                value={edu.year}
                onChange={(e) => updateEducation(index, "year", e.target.value)}
                placeholder="2020"
              />
            </div>
            <div>
              <Label htmlFor={`grade-${index}`}>Grade</Label>
              <Input
                id={`grade-${index}`}
                value={edu.grade}
                onChange={(e) => updateEducation(index, "grade", e.target.value)}
                placeholder="3.8 GPA"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
