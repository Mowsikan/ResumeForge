
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Achievement } from "@/types/resume";

interface AchievementsInputProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export const AchievementsInput = ({ achievements, onChange }: AchievementsInputProps) => {
  const addAchievement = () => {
    onChange([...achievements, { title: "", description: "" }]);
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    onChange(updated);
  };

  const removeAchievement = (index: number) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Key Achievements
          <Button onClick={addAchievement} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="grid gap-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Achievement {index + 1}</Label>
              <Button
                onClick={() => removeAchievement(index)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <Label htmlFor={`achievement-title-${index}`}>Title</Label>
              <Input
                id={`achievement-title-${index}`}
                value={achievement.title}
                onChange={(e) => updateAchievement(index, "title", e.target.value)}
                placeholder="e.g., Excellence Award"
              />
            </div>
            <div>
              <Label htmlFor={`achievement-description-${index}`}>Description</Label>
              <Textarea
                id={`achievement-description-${index}`}
                value={achievement.description}
                onChange={(e) => updateAchievement(index, "description", e.target.value)}
                placeholder="Brief description of the achievement..."
                rows={3}
              />
            </div>
          </div>
        ))}
        {achievements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No achievements added yet. Click "Add Achievement" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
