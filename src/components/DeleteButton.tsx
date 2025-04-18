
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DeleteButtonProps {
  onDelete: () => void;
  className?: string;
}

const DeleteButton = ({ onDelete, className }: DeleteButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      className={cn("absolute bottom-2 right-2 z-20 h-8 w-8 rounded-full opacity-90 shadow-md hover:opacity-100 bg-teal-600 hover:bg-teal-700", className)}
      onClick={handleClick}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteButton;
