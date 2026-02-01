export interface Country {
  code: string;
  flag: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  status: 'active' | 'inactive';
  country: Country;
}

// 6 countries: USA, GBR, FRA, JPN + 2 random (DEU, AUS)
export const countries: Country[] = [
  { code: 'USA', flag: '🇺🇸' },
  { code: 'GBR', flag: '🇬🇧' },
  { code: 'FRA', flag: '🇫🇷' },
  { code: 'JPN', flag: '🇯🇵' },
  { code: 'DEU', flag: '🇩🇪' },
  { code: 'AUS', flag: '🇦🇺' },
];

// ID lengths by country: USA=6, GBR=7, FRA=8, JPN=10, DEU=11, AUS=15
const getIdLengthForCountry = (countryCode: string): number => {
  switch (countryCode) {
    case 'USA': return 6;
    case 'GBR': return 7;
    case 'FRA': return 8;
    case 'JPN': return 10;
    case 'DEU': return 11;
    case 'AUS': return 15;
    default: return 8;
  }
};

const generateId = (index: number, countryCode: string): string => {
  const length = getIdLengthForCountry(countryCode);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const prefix = String(index + 1).padStart(3, '0');
  let result = prefix;
  while (result.length < length) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result.slice(0, length);
};

// Pre-generate fixed IDs so they're consistent
const fixedIds: string[] = [
  'USA001', 'GBR0012', 'FRA00123', 'JPN0012345', 'DEU00123456', 'AUS001234567890',
  'USA002', 'GBR0023', 'FRA00234', 'JPN0023456', 'DEU00234567', 'AUS002345678901',
  'USA003', 'GBR0034', 'FRA00345', 'JPN0034567', 'DEU00345678', 'AUS003456789012',
  'USA004', 'GBR0045', 'FRA00456', 'JPN0045678', 'DEU00456789', 'AUS004567890123',
  'USA005', 'GBR0056', 'FRA00567', 'JPN0056789', 'DEU00567890', 'AUS005678901234',
];

const getCountry = (index: number): Country => countries[index % countries.length];

export const mockPatients: Patient[] = [
  { id: 'USA001', name: 'John Smith', dateOfBirth: '1985-03-15', status: 'active', country: countries[0] },
  { id: 'GBR0012', name: 'Sarah Johnson', dateOfBirth: '1990-07-22', status: 'active', country: countries[1] },
  { id: 'FRA00123', name: 'Michael Brown', dateOfBirth: '1978-11-08', status: 'active', country: countries[2] },
  { id: 'JPN0012345', name: 'Emily Davis', dateOfBirth: '1992-01-30', status: 'inactive', country: countries[3] },
  { id: 'DEU00123456', name: 'David Wilson', dateOfBirth: '1983-05-12', status: 'active', country: countries[4] },
  { id: 'AUS001234567890', name: 'Lisa Anderson', dateOfBirth: '1987-09-03', status: 'active', country: countries[5] },
  { id: 'USA002', name: 'Robert Taylor', dateOfBirth: '1975-12-18', status: 'active', country: countries[0] },
  { id: 'GBR0023', name: 'Jennifer Martinez', dateOfBirth: '1989-04-25', status: 'active', country: countries[1] },
  { id: 'FRA00234', name: 'Christopher Lee', dateOfBirth: '1981-08-14', status: 'inactive', country: countries[2] },
  { id: 'JPN0023456', name: 'Amanda White', dateOfBirth: '1993-06-07', status: 'active', country: countries[3] },
  { id: 'DEU00234567', name: 'James Thompson', dateOfBirth: '1979-02-28', status: 'active', country: countries[4] },
  { id: 'AUS002345678901', name: 'Maria Garcia', dateOfBirth: '1986-10-11', status: 'active', country: countries[5] },
  { id: 'USA003', name: 'William Clark', dateOfBirth: '1984-07-19', status: 'active', country: countries[0] },
  { id: 'GBR0034', name: 'Jessica Rodriguez', dateOfBirth: '1991-03-02', status: 'active', country: countries[1] },
  { id: 'FRA00345', name: 'Daniel Lewis', dateOfBirth: '1977-12-25', status: 'inactive', country: countries[2] },
  { id: 'JPN0034567', name: 'Ashley Walker', dateOfBirth: '1988-08-16', status: 'active', country: countries[3] },
  { id: 'DEU00345678', name: 'Matthew Hall', dateOfBirth: '1982-11-29', status: 'active', country: countries[4] },
  { id: 'AUS003456789012', name: 'Nicole Young', dateOfBirth: '1994-05-08', status: 'active', country: countries[5] },
  { id: 'USA004', name: 'Kevin King', dateOfBirth: '1976-01-14', status: 'active', country: countries[0] },
  { id: 'GBR0045', name: 'Stephanie Wright', dateOfBirth: '1990-09-21', status: 'active', country: countries[1] },
  { id: 'FRA00456', name: 'Thomas Mitchell', dateOfBirth: '1985-04-12', status: 'active', country: countries[2] },
  { id: 'JPN0045678', name: 'Rachel Green', dateOfBirth: '1992-06-18', status: 'active', country: countries[3] },
  { id: 'DEU00456789', name: 'Brandon Scott', dateOfBirth: '1979-08-22', status: 'active', country: countries[4] },
  { id: 'AUS004567890123', name: 'Melissa Turner', dateOfBirth: '1988-10-15', status: 'inactive', country: countries[5] },
  { id: 'USA005', name: 'Gregory Adams', dateOfBirth: '1983-12-03', status: 'active', country: countries[0] },
  { id: 'GBR0056', name: 'Samantha Baker', dateOfBirth: '1991-02-27', status: 'active', country: countries[1] },
  { id: 'FRA00567', name: 'Patrick Nelson', dateOfBirth: '1976-07-09', status: 'active', country: countries[2] },
  { id: 'JPN0056789', name: 'Kimberly Hill', dateOfBirth: '1989-11-14', status: 'active', country: countries[3] },
  { id: 'DEU00567890', name: 'Steven Carter', dateOfBirth: '1982-05-06', status: 'active', country: countries[4] },
  { id: 'AUS005678901234', name: 'Heather Parker', dateOfBirth: '1987-09-30', status: 'active', country: countries[5] },
  { id: 'USA006', name: 'Jonathan Cooper', dateOfBirth: '1984-01-17', status: 'active', country: countries[0] },
  { id: 'GBR0067', name: 'Andrea Reed', dateOfBirth: '1993-03-24', status: 'active', country: countries[1] },
  { id: 'FRA00678', name: 'Ryan Murphy', dateOfBirth: '1980-06-11', status: 'inactive', country: countries[2] },
  { id: 'JPN0067890', name: 'Cynthia Bailey', dateOfBirth: '1986-08-19', status: 'active', country: countries[3] },
  { id: 'DEU00678901', name: 'Eric Rivera', dateOfBirth: '1990-12-07', status: 'active', country: countries[4] },
  { id: 'AUS006789012345', name: 'Monica Foster', dateOfBirth: '1985-04-25', status: 'active', country: countries[5] },
  { id: 'USA007', name: 'Nathan Ward', dateOfBirth: '1977-07-13', status: 'active', country: countries[0] },
  { id: 'GBR0078', name: 'Denise Torres', dateOfBirth: '1992-10-02', status: 'active', country: countries[1] },
  { id: 'FRA00789', name: 'Justin Peterson', dateOfBirth: '1988-01-28', status: 'active', country: countries[2] },
  { id: 'JPN0078901', name: 'Crystal Gray', dateOfBirth: '1983-05-16', status: 'active', country: countries[3] },
  { id: 'DEU00789012', name: 'Carl Ramirez', dateOfBirth: '1981-09-08', status: 'active', country: countries[4] },
  { id: 'AUS007890123456', name: 'Vanessa James', dateOfBirth: '1994-11-21', status: 'active', country: countries[5] },
  { id: 'USA008', name: 'Marcus Watson', dateOfBirth: '1979-03-15', status: 'inactive', country: countries[0] },
  { id: 'GBR0089', name: 'Tiffany Brooks', dateOfBirth: '1987-06-04', status: 'active', country: countries[1] },
  { id: 'FRA00890', name: 'Donald Kelly', dateOfBirth: '1975-08-29', status: 'active', country: countries[2] },
  { id: 'JPN0089012', name: 'Angela Sanders', dateOfBirth: '1991-12-12', status: 'active', country: countries[3] },
  { id: 'DEU00890123', name: 'Keith Price', dateOfBirth: '1984-02-20', status: 'active', country: countries[4] },
  { id: 'AUS008901234567', name: 'Brenda Bennett', dateOfBirth: '1986-04-07', status: 'active', country: countries[5] },
  { id: 'USA009', name: 'Roy Wood', dateOfBirth: '1990-07-26', status: 'active', country: countries[0] },
  { id: 'GBR0090', name: 'Deborah Barnes', dateOfBirth: '1982-10-14', status: 'active', country: countries[1] },
  { id: 'FRA00901', name: 'Gerald Ross', dateOfBirth: '1978-01-05', status: 'active', country: countries[2] },
  { id: 'JPN0090123', name: 'Beverly Henderson', dateOfBirth: '1989-03-18', status: 'active', country: countries[3] },
  { id: 'DEU00901234', name: 'Roger Coleman', dateOfBirth: '1985-06-23', status: 'inactive', country: countries[4] },
  { id: 'AUS009012345678', name: 'Shirley Jenkins', dateOfBirth: '1993-09-10', status: 'active', country: countries[5] },
  { id: 'USA010', name: 'Arthur Perry', dateOfBirth: '1980-11-27', status: 'active', country: countries[0] },
  { id: 'GBR0101', name: 'Carolyn Powell', dateOfBirth: '1987-02-14', status: 'active', country: countries[1] },
  { id: 'FRA01012', name: 'Wayne Long', dateOfBirth: '1976-05-01', status: 'active', country: countries[2] },
  { id: 'JPN0101234', name: 'Joyce Patterson', dateOfBirth: '1992-08-16', status: 'active', country: countries[3] },
  { id: 'DEU01012345', name: 'Lawrence Hughes', dateOfBirth: '1983-12-03', status: 'active', country: countries[4] },
  { id: 'AUS010123456789', name: 'Virginia Flores', dateOfBirth: '1988-04-20', status: 'active', country: countries[5] },
];
