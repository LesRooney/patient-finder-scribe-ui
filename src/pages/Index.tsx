
import React from 'react';
import PatientFilter from '../components/PatientFilter';
import { mockPatients } from '../data/mockPatients';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Index = () => {
  // Get first 30 patients for the example
  const examplePatients = mockPatients.slice(0, 30);
  const patientIdList = examplePatients.map(patient => patient.id).join('\n');

  const handleCopyPatientIds = () => {
    navigator.clipboard.writeText(patientIdList);
  };

  const handleCopyPatientId = (patientId: string) => {
    navigator.clipboard.writeText(patientId);
  };

  const handleCopyPatientName = (patientName: string) => {
    navigator.clipboard.writeText(patientName);
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
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Example of patient IDs</h3>
              <button
                onClick={handleCopyPatientIds}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Copy All IDs
              </button>
            </div>
            <p className="text-muted-foreground text-sm mb-4 text-left" style={{ marginTop: '8px' }}>
              Click on individual patient IDs to copy them, or drag to select multiple entries.
            </p>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Patient ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examplePatients.map(patient => (
                    <TableRow key={patient.id} className="hover:bg-gray-50">
                      <TableCell 
                        className="font-mono text-sm cursor-pointer select-text hover:bg-blue-50 transition-colors text-left"
                        onClick={() => handleCopyPatientId(patient.id)}
                        title="Click to copy patient ID"
                      >
                        {patient.id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
