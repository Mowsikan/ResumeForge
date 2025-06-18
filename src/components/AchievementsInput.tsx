
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
}

interface AchievementsInputProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export const AchievementsInput = ({ achievements, onChange }: AchievementsInputProps) => {
  const addAchievement = () => {
    onChange([...achievements, { title: "", description: "" }]);
  };

  const removeAchievement = (index: number) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Key Achievements</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addAchievement}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Achievement
        </Button>
      </div>

      {achievements.length === 0 && (
        <p className="text-sm text-gray-500 italic">No achievements added yet. Click "Add Achievement" to get started.</p>
      )}

      {achievements.map((achievement, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Achievement {index + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeAchievement(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`achievement-title-${index}`} className="text-sm font-medium">
              Achievement Title
            </Label>
            <Input
              id={`achievement-title-${index}`}
              value={achievement.title}
              onChange={(e) => updateAchievement(index, "title", e.target.value)}
              placeholder="e.g., Excellence Award, Process Improvement, Team Leadership"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`achievement-description-${index}`} className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id={`achievement-description-${index}`}
              value={achievement.description}
              onChange={(e) => updateAchievement(index, "description", e.target.value)}
              placeholder="Describe your achievement and its impact..."
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
