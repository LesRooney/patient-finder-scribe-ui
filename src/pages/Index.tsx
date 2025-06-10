
import React from 'react';
import PatientFilter from '../components/PatientFilter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Patient Management System</h1>
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
      </div>
    </div>
  );
};

export default Index;
