
import React from 'react';
import { Button } from '@/components/ui/button';

interface PatientFilterButtonProps {
  selectedCount: number;
  onToggle: () => void;
}

const PatientFilterButton: React.FC<PatientFilterButtonProps> = ({
  selectedCount,
  onToggle
}) => {
  return (
    <Button
      onClick={onToggle}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
    >
      Patient ID
      {selectedCount > 0 && (
        <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
          {selectedCount}
        </span>
      )}
    </Button>
  );
};

export default PatientFilterButton;
