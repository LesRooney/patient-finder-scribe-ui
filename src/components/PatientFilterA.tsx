import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPatients, Patient } from '../data/mockPatients';
import PatientTag from './PatientTag';

interface PatientFilterAProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const PatientFilterA: React.FC<PatientFilterAProps> = ({ isOpen, onToggle, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockPatients.filter(patient => 
        !selectedPatients.some(selected => selected.id === patient.id) &&
        (patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
         patient.name.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 10);
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  }, [searchQuery, selectedPatients]);

  // Handle clicks outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions && e.key !== 'Enter') return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            handleSelectPatient(suggestions[highlightedIndex]);
          } else if (searchQuery.trim()) {
            const exactMatch = mockPatients.find(patient => 
              !selectedPatients.some(selected => selected.id === patient.id) &&
              (patient.id.toLowerCase() === searchQuery.toLowerCase() ||
               patient.name.toLowerCase() === searchQuery.toLowerCase())
            );
            if (exactMatch) {
              handleSelectPatient(exactMatch);
            }
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          setHighlightedIndex(-1);
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions, suggestions, highlightedIndex, searchQuery, selectedPatients, onClose]);

  const handleFilterToggle = () => {
    onToggle();
    if (!isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setShowSuggestions(false);
      setHasInteracted(false);
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    if (selectedPatients.length >= 15) {
      return;
    }
    
    setSelectedPatients(prev => [...prev, patient]);
    setSearchQuery('');
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleRemovePatient = (patientId: string) => {
    setSelectedPatients(prev => prev.filter(patient => patient.id !== patientId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const pastedIds = pastedText.split(/[\s,;]+/).filter(id => id.trim());
    
    pastedIds.forEach(id => {
      const patient = mockPatients.find(p => p.id === id.trim());
      if (patient && !selectedPatients.some(selected => selected.id === patient.id) && selectedPatients.length < 15) {
        setSelectedPatients(prev => [...prev, patient]);
      }
    });
    
    setSearchQuery('');
    e.preventDefault();
  };

  const handleApply = () => {
    console.log('Applied filters with patients A:', selectedPatients.map(p => p.id));
    onClose();
  };

  const handleClearAll = () => {
    setSelectedPatients([]);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleFilterToggle}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Patient ID A
        {selectedPatients.length > 0 && (
          <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
            {selectedPatients.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-12 left-0 z-50" ref={containerRef}>
          <div className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden" style={{ width: '408px' }}>
            {/* Search area */}
            <div className="p-3">
              <div className="relative">
                <div className={`relative border rounded-md bg-background transition-colors mx-auto ${
                  isSearchFocused ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-input'
                }`} style={{ height: '184px', width: '384px' }}>
                  <div className="absolute top-3 left-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="absolute top-3 left-8 right-3">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={selectedPatients.length === 0 ? "Type or paste patient IDs..." : ""}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onPaste={handlePaste}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      className="w-full bg-transparent outline-none text-base placeholder:text-muted-foreground"
                    />
                  </div>
                  {selectedPatients.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 bg-gray-400 hover:bg-gray-500 rounded-full transition-colors"
                      aria-label="Clear all patients"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  )}
                  <div className="flex flex-wrap gap-1 mb-2 ml-8 mr-3 mt-3">
                    {selectedPatients.map(patient => (
                      <PatientTag
                        key={patient.id}
                        patient={patient}
                        onRemove={handleRemovePatient}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-1" style={{ height: '4px' }}></div>
                
                <div className="flex items-start justify-between">
                  <p className="text-xs text-muted-foreground flex-1 pr-4 leading-relaxed">
                    Paste, search, or filter up to 15 patients maximum. Press Enter to add individually.
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {selectedPatients.length} / 15
                  </span>
                </div>
              </div>

              {selectedPatients.length >= 15 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-3">
                  <p className="text-sm text-yellow-800">
                    You've reached the maximum limit of 15 patients.
                  </p>
                </div>
              )}

              <div style={{ height: '8px' }}></div>

              {/* Apply button in the middle */}
              <div className="flex justify-center">
                <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700 text-white" style={{ width: '384px' }}>
                  Apply
                </Button>
              </div>
            </div>

            <div style={{ height: '8px' }}></div>

            {/* Suggestions area */}
            {hasInteracted && (
              <div className="border-t border-border">
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2 px-2">
                    {suggestions.length > 0 ? `Found ${suggestions.length} matching patients` : 'No matches found'}
                  </div>
                  {suggestions.length > 0 && (
                    <div style={{ height: '120px' }} className="overflow-y-auto">
                      {suggestions.slice(0, 5).map((patient, index) => (
                        <button
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient)}
                          className={`w-full text-left p-3 rounded-md hover:bg-accent transition-colors ${
                            index === highlightedIndex ?  'bg-accent' : ''
                          }`}
                        >
                          <div className="font-medium text-sm">{patient.id}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientFilterA;
