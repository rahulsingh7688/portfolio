export type FilterTag = 'AI' | 'Data' | 'Backend';

export interface CaseStudy {
  problem: string;
  solution: string;
  impact: string;
  techDetails: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  tags: FilterTag[];
  thumbnail: string;
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  
  {
    slug: 'latex-ocr-model',
    title: 'LaTeX OCR Model',
    summary: 'Reduced handwritten equation transcription time from 20 minutes to under 30 seconds with an 8.3% Character Error Rate.',
    stack: ['TensorFlow', 'Python', 'CNN', 'LSTM', 'CTC Loss', 'NLP'],
    tags: ['AI'],
    thumbnail: '/images/projects/latex-ocr-model.jpg',
    caseStudy: {
      problem:
        'Researchers and students manually transcribing handwritten mathematical equations into LaTeX spent 15–30 minutes per page, introducing errors and slowing publication workflows.',
      solution:
        'Built a CNN + LSTM + CTC Loss deep learning pipeline. CNN extracts spatial features from equation images; LSTM models sequential token dependencies; CTC Loss handles variable-length output without explicit alignment. Custom StringLookup tokenizer and beam search decoding for accurate sequence generation.',
      impact:
        'Achieved a Character Error Rate (CER) of 8.3% and Word Error Rate (WER) of 12.1% on benchmark datasets. Reduced transcription time from 20 minutes to under 30 seconds per equation.',
      techDetails:
        '• CNN backbone for spatial feature extraction from equation image patches\n• Bidirectional LSTM layers for sequential token dependency modeling\n• CTC (Connectionist Temporal Classification) Loss — eliminates need for explicit input-output alignment\n• Custom StringLookup tokenizer mapping LaTeX tokens to integer indices\n• Beam search decoding (beam width = 5) for optimal sequence generation\n• Data augmentation: rotation, noise injection, contrast variation for training robustness\n• Evaluated on IM2LATEX-100K benchmark: CER 8.3%, WER 12.1%',
    },
  },
  {
    slug: 'data-warehouse-modernization',
    title: 'Data Warehouse Modernization',
    summary: 'Cut infrastructure costs by 40% ($120K/year) and improved query performance 3x by migrating legacy Hive/EMR to a modern cloud warehouse.',
    stack: ['Hive', 'Spark', 'Google Cloud', 'SQL', 'EMR', 'Python'],
    tags: ['Data'],
    thumbnail: '/images/projects/data-warehouse-modernization.jpg',
    caseStudy: {
      problem:
        'Legacy Hive/EMR infrastructure had ballooning operational costs, 4–6 hour query runtimes for business-critical reports, and no pathway to support AI/ML workloads.',
      solution:
        'Designed and executed a phased migration to a modern cloud data warehouse. Implemented columnar storage, intelligent partitioning, and query optimization. Rebuilt ETL pipelines in Spark for 10x throughput. Established AI-ready data layers for downstream ML consumption.',
      impact:
        'Reduced infrastructure costs by 40% ($120K annual savings). Improved average query performance by 3x. Enabled the first ML feature pipeline on clean, structured data.',
      techDetails:
        '• Phased migration strategy: shadow-run new warehouse in parallel before cutover\n• Columnar storage format (Parquet) replacing row-based Hive tables\n• Intelligent partitioning by date + publisher_id reducing scan volume by 70%\n• Spark-based ETL pipelines replacing Hive MapReduce — 10x throughput improvement\n• Query optimization: predicate pushdown, broadcast joins, materialized views\n• AI-ready data layer: cleaned, normalized feature tables for downstream ML pipelines\n• Cost monitoring dashboards tracking compute and storage spend post-migration',
    },
  },
  {
    slug: 'analytics-dashboard-platform',
    title: 'Analytics Dashboard Platform',
    summary: 'Eliminated 60% of ad-hoc data requests by giving stakeholders self-service access to live interactive dashboards.',
    stack: ['Django', 'Plotly Dash', 'Python', 'REST APIs', 'PostgreSQL'],
    tags: ['Data', 'Backend'],
    thumbnail: '/images/projects/analytics-dashboard-platform.jpg',
    caseStudy: {
      problem:
        'Business stakeholders submitted 50+ ad-hoc data requests per week to the engineering team, creating a bottleneck that delayed decisions by 3–5 days.',
      solution:
        'Built a full-stack analytics platform embedding Plotly Dash dashboards directly into a Django application (no iframes). Implemented real-time data fetching, interactive bar/pie/radar/scatter charts, role-based access, and a self-service filter interface.',
      impact:
        'Reduced ad-hoc reporting requests by 60%. Stakeholders access live dashboards independently. Decision latency dropped from days to minutes.',
      techDetails:
        '• Plotly Dash embedded natively inside Django using django-plotly-dash (no iframes)\n• Real-time data fetching via Django REST API endpoints consumed by Dash callbacks\n• Interactive chart types: bar, pie, radar, scatter — all with cross-filter support\n• Role-based access control: admin, analyst, viewer tiers with Django permissions\n• Self-service filter interface: date range, publisher, metric type selectors\n• PostgreSQL backend with optimized indexes for sub-second dashboard load times\n• Scheduled data refresh jobs ensuring dashboards reflect data within 15 minutes',
    },
  },
  {
    slug: 'web-metrics-analytics-system',
    title: 'Web Metrics Analytics System',
    summary: 'Automated weekly analytics reports for 50+ publishers, cutting manual reporting effort by 80% and surfacing hidden traffic anomalies.',
    stack: ['Python', 'SQL', 'Data Warehousing', 'Automation', 'Pandas'],
    tags: ['Data', 'Backend'],
    thumbnail: '/images/projects/web-metrics-analytics-system.jpg',
    caseStudy: {
      problem:
        '50+ publishers had no unified visibility into their traffic, engagement, and monetization metrics. Reports were manually compiled in spreadsheets, taking 2 days per cycle.',
      solution:
        'Built a centralized analytics system with automated data ingestion pipelines, standardized publisher metrics (sessions, bounce rate, CTR, RPM), and scheduled report generation. Integrated anomaly detection to flag traffic spikes and drops.',
      impact:
        'Delivered weekly automated reports to 50+ publishers. Reduced manual reporting effort by 80%. Identified 3 major traffic anomalies that would have gone undetected for weeks.',
      techDetails:
        '• Centralized data ingestion pipelines pulling from GA4, ad networks, and CMS APIs\n• Standardized metric schema: sessions, pageviews, bounce rate, CTR, RPM, revenue\n• Pandas-based transformation layer normalizing data across publisher properties\n• Anomaly detection using Z-score and IQR methods to flag traffic spikes/drops\n• Scheduled report generation (cron) producing PDF + CSV outputs per publisher\n• SQL-based data warehouse with publisher-partitioned tables for fast per-client queries\n• Email delivery system dispatching personalized reports to 50+ publisher contacts',
    },
  },
];
