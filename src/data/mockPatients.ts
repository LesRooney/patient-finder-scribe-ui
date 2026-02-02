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
  isValid?: boolean;
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

// Generate patient IDs with country-specific prefixes and random suffix lengths (5-10 digits)
const generatePatientId = (seed: number, country: Country): string => {
  // Random suffix length between 5 and 10 based on seed
  const suffixLengths = [5, 6, 7, 8, 9, 10];
  const suffixLength = suffixLengths[seed % suffixLengths.length];
  
  // Generate numeric suffix padded with zeros
  const suffix = String(seed + 1).padStart(suffixLength, '0');
  
  return country.prefix + suffix.slice(0, suffixLength);
};

// Randomized country assignments (mixed order)
const countryAssignments = [
  0, 3, 1, 5, 2, 4, 0, 2, 5, 1, // First 10
  3, 4, 0, 1, 5, 2, 3, 0, 4, 1, // Second 10
  2, 5, 3, 4, 0, 1, 2, 3, 5, 4, // Third 10
  0, 1, 2, 3, 4, 5, 0, 1, 2, 3, // Fourth 10
  4, 5, 0, 1, 2, 3, 4, 5, 0, 1, // Fifth 10
  2, 3, 4, 5, 0, 1, 2, 3, 4, 5, // Sixth 10
];

const names = [
  'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson',
  'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez', 'Christopher Lee', 'Amanda White',
  'James Thompson', 'Maria Garcia', 'Daniel Lewis', 'Ashley Walker', 'Matthew Hall',
  'Nicole Young', 'Jessica Rodriguez', 'Rachel Green', 'Brandon Scott', 'Melissa Turner',
  'William Clark', 'Stephanie Wright', 'Thomas Mitchell', 'Kimberly Hill', 'Steven Carter',
  'Heather Parker', 'Kevin King', 'Samantha Baker', 'Patrick Nelson', 'Cynthia Bailey',
  'Gregory Adams', 'Andrea Reed', 'Ryan Murphy', 'Crystal Gray', 'Eric Rivera',
  'Monica Foster', 'Jonathan Cooper', 'Denise Torres', 'Justin Peterson', 'Angela Sanders',
  'Carl Ramirez', 'Vanessa James', 'Nathan Ward', 'Tiffany Brooks', 'Donald Kelly',
  'Beverly Henderson', 'Keith Price', 'Brenda Bennett', 'Gerald Ross', 'Joyce Patterson',
  'Marcus Watson', 'Deborah Barnes', 'Wayne Long', 'Shirley Jenkins', 'Roger Coleman',
  'Virginia Flores', 'Roy Wood', 'Carolyn Powell', 'Lawrence Hughes', 'Arthur Perry',
];

const dates = [
  '1985-03-15', '1990-07-22', '1978-11-08', '1992-01-30', '1983-05-12',
  '1987-09-03', '1975-12-18', '1989-04-25', '1981-08-14', '1993-06-07',
  '1979-02-28', '1986-10-11', '1977-12-25', '1988-08-16', '1982-11-29',
  '1994-05-08', '1991-03-02', '1992-06-18', '1979-08-22', '1988-10-15',
  '1984-07-19', '1990-09-21', '1985-04-12', '1989-11-14', '1982-05-06',
  '1987-09-30', '1976-01-14', '1991-02-27', '1976-07-09', '1986-08-19',
  '1983-12-03', '1993-03-24', '1980-06-11', '1983-05-16', '1990-12-07',
  '1985-04-25', '1984-01-17', '1992-10-02', '1988-01-28', '1991-12-12',
  '1981-09-08', '1994-11-21', '1977-07-13', '1987-06-04', '1975-08-29',
  '1989-03-18', '1984-02-20', '1986-04-07', '1978-01-05', '1992-08-16',
  '1979-03-15', '1982-10-14', '1976-05-01', '1993-09-10', '1985-06-23',
  '1988-04-20', '1990-07-26', '1987-02-14', '1983-12-03', '1980-11-27',
];

const statuses: ('active' | 'inactive')[] = [
  'active', 'active', 'active', 'inactive', 'active',
  'active', 'active', 'active', 'inactive', 'active',
  'active', 'active', 'inactive', 'active', 'active',
  'active', 'active', 'active', 'active', 'inactive',
  'active', 'active', 'active', 'active', 'active',
  'active', 'active', 'active', 'active', 'active',
  'active', 'active', 'inactive', 'active', 'active',
  'active', 'active', 'active', 'active', 'active',
  'active', 'active', 'active', 'active', 'active',
  'active', 'active', 'active', 'active', 'active',
  'inactive', 'active', 'active', 'active', 'inactive',
  'active', 'active', 'active', 'active', 'active',
];

export const mockPatients: Patient[] = Array.from({ length: 60 }, (_, i) => {
  const countryIndex = countryAssignments[i];
  const country = countries[countryIndex];
  return {
    id: generatePatientId(i, country),
    name: names[i],
    dateOfBirth: dates[i],
    status: statuses[i],
    country: country,
  };
});
