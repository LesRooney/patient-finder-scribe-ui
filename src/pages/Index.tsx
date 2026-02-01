
import React from 'react';
import PatientFilter from '../components/PatientFilter';
import { mockPatients } from '../data/mockPatients';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Country data with 3-letter codes and flag emojis
const countries = [
  { code: 'USA', flag: '🇺🇸' },
  { code: 'GBR', flag: '🇬🇧' },
  { code: 'FRA', flag: '🇫🇷' },
  { code: 'DEU', flag: '🇩🇪' },
  { code: 'CAN', flag: '🇨🇦' },
  { code: 'AUS', flag: '🇦🇺' },
  { code: 'JPN', flag: '🇯🇵' },
  { code: 'BRA', flag: '🇧🇷' },
  { code: 'ITA', flag: '🇮🇹' },
  { code: 'ESP', flag: '🇪🇸' },
];

// Generate varied length patient IDs
const generateVariedId = (originalId: string, index: number): string => {
  const lengths = [6, 7, 8, 10, 11, 15];
  const targetLength = lengths[index % lengths.length];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  if (originalId.length >= targetLength) {
    return originalId.slice(0, targetLength);
  }
  
  let result = originalId;
  while (result.length < targetLength) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result.slice(0, targetLength);
};

// Assign countries ensuring USA, GBR, FRA appear early
const assignCountry = (index: number) => {
  if (index === 0) return countries[0]; // USA
  if (index === 1) return countries[1]; // GBR
  if (index === 2) return countries[2]; // FRA
  return countries[index % countries.length];
};

const Index = () => {
  // Get first 30 patients for the example with varied IDs and countries
  const examplePatients = mockPatients.slice(0, 30).map((patient, index) => ({
    ...patient,
    id: generateVariedId(patient.id, index),
    country: assignCountry(index),
  }));
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
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Patient Filter Component Example</h1>
          <p className="text-xl text-muted-foreground">
            Filter and search prototype for Q3 release
          </p>
        </div>

        <div className="mb-8">
          <PatientFilter />
        </div>


        <div className="mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Example of patient IDs</h3>
              <button
                onClick={handleCopyPatientIds}
                className="px-4 py-2 bg-[#EEF1F4] hover:bg-[#DDE0E5] text-[#1A1C1E] text-sm rounded-md transition-colors border border-[#EEF1F4]"
              >
                Copy All IDs
              </button>
            </div>
            <p className="text-muted-foreground text-sm mb-4 text-left" style={{ marginTop: '8px' }}>
              Click on individual patient IDs to copy them, or drag to select multiple entries to test this prototype.
            </p>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Patient ID</TableHead>
                    <TableHead className="text-right">Country</TableHead>
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
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm text-muted-foreground">{patient.country.code}</span>
                          <span style={{ fontSize: '20px', lineHeight: '24px' }}>{patient.country.flag}</span>
                        </div>
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
