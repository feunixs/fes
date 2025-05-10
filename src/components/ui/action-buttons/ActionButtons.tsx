
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Download, Printer } from "lucide-react";

type ActionButtonsProps = {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
};

export const ActionButtons = ({
  onAdd,
  onEdit,
  onDelete,
  onExport,
  onPrint,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {onAdd && (
        <Button onClick={onAdd} className="bg-feunix-600 hover:bg-feunix-700">
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      )}
      
      {onEdit && (
        <Button onClick={onEdit} variant="outline">
          <Edit className="h-4 w-4 mr-2" /> Edit
        </Button>
      )}
      
      {onDelete && (
        <Button onClick={onDelete} variant="outline" className="text-red-500 hover:text-red-700 hover:border-red-300">
          <Trash className="h-4 w-4 mr-2" /> Delete
        </Button>
      )}
      
      {onExport && (
        <Button onClick={onExport} variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      )}
      
      {onPrint && (
        <Button onClick={onPrint} variant="outline">
          <Printer className="h-4 w-4 mr-2" /> Print
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
