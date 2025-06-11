
import React from 'react';
import { Patient } from '../data/mockPatients';

interface PatientSuggestionsListProps {
  suggestions: Patient[];
  highlightedIndex: number;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  onSelectPatient: (patient: Patient) => void;
}

const PatientSuggestionsList: React.FC<PatientSuggestionsListProps> = ({
  suggestions,
  highlightedIndex,
  suggestionsRef,
  onSelectPatient
}) => {
  return (
    <div className="w-56">
      <div
        ref={suggestionsRef}
        className="bg-popover border border-border rounded-md shadow-lg min-h-[280px] overflow-y-auto"
      >
        <div className="p-2">
          <div className="text-xs text-muted-foreground mb-2 px-2">
            Found {suggestions.length} matching patients
          </div>
          {suggestions.map((patient, index) => (
            <button
              key={patient.id}
              onClick={() => onSelectPatient(patient)}
              className={`w-full text-left p-3 rounded-md hover:bg-accent transition-colors ${
                index === highlightedIndex ? 'bg-accent' : ''
              }`}
            >
              <div className="font-medium text-sm">{patient.id}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientSuggestionsList;
