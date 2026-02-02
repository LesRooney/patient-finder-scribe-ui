export interface Country {
  code: string;
  flag: string;
  prefix: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  status: 'active' | 'inactive';
  country: Country;
}

// 6 countries with specific prefixes: USA=RG112-, GBR=1001-, FRA=299-, JPN=TK7-, DEU=BN88-, AUS=SYD2024-
export const countries: Country[] = [
  { code: 'USA', flag: '🇺🇸', prefix: 'RG112-' },
  { code: 'GBR', flag: '🇬🇧', prefix: '1001-' },
  { code: 'FRA', flag: '🇫🇷', prefix: '299-' },
  { code: 'JPN', flag: '🇯🇵', prefix: 'TK7-' },
  { code: 'DEU', flag: '🇩🇪', prefix: 'BN88-' },
  { code: 'AUS', flag: '🇦🇺', prefix: 'SYD2024-' },
];

// Generate patient IDs with country-specific prefixes
// Total lengths: USA=6, GBR=7, FRA=8, JPN=10, DEU=11, AUS=15
const generatePatientId = (index: number, country: Country): string => {
  const targetLengths: Record<string, number> = {
    'USA': 6,
    'GBR': 7,
    'FRA': 8,
    'JPN': 10,
    'DEU': 11,
    'AUS': 15,
  };
  
  const targetLength = targetLengths[country.code] || 8;
  const prefixLength = country.prefix.length;
  const suffixLength = targetLength - prefixLength;
  
  // Generate numeric suffix padded with zeros
  const suffix = String(index + 1).padStart(suffixLength, '0');
  
  return country.prefix + suffix.slice(0, suffixLength);
};

export const mockPatients: Patient[] = [
  // USA patients (RG112-X, 6 chars total)
  { id: 'RG112-', name: 'John Smith', dateOfBirth: '1985-03-15', status: 'active', country: countries[0] },
  { id: 'RG1121', name: 'Robert Taylor', dateOfBirth: '1975-12-18', status: 'active', country: countries[0] },
  { id: 'RG1122', name: 'William Clark', dateOfBirth: '1984-07-19', status: 'active', country: countries[0] },
  { id: 'RG1123', name: 'Kevin King', dateOfBirth: '1976-01-14', status: 'active', country: countries[0] },
  { id: 'RG1124', name: 'Gregory Adams', dateOfBirth: '1983-12-03', status: 'active', country: countries[0] },
  { id: 'RG1125', name: 'Jonathan Cooper', dateOfBirth: '1984-01-17', status: 'active', country: countries[0] },
  { id: 'RG1126', name: 'Nathan Ward', dateOfBirth: '1977-07-13', status: 'active', country: countries[0] },
  { id: 'RG1127', name: 'Marcus Watson', dateOfBirth: '1979-03-15', status: 'inactive', country: countries[0] },
  { id: 'RG1128', name: 'Roy Wood', dateOfBirth: '1990-07-26', status: 'active', country: countries[0] },
  { id: 'RG1129', name: 'Arthur Perry', dateOfBirth: '1980-11-27', status: 'active', country: countries[0] },
  
  // GBR patients (1001-XX, 7 chars total)
  { id: '1001-01', name: 'Sarah Johnson', dateOfBirth: '1990-07-22', status: 'active', country: countries[1] },
  { id: '1001-02', name: 'Jennifer Martinez', dateOfBirth: '1989-04-25', status: 'active', country: countries[1] },
  { id: '1001-03', name: 'Jessica Rodriguez', dateOfBirth: '1991-03-02', status: 'active', country: countries[1] },
  { id: '1001-04', name: 'Stephanie Wright', dateOfBirth: '1990-09-21', status: 'active', country: countries[1] },
  { id: '1001-05', name: 'Samantha Baker', dateOfBirth: '1991-02-27', status: 'active', country: countries[1] },
  { id: '1001-06', name: 'Andrea Reed', dateOfBirth: '1993-03-24', status: 'active', country: countries[1] },
  { id: '1001-07', name: 'Denise Torres', dateOfBirth: '1992-10-02', status: 'active', country: countries[1] },
  { id: '1001-08', name: 'Tiffany Brooks', dateOfBirth: '1987-06-04', status: 'active', country: countries[1] },
  { id: '1001-09', name: 'Deborah Barnes', dateOfBirth: '1982-10-14', status: 'active', country: countries[1] },
  { id: '1001-10', name: 'Carolyn Powell', dateOfBirth: '1987-02-14', status: 'active', country: countries[1] },
  
  // FRA patients (299-XXXX, 8 chars total)
  { id: '299-0001', name: 'Michael Brown', dateOfBirth: '1978-11-08', status: 'active', country: countries[2] },
  { id: '299-0002', name: 'Christopher Lee', dateOfBirth: '1981-08-14', status: 'inactive', country: countries[2] },
  { id: '299-0003', name: 'Daniel Lewis', dateOfBirth: '1977-12-25', status: 'inactive', country: countries[2] },
  { id: '299-0004', name: 'Thomas Mitchell', dateOfBirth: '1985-04-12', status: 'active', country: countries[2] },
  { id: '299-0005', name: 'Patrick Nelson', dateOfBirth: '1976-07-09', status: 'active', country: countries[2] },
  { id: '299-0006', name: 'Ryan Murphy', dateOfBirth: '1980-06-11', status: 'inactive', country: countries[2] },
  { id: '299-0007', name: 'Justin Peterson', dateOfBirth: '1988-01-28', status: 'active', country: countries[2] },
  { id: '299-0008', name: 'Donald Kelly', dateOfBirth: '1975-08-29', status: 'active', country: countries[2] },
  { id: '299-0009', name: 'Gerald Ross', dateOfBirth: '1978-01-05', status: 'active', country: countries[2] },
  { id: '299-0010', name: 'Wayne Long', dateOfBirth: '1976-05-01', status: 'active', country: countries[2] },
  
  // JPN patients (TK7-XXXXXX, 10 chars total)
  { id: 'TK7-000001', name: 'Emily Davis', dateOfBirth: '1992-01-30', status: 'inactive', country: countries[3] },
  { id: 'TK7-000002', name: 'Amanda White', dateOfBirth: '1993-06-07', status: 'active', country: countries[3] },
  { id: 'TK7-000003', name: 'Ashley Walker', dateOfBirth: '1988-08-16', status: 'active', country: countries[3] },
  { id: 'TK7-000004', name: 'Rachel Green', dateOfBirth: '1992-06-18', status: 'active', country: countries[3] },
  { id: 'TK7-000005', name: 'Kimberly Hill', dateOfBirth: '1989-11-14', status: 'active', country: countries[3] },
  { id: 'TK7-000006', name: 'Cynthia Bailey', dateOfBirth: '1986-08-19', status: 'active', country: countries[3] },
  { id: 'TK7-000007', name: 'Crystal Gray', dateOfBirth: '1983-05-16', status: 'active', country: countries[3] },
  { id: 'TK7-000008', name: 'Angela Sanders', dateOfBirth: '1991-12-12', status: 'active', country: countries[3] },
  { id: 'TK7-000009', name: 'Beverly Henderson', dateOfBirth: '1989-03-18', status: 'active', country: countries[3] },
  { id: 'TK7-000010', name: 'Joyce Patterson', dateOfBirth: '1992-08-16', status: 'active', country: countries[3] },
  
  // DEU patients (BN88-XXXXXX, 11 chars total)
  { id: 'BN88-00001', name: 'David Wilson', dateOfBirth: '1983-05-12', status: 'active', country: countries[4] },
  { id: 'BN88-00002', name: 'James Thompson', dateOfBirth: '1979-02-28', status: 'active', country: countries[4] },
  { id: 'BN88-00003', name: 'Matthew Hall', dateOfBirth: '1982-11-29', status: 'active', country: countries[4] },
  { id: 'BN88-00004', name: 'Brandon Scott', dateOfBirth: '1979-08-22', status: 'active', country: countries[4] },
  { id: 'BN88-00005', name: 'Steven Carter', dateOfBirth: '1982-05-06', status: 'active', country: countries[4] },
  { id: 'BN88-00006', name: 'Eric Rivera', dateOfBirth: '1990-12-07', status: 'active', country: countries[4] },
  { id: 'BN88-00007', name: 'Carl Ramirez', dateOfBirth: '1981-09-08', status: 'active', country: countries[4] },
  { id: 'BN88-00008', name: 'Keith Price', dateOfBirth: '1984-02-20', status: 'active', country: countries[4] },
  { id: 'BN88-00009', name: 'Roger Coleman', dateOfBirth: '1985-06-23', status: 'inactive', country: countries[4] },
  { id: 'BN88-00010', name: 'Lawrence Hughes', dateOfBirth: '1983-12-03', status: 'active', country: countries[4] },
  
  // AUS patients (SYD2024-XXXXXX, 15 chars total)
  { id: 'SYD2024-000001', name: 'Lisa Anderson', dateOfBirth: '1987-09-03', status: 'active', country: countries[5] },
  { id: 'SYD2024-000002', name: 'Maria Garcia', dateOfBirth: '1986-10-11', status: 'active', country: countries[5] },
  { id: 'SYD2024-000003', name: 'Nicole Young', dateOfBirth: '1994-05-08', status: 'active', country: countries[5] },
  { id: 'SYD2024-000004', name: 'Melissa Turner', dateOfBirth: '1988-10-15', status: 'inactive', country: countries[5] },
  { id: 'SYD2024-000005', name: 'Heather Parker', dateOfBirth: '1987-09-30', status: 'active', country: countries[5] },
  { id: 'SYD2024-000006', name: 'Monica Foster', dateOfBirth: '1985-04-25', status: 'active', country: countries[5] },
  { id: 'SYD2024-000007', name: 'Vanessa James', dateOfBirth: '1994-11-21', status: 'active', country: countries[5] },
  { id: 'SYD2024-000008', name: 'Brenda Bennett', dateOfBirth: '1986-04-07', status: 'active', country: countries[5] },
  { id: 'SYD2024-000009', name: 'Shirley Jenkins', dateOfBirth: '1993-09-10', status: 'active', country: countries[5] },
  { id: 'SYD2024-000010', name: 'Virginia Flores', dateOfBirth: '1988-04-20', status: 'active', country: countries[5] },
];
