import React, { useState } from 'react';
import PatientFilterA from './PatientFilterA';
import PatientFilterB from './PatientFilterB';

interface PatientFilterProps {
  onFilterApply?: (filterType: 'A' | 'B', patientIds: string[]) => void;
  onFilterClear?: (filterType: 'A' | 'B') => void;
}

const PatientFilter: React.FC<PatientFilterProps> = ({ onFilterApply, onFilterClear }) => {
  const [openFilter, setOpenFilter] = useState<'A' | 'B' | null>(null);
  const [appliedFilterA, setAppliedFilterA] = useState<string[]>([]);
  const [appliedFilterB, setAppliedFilterB] = useState<string[]>([]);

  const handleToggleA = () => {
    setOpenFilter(openFilter === 'A' ? null : 'A');
  };

  const handleToggleB = () => {
    setOpenFilter(openFilter === 'B' ? null : 'B');
  };

  const handleCloseAll = () => {
    setOpenFilter(null);
  };

  const handleApplyA = (patientIds: string[]) => {
    setAppliedFilterA(patientIds);
    onFilterApply?.('A', patientIds);
    setOpenFilter(null);
  };

  const handleApplyB = (patientIds: string[]) => {
    setAppliedFilterB(patientIds);
    onFilterApply?.('B', patientIds);
    setOpenFilter(null);
  };

  const handleClearA = () => {
    setAppliedFilterA([]);
    onFilterClear?.('A');
  };

  const handleClearB = () => {
    setAppliedFilterB([]);
    onFilterClear?.('B');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <PatientFilterA 
          isOpen={openFilter === 'A'}
          onToggle={handleToggleA}
          onClose={handleCloseAll}
          onApply={handleApplyA}
          onClear={handleClearA}
          appliedCount={appliedFilterA.length}
          hasActiveFilter={appliedFilterA.length > 0}
          appliedPatientIds={appliedFilterA}
        />
        <PatientFilterB 
          isOpen={openFilter === 'B'}
          onToggle={handleToggleB}
          onClose={handleCloseAll}
          onApply={handleApplyB}
          onClear={handleClearB}
          appliedCount={appliedFilterB.length}
          hasActiveFilter={appliedFilterB.length > 0}
          appliedPatientIds={appliedFilterB}
        />
      </div>
    </div>
  );
};

export default PatientFilter;
