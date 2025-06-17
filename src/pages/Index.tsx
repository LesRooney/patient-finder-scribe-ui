
import React from 'react';
import PatientFilter from '../components/PatientFilter';
import { mockPatients } from '../data/mockPatients';

const Index = () => {
  // Get first 30 patients for the example
  const examplePatients = mockPatients.slice(0, 30);
  const patientIdList = examplePatients.map(patient => patient.id).join('\n');

  const handleCopyPatientIds = () => {
    navigator.clipboard.writeText(patientIdList);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Patient Filter Example</h1>
          <p className="text-xl text-muted-foreground">
            Filter and search through patient records with our advanced patient ID filter
          </p>
        </div>

        <div className="mb-8">
          <PatientFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Search</h3>
            <p className="text-muted-foreground text-sm">
              Search by patient ID or name with real-time suggestions and autocomplete functionality.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Bulk Selection</h3>
            <p className="text-muted-foreground text-sm">
              Select up to 15 patients at once. Paste multiple patient IDs or select them individually.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Visual Tags</h3>
            <p className="text-muted-foreground text-sm">
              Selected patients appear as interactive tags that can be easily removed with one click.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Patient List Example</h3>
              <button
                onClick={handleCopyPatientIds}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Copy All IDs
              </button>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Copy these patient IDs and paste them into the filter above to test the functionality.
            </p>
            <div className="bg-gray-50 rounded-md p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm font-mono">
                {examplePatients.map(patient => (
                  <div
                    key={patient.id}
                    className="p-2 bg-white rounded border hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => navigator.clipboard.writeText(patient.id)}
                    title="Click to copy this ID"
                  >
                    {patient.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
