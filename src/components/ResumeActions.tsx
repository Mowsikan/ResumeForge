
import { Button } from "@/components/ui/button";
import { TemplateSelector } from "@/components/TemplateSelector";
import { Save, Download } from "lucide-react";

interface ResumeActionsProps {
  currentTemplate: string;
  onTemplateChange: (templateId: string) => void;
  onSave: () => void;
  onDownload: () => void;
  isSaving?: boolean;
  title: string;
  onTitleChange: (title: string) => void;
}

export const ResumeActions = ({
  currentTemplate,
  onTemplateChange,
  onSave,
  onDownload,
  isSaving = false,
  title,
  onTitleChange
}: ResumeActionsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="resume-title" className="block text-sm font-medium text-gray-700 mb-2">
          Resume Title
        </label>
        <input
          id="resume-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter resume title"
        />
      </div>

      <TemplateSelector
        currentTemplate={currentTemplate}
        onTemplateChange={onTemplateChange}
      />

      <div className="flex gap-2">
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 bg-gradient-primary hover:opacity-90"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Resume'}
        </Button>

        <Button
          onClick={onDownload}
          variant="outline"
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};
