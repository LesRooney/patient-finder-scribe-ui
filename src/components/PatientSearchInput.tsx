
import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Patient } from '../data/mockPatients';
import PatientTag from './PatientTag';

interface PatientSearchInputProps {
  searchQuery: string;
  selectedPatients: Patient[];
  isSearchFocused: boolean;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onRemovePatient: (patientId: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}

const PatientSearchInput: React.FC<PatientSearchInputProps> = ({
  searchQuery,
  selectedPatients,
  isSearchFocused,
  searchInputRef,
  onSearchChange,
  onPaste,
  onSearchFocus,
  onSearchBlur,
  onRemovePatient,
  onClearAll,
  onApply
}) => {
  return (
    <div className="w-[580px]">
      <div className="bg-popover border border-border rounded-lg shadow-lg p-4 min-h-[280px]">
        <div className="relative">
          <div className={`relative border rounded-md bg-background min-h-[188px] p-3 transition-colors ${
            isSearchFocused ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-input'
          }`}>
            <div className="flex flex-wrap gap-1 mb-2">
              {selectedPatients.map(patient => (
                <PatientTag
                  key={patient.id}
                  patient={patient}
                  onRemove={onRemovePatient}
                />
              ))}
              {selectedPatients.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="inline-flex items-center justify-center w-5 h-5 bg-gray-400 hover:bg-gray-500 rounded-full transition-colors"
                  aria-label="Clear all patients"
                >
                  <X size={10} className="text-white" />
                </button>
              )}
            </div>
            <div className="flex items-start">
              <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0 mt-1" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Type or paste patient IDs..."
                value={searchQuery}
                onChange={onSearchChange}
                onPaste={onPaste}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
                className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="flex items-start justify-between mt-3 mb-4 gap-4">
            <p className="text-xs text-muted-foreground flex-1">
              Paste, search, or filter up to 15 patients maximum. Press Enter to add individually.
            </p>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {selectedPatients.length} / 15
            </span>
          </div>
        </div>

        {selectedPatients.length >= 15 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
            <p className="text-sm text-yellow-800">
              You've reached the maximum limit of 15 patients.
            </p>
          </div>
        )}

        <Button onClick={onApply} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PatientSearchInput;
