import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPatients, Patient } from '../data/mockPatients';
import PatientTag from './PatientTag';

interface SelectedPatient extends Patient {
  isInvalid?: boolean;
}

interface PatientFilterBProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onApply: (patientIds: string[]) => void;
  onClear: () => void;
  appliedCount: number;
  hasActiveFilter: boolean;
  appliedPatientIds: string[];
}

const PatientFilterB: React.FC<PatientFilterBProps> = ({ 
  isOpen, 
  onToggle, 
  onClose, 
  onApply, 
  onClear,
  appliedCount,
  hasActiveFilter,
  appliedPatientIds 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<SelectedPatient[]>([]);
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fixed height for search area
  const searchAreaHeight = 114;
  const maxPatients = 15;
  const hardLimit = 20;

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
            handleAddPatientById(searchQuery.trim());
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

  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPatients([]);
    onClear();
  };

  const handleAddPatientById = (id: string) => {
    if (selectedPatients.some(p => p.id === id)) {
      setSearchQuery('');
      return;
    }

    if (selectedPatients.length >= hardLimit) {
      return;
    }

    const existingPatient = mockPatients.find(p => p.id.toLowerCase() === id.toLowerCase());
    
    if (existingPatient) {
      handleSelectPatient(existingPatient);
    } else {
      // Add as invalid patient (not in database)
      const invalidPatient: SelectedPatient = {
        id: id,
        name: 'Unknown',
        dateOfBirth: '',
        status: 'inactive',
        country: { code: 'UNK', flag: '❓', prefix: '' },
        isInvalid: true,
      };
      setSelectedPatients(prev => [...prev, invalidPatient]);
      setSearchQuery('');
      setShowSuggestions(false);
      
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    if (selectedPatients.length >= hardLimit) {
      return;
    }
    
    setSelectedPatients(prev => [...prev, { ...patient, isInvalid: false }]);
    setSearchQuery('');
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    
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
        handleAddPatientById(trimmedValue);
        return;
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
      const trimmedId = id.trim();
      if (!selectedPatients.some(p => p.id === trimmedId) && selectedPatients.length < hardLimit) {
        const patient = mockPatients.find(p => p.id === trimmedId);
        if (patient) {
          setSelectedPatients(prev => {
            if (!prev.some(p => p.id === patient.id) && prev.length < hardLimit) {
              return [...prev, { ...patient, isInvalid: false }];
            }
            return prev;
          });
        } else {
          // Add as invalid
          const invalidPatient: SelectedPatient = {
            id: trimmedId,
            name: 'Unknown',
            dateOfBirth: '',
            status: 'inactive',
            country: { code: 'UNK', flag: '❓', prefix: '' },
            isInvalid: true,
          };
          setSelectedPatients(prev => {
            if (!prev.some(p => p.id === trimmedId) && prev.length < hardLimit) {
              return [...prev, invalidPatient];
            }
            return prev;
          });
        }
      }
    });
    
    setSearchQuery('');
    e.preventDefault();
  };

  const handleApply = () => {
    // Only pass valid patient IDs
    const validPatientIds = selectedPatients
      .filter(p => !p.isInvalid)
      .map(p => p.id);
    onApply(validPatientIds);
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
  const overLimit = selectedPatients.length - maxPatients;
  const isPressed = isOpen || hasActiveFilter;

  return (
    <div className="relative">
      <Button
        onClick={handleFilterToggle}
        className={`flex items-center gap-2 text-[#1A1C1E] border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:ring-offset-2 ${
          isPressed 
            ? 'bg-[#E7F2FE] border-[#0070C0]' 
            : 'bg-[#EEF1F4] border-[#EEF1F4] hover:bg-[#DDE0E5] hover:border-[#DDE0E5]'
        }`}
        variant="ghost"
      >
        {hasActiveFilter && !isOpen ? (
          <>
            <span>Patient ID B:</span>
            <span className="text-[#0070C0]">
              {appliedPatientIds[0]?.substring(0, 7)}{appliedPatientIds[0]?.length > 7 ? '…' : ''}
              {appliedCount > 1 && `, +${appliedCount - 1}`}
            </span>
          </>
        ) : (
          <>
            Patient ID B
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </>
        )}
        {hasActiveFilter && !isOpen && (
          <button
            onClick={handleClearFilter}
            className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-[#0070C0] hover:bg-[#005FAB] rounded-full transition-colors"
            aria-label="Clear filter"
          >
            <X size={10} className="text-white" />
          </button>
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
                  <div className="absolute left-3 z-10" style={{ top: '14px' }}>
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
                          isInvalid={patient.isInvalid}
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
                  <span className="text-xs whitespace-nowrap">
                    {overLimit > 0 ? (
                      <span className="text-[#BF0018] font-medium">-{overLimit} / 15</span>
                    ) : (
                      <span className="text-muted-foreground">{selectedPatients.length} / 15</span>
                    )}
                  </span>
                </div>
              </div>

              {selectedPatients.length >= maxPatients && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                  <p className="text-sm text-yellow-800 text-left">
                    You have reached the maximum limit of 15 patients.
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
