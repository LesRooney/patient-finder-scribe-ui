
import React from 'react';
import { X } from 'lucide-react';
import { Patient } from '../data/mockPatients';

interface PatientTagProps {
  patient: Patient;
  onRemove: (patientId: string) => void;
}

const PatientTag: React.FC<PatientTagProps> = ({ patient, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20 hover:bg-primary/20 transition-colors">
      <span className="font-medium">{patient.id}</span>
      <span className="text-muted-foreground">•</span>
      <span>{patient.name}</span>
      <button
        onClick={() => onRemove(patient.id)}
        className="ml-1 p-0.5 hover:bg-primary/30 rounded-full transition-colors"
        aria-label={`Remove ${patient.name}`}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default PatientTag;
