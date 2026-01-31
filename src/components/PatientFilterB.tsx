import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPatients, Patient } from '../data/mockPatients';
import PatientTag from './PatientTag';

interface PatientFilterBProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const PatientFilterB: React.FC<PatientFilterBProps> = ({ isOpen, onToggle, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fixed height for search area
  const searchAreaHeight = 114;

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
    if (selectedPatients.length >= 20) {
      return;
    }
    
    setSelectedPatients(prev => [...prev, patient]);
    setSearchQuery('');
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    
    // Focus the search input and position cursor at the end after adding a patient
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.setSelectionRange(searchInputRef.current.value.length, searchInputRef.current.value.length);
      }
    }, 0);
  };

  const handleRemovePatient = (patientId: string) => {
    setSelectedPatients(prev => prev.filter(patient => patient.id !== patientId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Check if the last character is a space or comma (delimiter)
    if (value.endsWith(' ') || value.endsWith(',')) {
      const trimmedValue = value.slice(0, -1).trim();
      if (trimmedValue) {
        // Try to find a matching patient
        const patient = mockPatients.find(p => 
          !selectedPatients.some(selected => selected.id === p.id) &&
          (p.id.toLowerCase() === trimmedValue.toLowerCase() ||
           p.name.toLowerCase() === trimmedValue.toLowerCase())
        );
        if (patient && selectedPatients.length < 20) {
          handleSelectPatient(patient);
          return;
        }
      }
    }
    
    setSearchQuery(value);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const pastedIds = pastedText.split(/[\s,;]+/).filter(id => id.trim());
    
    pastedIds.forEach(id => {
      const patient = mockPatients.find(p => p.id === id.trim());
      if (patient && !selectedPatients.some(selected => selected.id === patient.id) && selectedPatients.length < 20) {
        setSelectedPatients(prev => [...prev, patient]);
      }
    });
    
    setSearchQuery('');
    e.preventDefault();
  };

  const handleApply = () => {
    console.log('Applied filters with patients B:', selectedPatients.map(p => p.id));
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

  const dynamicHeight = searchAreaHeight;
  const isOverLimit = selectedPatients.length > 15;

  return (
    <div className="relative">
      <Button
        onClick={handleFilterToggle}
        className={`flex items-center gap-2 text-white border-2 rounded-2xl transition-all duration-200 ${
          isOpen 
            ? 'bg-[#0070C0] border-blue-500' 
            : 'bg-[#0070C0] border-transparent hover:bg-[#005FAB] hover:text-white'
        }`}
        variant="ghost"
      >
        Patient ID B
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
        {selectedPatients.length > 0 && (
          <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
            {selectedPatients.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-12 left-0 z-50" ref={containerRef}>
          <div className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden flex">
            {/* Search area */}
            <div className="p-4" style={{ width: '416px' }}>
              <div className="relative">
                <div className={`relative border rounded-md bg-background transition-colors ${
                  isSearchFocused ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-input'
                }`} style={{ height: `${dynamicHeight}px`, width: '384px' }}>
                  
                  {/* Search icon - fixed in top left */}
                  <div className="absolute top-3 left-3 z-10">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>

                  {/* Patient tags and input section */}
                  <div className="p-3 h-full overflow-y-auto" style={{ paddingLeft: '36px', paddingRight: '36px' }}>
                    <div className="flex flex-wrap gap-1 items-start content-start min-h-full">
                      {selectedPatients.map(patient => (
                        <PatientTag
                          key={patient.id}
                          patient={patient}
                          onRemove={handleRemovePatient}
                        />
                      ))}
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder={selectedPatients.length === 0 ? "Type or paste patient IDs..." : ""}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onPaste={handlePaste}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        className="flex-1 min-w-[120px] bg-transparent outline-none text-base placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {selectedPatients.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 bg-gray-400 hover:bg-gray-500 rounded-full transition-colors z-10"
                      aria-label="Clear all patients"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  )}
                </div>
                
                <div className="flex items-start justify-between mt-3 mb-4">
                  <p className="text-xs text-muted-foreground flex-1 pr-4 text-left">
                    Paste, search, or filter up to 15 patients maximum. Press Enter to add individually.
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {isOverLimit ? (
                      <>
                        <span className="text-red-500 font-medium">{selectedPatients.length}</span> / 15
                      </>
                    ) : (
                      `${selectedPatients.length} / 15`
                    )}
                  </span>
                </div>
              </div>

              {selectedPatients.length >= 15 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                  <p className="text-sm text-yellow-800">
                    You've reached the maximum limit of 15 patients. Please adjust your search.
                  </p>
                </div>
              )}

              <Button onClick={handleApply} className="w-full bg-[#0070C0] hover:bg-[#005FAB] text-white" style={{ width: '384px' }}>
                Apply
              </Button>
            </div>

            {/* Suggestions area on the right */}
            {hasInteracted && (
              <div className="border-l border-border" style={{ width: '240px' }}>
                <div className="p-4 h-full">
                  <div className="text-xs text-muted-foreground mb-2">
                    {suggestions.length > 0 ? `Found ${suggestions.length} matching patients` : 'No matches found'}
                  </div>
                  {suggestions.length > 0 && (
                    <div style={{ height: '200px' }} className="overflow-y-auto">
                      {suggestions.map((patient, index) => (
                        <button
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient)}
                          className={`w-full text-left p-3 rounded-md hover:bg-accent transition-colors ${
                            index === highlightedIndex ? 'bg-accent' : ''
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

export default PatientFilterB;
