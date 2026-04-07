export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    title: 'Data Analytics & Business Intelligence',
    description:
      'Turn your raw data into revenue-driving decisions. I design end-to-end BI pipelines, interactive dashboards, and automated reporting systems that give your team real-time visibility — without waiting on engineering.',
    icon: 'BarChart3',
  },
  {
    title: 'AI/ML Model Development',
    description:
      'From OCR systems to NLP pipelines, I build production-ready AI models tailored to your business problem. You get a working model, clean training data, and evaluation metrics — not just a Jupyter notebook.',
    icon: 'Brain',
  },
  {
    title: 'Backend API Development',
    description:
      'Scalable Django REST APIs with JWT authentication, Swagger documentation, and production-grade architecture. Whether it\'s a fintech app or a data platform, I build backends that handle real-world load.',
    icon: 'Code2',
  },
  {
    title: 'Data Warehouse Design & Migration',
    description:
      'Stuck with slow, expensive legacy data infrastructure? I migrate Hive/EMR systems to modern cloud warehouses, optimize query performance, and set up AI-ready data layers — typically cutting costs by 30–50%.',
    icon: 'Database',
  },
];
