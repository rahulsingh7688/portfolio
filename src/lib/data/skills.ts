export interface Skill {
  name: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon?: string;
}

export interface SkillCategory {
  category: 'Data & Analytics' | 'AI / Machine Learning' | 'Backend Development' | 'Cloud & Infrastructure';
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: 'Data & Analytics',
    skills: [
      { name: 'Python', proficiency: 5 },
      { name: 'SQL', proficiency: 5 },
      { name: 'Data Warehousing', proficiency: 5 },
      { name: 'Spark', proficiency: 4 },
      { name: 'Hive', proficiency: 4 },
      { name: 'Plotly Dash', proficiency: 4 },
      { name: 'Pandas', proficiency: 4 },
    ],
  },
  {
    category: 'AI / Machine Learning',
    skills: [
      { name: 'TensorFlow', proficiency: 4 },
      { name: 'CNN/LSTM', proficiency: 4 },
      { name: 'OCR', proficiency: 4 },
      { name: 'Feature Engineering', proficiency: 4 },
      { name: 'NLP', proficiency: 3 },
      { name: 'CTC Loss', proficiency: 3 },
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'REST APIs', proficiency: 5 },
      { name: 'Django', proficiency: 4 },
      { name: 'JWT Auth', proficiency: 4 },
      { name: 'Swagger', proficiency: 4 },
      { name: 'PostgreSQL', proficiency: 4 },
      { name: 'Next.js', proficiency: 3 },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    skills: [
      { name: 'AWS EMR', proficiency: 4 },
      { name: 'Hive/EMR', proficiency: 4 },
      { name: 'Google Cloud', proficiency: 3 },
      { name: 'Docker', proficiency: 3 },
      { name: 'CI/CD', proficiency: 3 },
    ],
  },
];
