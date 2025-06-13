
import React from 'react';
import PatientFilterA from './PatientFilterA';
import PatientFilterB from './PatientFilterB';

const PatientFilter: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <PatientFilterA />
        <PatientFilterB />
      </div>
    </div>
  );
};

export default PatientFilter;
