
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/pages/Builder";

interface SummaryInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const SummaryInput = ({ data, onChange }: SummaryInputProps) => {
  return (
    <div>
      <Label htmlFor="summary">Professional Summary</Label>
      <Textarea
        id="summary"
        value={data.summary}
        onChange={(e) => onChange({ ...data, summary: e.target.value })}
        placeholder="Write a brief professional summary..."
        rows={4}
      />
    </div>
  );
};
