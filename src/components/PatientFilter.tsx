
import React, { useState, useRef, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPatients, Patient } from '../data/mockPatients';
import PatientTag from './PatientTag';

const PatientFilter: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

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
            // Try to find exact match by ID or name
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
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions, suggestions, highlightedIndex, searchQuery, selectedPatients]);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setShowSuggestions(false);
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
    console.log('Applied filters with patients:', selectedPatients.map(p => p.id));
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative" ref={filterRef}>
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={handleFilterToggle}
          variant={isFilterOpen ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Filter size={18} />
          Patient ID Filter
          {selectedPatients.length > 0 && (
            <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedPatients.length}
            </span>
          )}
        </Button>
      </div>

      {isFilterOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 flex gap-6">
          {/* Left side - Compact search dropdown */}
          <div className="w-80">
            <div className="bg-popover border border-border rounded-lg shadow-lg p-4">
              <div className="relative">
                <div className="relative border border-input rounded-md bg-background min-h-20 p-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedPatients.map(patient => (
                      <PatientTag
                        key={patient.id}
                        patient={patient}
                        onRemove={handleRemovePatient}
                      />
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={selectedPatients.length === 0 ? "Type or paste patient IDs..." : "Add more patients..."}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onPaste={handlePaste}
                      className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to add patient. Up to 15 patients maximum.
                </p>
              </div>

              {selectedPatients.length > 0 && (
                <div className="flex items-center justify-between mt-4 mb-4">
                  <span className="text-sm text-muted-foreground">
                    {selectedPatients.length} of 15 patients selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPatients([])}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              )}

              {selectedPatients.length >= 15 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    You've reached the maximum limit of 15 patients.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleApply} className="flex-1">
                  Apply Filter
                </Button>
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="flex-1 max-w-md">
              <div
                ref={suggestionsRef}
                className="bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
              >
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2 px-2">
                    Found {suggestions.length} matching patients
                  </div>
                  {suggestions.map((patient, index) => (
                    <button
                      key={patient.id}
                      onClick={() => handleSelectPatient(patient)}
                      className={`w-full text-left p-3 rounded-md hover:bg-accent transition-colors ${
                        index === highlightedIndex ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{patient.id}</div>
                          <div className="text-sm text-muted-foreground">{patient.name}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {patient.status === 'active' ? '🟢' : '🔴'} {patient.status}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientFilter;
