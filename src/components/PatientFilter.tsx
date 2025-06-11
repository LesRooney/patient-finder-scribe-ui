
import React from 'react';
import { usePatientFilter } from '../hooks/usePatientFilter';
import PatientFilterButton from './PatientFilterButton';
import PatientSearchInput from './PatientSearchInput';
import PatientSuggestionsList from './PatientSuggestionsList';

const PatientFilter: React.FC = () => {
  const {
    isFilterOpen,
    searchQuery,
    selectedPatients,
    suggestions,
    isSearchFocused,
    searchInputRef,
    suggestionsRef,
    filterRef,
    handleFilterToggle,
    handleSelectPatient,
    handleRemovePatient,
    handleSearchChange,
    handlePaste,
    handleApply,
    handleClearAll,
    handleSearchFocus,
    handleSearchBlur
  } = usePatientFilter();

  return (
    <div className="w-full max-w-6xl mx-auto relative" ref={filterRef}>
      <div className="flex items-center gap-4 mb-6">
        <PatientFilterButton
          selectedCount={selectedPatients.length}
          onToggle={handleFilterToggle}
        />
      </div>

      {isFilterOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 flex gap-3">
          <PatientSearchInput
            searchQuery={searchQuery}
            selectedPatients={selectedPatients}
            isSearchFocused={isSearchFocused}
            searchInputRef={searchInputRef}
            onSearchChange={handleSearchChange}
            onPaste={handlePaste}
            onSearchFocus={handleSearchFocus}
            onSearchBlur={handleSearchBlur}
            onRemovePatient={handleRemovePatient}
            onClearAll={handleClearAll}
            onApply={handleApply}
          />

          {(isSearchFocused || searchQuery.trim()) && suggestions.length > 0 && (
            <PatientSuggestionsList
              suggestions={suggestions}
              highlightedIndex={-1}
              suggestionsRef={suggestionsRef}
              onSelectPatient={handleSelectPatient}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PatientFilter;
