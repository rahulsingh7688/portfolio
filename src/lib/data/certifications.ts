export interface Certification {
  name: string;
  org: string;
  year: string;
  verifyUrl: string;
  icon: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Google Associate Data Analyst',
    org: 'Google',
    year: '2023',
    verifyUrl: 'https://www.credly.com',
    icon: 'Award',
  },
  {
    name: 'Data Warehouse Management Certification',
    org: 'Industry Certification Body',
    year: '2022',
    verifyUrl: '',
    icon: 'Database',
  },
];
