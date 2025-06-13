
import React, { useState } from 'react';
import PatientFilterA from './PatientFilterA';
import PatientFilterB from './PatientFilterB';

const PatientFilter: React.FC = () => {
  const [openFilter, setOpenFilter] = useState<'A' | 'B' | null>(null);

  const handleToggleA = () => {
    setOpenFilter(openFilter === 'A' ? null : 'A');
  };

  const handleToggleB = () => {
    setOpenFilter(openFilter === 'B' ? null : 'B');
  };

  const handleCloseAll = () => {
    setOpenFilter(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <PatientFilterA 
          isOpen={openFilter === 'A'}
          onToggle={handleToggleA}
          onClose={handleCloseAll}
        />
        <PatientFilterB 
          isOpen={openFilter === 'B'}
          onToggle={handleToggleB}
          onClose={handleCloseAll}
        />
      </div>
    </div>
  );
};

export default PatientFilter;
