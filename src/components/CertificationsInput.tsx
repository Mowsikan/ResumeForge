
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { ResumeData } from "@/pages/Builder";

interface CertificationsInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const CertificationsInput = ({ data, onChange }: CertificationsInputProps) => {
  const addCertification = () => {
    onChange({
      ...data,
      certifications: [...data.certifications, { name: "", issuer: "", year: "" }]
    });
  };

  const removeCertification = (index: number) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== index)
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = data.certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    onChange({ ...data, certifications: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Certifications</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCertification}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </Button>
      </div>

      {data.certifications.map((cert, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Certification {index + 1}</span>
            {data.certifications.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div>
            <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
            <Input
              id={`cert-name-${index}`}
              value={cert.name}
              onChange={(e) => updateCertification(index, "name", e.target.value)}
              placeholder="AWS Certified Solutions Architect"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
              <Input
                id={`cert-issuer-${index}`}
                value={cert.issuer}
                onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                placeholder="Amazon Web Services"
              />
            </div>
            <div>
              <Label htmlFor={`cert-year-${index}`}>Year</Label>
              <Input
                id={`cert-year-${index}`}
                value={cert.year}
                onChange={(e) => updateCertification(index, "year", e.target.value)}
                placeholder="2023"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
