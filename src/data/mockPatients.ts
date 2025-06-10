
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  status: 'active' | 'inactive';
}

export const mockPatients: Patient[] = [
  { id: 'PT001', name: 'John Smith', dateOfBirth: '1985-03-15', status: 'active' },
  { id: 'PT002', name: 'Sarah Johnson', dateOfBirth: '1990-07-22', status: 'active' },
  { id: 'PT003', name: 'Michael Brown', dateOfBirth: '1978-11-08', status: 'active' },
  { id: 'PT004', name: 'Emily Davis', dateOfBirth: '1992-01-30', status: 'inactive' },
  { id: 'PT005', name: 'David Wilson', dateOfBirth: '1983-05-12', status: 'active' },
  { id: 'PT006', name: 'Lisa Anderson', dateOfBirth: '1987-09-03', status: 'active' },
  { id: 'PT007', name: 'Robert Taylor', dateOfBirth: '1975-12-18', status: 'active' },
  { id: 'PT008', name: 'Jennifer Martinez', dateOfBirth: '1989-04-25', status: 'active' },
  { id: 'PT009', name: 'Christopher Lee', dateOfBirth: '1981-08-14', status: 'inactive' },
  { id: 'PT010', name: 'Amanda White', dateOfBirth: '1993-06-07', status: 'active' },
  { id: 'PT011', name: 'James Thompson', dateOfBirth: '1979-02-28', status: 'active' },
  { id: 'PT012', name: 'Maria Garcia', dateOfBirth: '1986-10-11', status: 'active' },
  { id: 'PT013', name: 'William Clark', dateOfBirth: '1984-07-19', status: 'active' },
  { id: 'PT014', name: 'Jessica Rodriguez', dateOfBirth: '1991-03-02', status: 'active' },
  { id: 'PT015', name: 'Daniel Lewis', dateOfBirth: '1977-12-25', status: 'inactive' },
  { id: 'PT016', name: 'Ashley Walker', dateOfBirth: '1988-08-16', status: 'active' },
  { id: 'PT017', name: 'Matthew Hall', dateOfBirth: '1982-11-29', status: 'active' },
  { id: 'PT018', name: 'Nicole Young', dateOfBirth: '1994-05-08', status: 'active' },
  { id: 'PT019', name: 'Kevin King', dateOfBirth: '1976-01-14', status: 'active' },
  { id: 'PT020', name: 'Stephanie Wright', dateOfBirth: '1990-09-21', status: 'active' },
];
