
import React from 'react';
import { X } from 'lucide-react';
import { Patient } from '../data/mockPatients';

interface PatientTagProps {
  patient: Patient;
  onRemove: (patientId: string) => void;
}

const PatientTag: React.FC<PatientTagProps> = ({ patient, onRemove }) => {
  return (
    <div 
      className="inline-flex items-center gap-1 px-2 rounded text-sm transition-colors bg-[#EEF1F4] hover:bg-[#DDE0E5] text-foreground"
      style={{ height: '24px', borderRadius: '4px' }}
    >
      <span className="font-medium">{patient.id}</span>
      <button
        onClick={() => onRemove(patient.id)}
        className="p-0.5 hover:bg-gray-300 rounded transition-colors"
        aria-label={`Remove ${patient.id}`}
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default PatientTag;
