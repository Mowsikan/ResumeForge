
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { ResumeData } from "@/pages/Builder";

interface LanguagesInputProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const LanguagesInput = ({ data, onChange }: LanguagesInputProps) => {
  const [newLanguage, setNewLanguage] = useState("");

  const addLanguage = () => {
    if (newLanguage.trim()) {
      onChange({ ...data, languages: [...data.languages, newLanguage.trim()] });
      setNewLanguage("");
    }
  };

  const removeLanguage = (index: number) => {
    onChange({ ...data, languages: data.languages.filter((_, i) => i !== index) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Languages</Label>
      
      <div className="flex gap-2">
        <Input
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a language"
        />
        <Button
          type="button"
          variant="outline"
          onClick={addLanguage}
          disabled={!newLanguage.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.languages.map((language, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            <span>{language}</span>
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="text-green-600 hover:text-green-800"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
