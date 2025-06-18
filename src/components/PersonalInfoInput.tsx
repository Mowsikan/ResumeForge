
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResumeData } from "@/pages/Builder";

interface PersonalInfoInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const PersonalInfoInput = ({ data, onChange }: PersonalInfoInputProps) => {
  const updateField = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <>
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
          placeholder="City, State"
        />
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={data.website}
          onChange={(e) => updateField("website", e.target.value)}
          placeholder="https://yourwebsite.com"
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

      <div>
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={data.github}
          onChange={(e) => updateField("github", e.target.value)}
          placeholder="github.com/johndoe"
        />
      </div>
    </>
  );
};
