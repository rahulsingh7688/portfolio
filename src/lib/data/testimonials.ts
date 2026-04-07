export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Priya Sharma',
    role: 'Head of Product',
    company: 'FinTech Startup',
    quote:
      'Rahul transformed our data chaos into a clean, automated reporting system in just 6 weeks. What used to take our team 2 days every week now runs automatically every Monday morning. His ability to understand business needs and translate them into technical solutions is rare.',
  },
  {
    name: 'Alok Barthwal',
    role: 'CTO',
    company: 'Neelkanth Media Company',
    quote:
      'We hired Rahul to modernize our data warehouse and the results exceeded expectations. Query times dropped from hours to minutes, and our infrastructure costs fell by 35%. He\'s not just a technical expert — he communicates clearly with non-technical stakeholders too.',
  },
  {
    name: 'Ananya Patel',
    role: 'Data Science Lead',
    company: 'Analytics Consultancy',
    quote:
      'Rahul built our LaTeX OCR pipeline from scratch and delivered a model that actually works in production. His deep understanding of the CNN-LSTM architecture and his attention to evaluation metrics (CER/WER) gave us confidence in the results. Highly recommend for any AI/ML project.',
  },
];
