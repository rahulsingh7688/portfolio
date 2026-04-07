export interface ExperienceEntry {
  title: string;
  company: string;
  dateRange: string;
  description: string;
  isCurrent: boolean;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'Manager - MPS Insight & Analytics',
    company: 'Current Company',
    dateRange: '2022 – Present',
    description:
      'Leading data analytics and AI initiatives across the MPS division. Architected data warehouse modernization reducing costs by 40%. Built and deployed OCR models and analytics dashboards serving 50+ publishers. Managing a team of analysts and driving AI-readiness across data infrastructure.',
    isCurrent: true,
  },
  {
    title: 'Senior Data Analyst',
    company: 'Previous Company',
    dateRange: '2019 – 2022',
    description:
      'Designed and maintained BI dashboards and reporting pipelines. Led migration of legacy reporting systems to modern cloud infrastructure. Delivered actionable insights to C-suite stakeholders through automated reporting.',
    isCurrent: false,
  },
  {
    title: 'Data Analyst',
    company: 'Earlier Company',
    dateRange: '2016 – 2019',
    description:
      'Built SQL-based reporting systems and ETL pipelines. Analyzed web traffic and publisher performance metrics. Introduced Python automation reducing manual data processing by 60%.',
    isCurrent: false,
  },
  {
    title: 'Business Analyst',
    company: 'First Company',
    dateRange: '2015 – 2016',
    description:
      'Supported data-driven decision making in ITES/BPO operations. Created Excel-based dashboards and KPI tracking systems. Identified process inefficiencies saving 200+ man-hours per month.',
    isCurrent: false,
  },
];
