export const siteConfig = {
  name: 'Ahmad Raza',
  title: 'Mechatronics & Control Systems Engineer',
  email: 'ahmadrazas172001@gmail.com',
  phone: '+92 345 3469979',
  location: 'Sargodha District, Punjab, Pakistan',
  linkedin: 'https://www.linkedin.com/in/engineerahmadraza',
  upwork: 'https://www.upwork.com/freelancers/~01b0e16f3156c649be',
  fiverr: 'https://www.fiverr.com/users/engr_ahmadraza',
  facebook: 'https://www.facebook.com/profile.php?id=61560479939595',
  freelancer: 'https://www.freelancer.com/u/engr305',
};

export interface Stats {
  stat1_value: string; stat1_label: string;
  stat2_value: string; stat2_label: string;
  stat3_value: string; stat3_label: string;
  stat4_value: string; stat4_label: string;
}

export const defaultStats: Stats = {
  stat1_value: '50+', stat1_label: 'Projects Completed',
  stat2_value: '99%', stat2_label: 'Client Satisfaction',
  stat3_value: '3+', stat3_label: 'Years Experience',
  stat4_value: '15+', stat4_label: 'Countries Served',
};

export const skills = [
  {
    category: 'Engineering Design',
    items: [
      { name: 'SolidWorks', level: 90 },
      { name: 'AutoCAD', level: 88 },
      { name: 'MATLAB / Simulink', level: 85 },
      { name: 'Abaqus FEA', level: 75 },
      { name: 'CNC Machining', level: 78 },
    ],
  },
  {
    category: 'Embedded & IoT',
    items: [
      { name: 'Arduino / ESP32', level: 95 },
      { name: 'PIC18 Microcontroller', level: 88 },
      { name: 'Tiva C Series', level: 82 },
      { name: 'Blynk IoT Platform', level: 85 },
      { name: 'PLC / HMI Systems', level: 80 },
    ],
  },
  {
    category: 'AI / ML & Software',
    items: [
      { name: 'Python (AI/ML/DL)', level: 88 },
      { name: 'TensorFlow / PyTorch', level: 80 },
      { name: 'MATLAB AI Toolbox', level: 82 },
      { name: 'C / C++', level: 85 },
      { name: 'C# / .NET', level: 78 },
    ],
  },
  {
    category: 'Industrial Systems',
    items: [
      { name: 'KHS / Sidel / Krones', level: 85 },
      { name: 'Tetra Pak Systems', level: 82 },
      { name: 'Pneumatics (MAC Valves)', level: 88 },
      { name: 'Compressed Air Networks', level: 85 },
      { name: 'Beverage Line Automation', level: 83 },
    ],
  },
];

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  color: string;
  description: string;
  highlights: string[];
}

export const defaultExperience: ExperienceItem[] = [
  {
    id: 'exp1',
    company: 'Projexon Engineering Solutions',
    role: 'Mechatronics Engineer',
    period: 'Aug 2025 – Present',
    duration: '10 months',
    location: 'Lahore, Punjab, Pakistan',
    type: 'full-time',
    color: '#2563EB',
    description: 'Leading FMCG and industrial automation projects. Specialized in beverage line expertise (KHS, Sidel, Krones, Tetra Pak), compressed air network studies, PLC/HMI retrofits, and AC→DC conversions.',
    highlights: [
      'Beverage line automation (KHS, Sidel, Krones, Tetra Pak)',
      'Compressed air network studies & dust collector integration',
      'PLC/HMI retrofits and system upgradation',
      'Safety system design and compliance',
    ],
  },
  {
    id: 'exp2',
    company: 'Fiverr',
    role: 'Freelance Mechatronics Consultant',
    period: 'Jan 2023 – Present',
    duration: '3+ years',
    location: 'Remote – Global',
    type: 'freelance',
    color: '#14B8A6',
    description: 'Top-rated freelancer providing consultancy in Mechatronics Engineering. Specialized in robotics, kinematics, dynamics, control systems, MATLAB simulations, Python AI/ML/DL models, and automated system designs.',
    highlights: [
      'MATLAB-based robotics simulations & kinematics analysis',
      'Python AI/ML/DL model development',
      'SolidWorks & AutoCAD design services',
      'Arduino & Simulink control logic implementation',
    ],
  },
  {
    id: 'exp3',
    company: 'Daira Engineering',
    role: 'Robotics Engineer',
    period: 'Jul 2024 – Sep 2024',
    duration: '3 months',
    location: 'Johar Town, Lahore, Pakistan',
    type: 'contract',
    color: '#D4A017',
    description: 'Designed assemblies and engineering layouts using SolidWorks. Led 3D printing and custom part fabrication for robotic systems. Supported PLC programming and industrial automation projects from concept to testing.',
    highlights: [
      'SolidWorks 3D assembly design & schematics',
      '3D printing & custom robotic part fabrication',
      'PLC programming & system testing',
    ],
  },
  {
    id: 'exp4',
    company: 'Sun Power Pakistan',
    role: 'Sustainable Energy Systems Engineer',
    period: 'Jun 2024 – Jul 2024',
    duration: '2 months',
    location: 'Lahore District, Pakistan',
    type: 'internship',
    color: '#7C3AED',
    description: 'Gained hands-on experience in assembling and deploying solar panel systems. Contributed to sustainable energy practices and renewable energy installation projects across Pakistan.',
    highlights: [
      'Solar panel assembly & deployment',
      'Sustainable energy system design',
      'Renewable energy practices & compliance',
    ],
  },
  {
    id: 'exp5',
    company: 'PCSIR',
    role: 'Electro Mechanical Engineer',
    period: 'Jul 2023 – Sep 2023',
    duration: '3 months',
    location: 'Lahore, Punjab, Pakistan',
    type: 'internship',
    color: '#FF6A00',
    description: 'Performed quality control tests on mechanical and electrical components. Ensured ISO-compliant evaluation of industrial samples achieving 99.5% accuracy. Collaborated with R&D and production teams.',
    highlights: [
      '99.5% accuracy in ISO-compliant quality testing',
      'Mechanical & electrical component evaluation',
      'R&D collaboration & fault troubleshooting',
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  link: string;
  featured: boolean;
  color: string;
}

export const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Automatic Stamping Machine (IoT)',
    category: 'Embedded Systems',
    tags: ['IoT', 'Blynk', 'Arduino'],
    description: 'Designed an Automatic Stamping Machine controlled via Blynk IoT. Reduced production costs by 40% through real-time remote monitoring and control.',
    image: '',
    link: 'https://www.fiverr.com/users/engr_ahmadraza',
    featured: true,
    color: '#2563EB',
  },
  {
    id: 'p2',
    title: 'Automatic Coffee Machine (PIC18)',
    category: 'Microcontroller',
    tags: ['PIC18', 'Embedded C', 'Automation'],
    description: 'Engineered a fully automated coffee machine controlled by PIC18 microcontroller with precise timing automation and sensor-based ingredient management.',
    image: '',
    link: 'https://www.fiverr.com/users/engr_ahmadraza',
    featured: true,
    color: '#D4A017',
  },
  {
    id: 'p3',
    title: 'Automatic Radar System',
    category: 'Robotics & Sensing',
    tags: ['Arduino', 'MATLAB', 'Ultrasonic'],
    description: 'Real-time object detection radar system using Arduino and MATLAB visualization. 95% detection accuracy with 360° sweep capability.',
    image: '',
    link: 'https://www.fiverr.com/users/engr_ahmadraza',
    featured: true,
    color: '#14B8A6',
  },
  {
    id: 'p4',
    title: 'Dynamic Pizza Ordering System',
    category: 'Software Development',
    tags: ['C#', 'SQL Server', 'WinForms'],
    description: 'Full-featured pizza ordering management system with real-time inventory tracking and an intuitive UI.',
    image: '',
    link: 'https://www.fiverr.com/users/engr_ahmadraza',
    featured: false,
    color: '#FF6A00',
  },
  {
    id: 'p5',
    title: 'MATLAB Robot Kinematics Solver',
    category: 'AI & ML',
    tags: ['MATLAB', 'Robotics', 'Kinematics'],
    description: 'Comprehensive robot kinematics solver for forward and inverse kinematics analysis, used for 6-DOF robot arm trajectory planning.',
    image: '',
    link: 'https://www.upwork.com/freelancers/~01b0e16f3156c649be',
    featured: false,
    color: '#7C3AED',
  },
  {
    id: 'p6',
    title: 'PLC-Based Conveyor System',
    category: 'Industrial Automation',
    tags: ['PLC', 'HMI', 'SCADA'],
    description: 'PLC-based conveyor automation system for FMCG manufacturing with HMI touchscreen interface and real-time process monitoring.',
    image: '',
    link: 'https://www.linkedin.com/in/engineerahmadraza',
    featured: false,
    color: '#2563EB',
  },
  {
    id: 'p7',
    title: 'AI-Based Predictive Maintenance',
    category: 'AI & ML',
    tags: ['Python', 'TensorFlow', 'IoT'],
    description: 'Machine learning model for predictive maintenance of industrial equipment. 92% fault-prediction accuracy, cut downtime by 35%.',
    image: '',
    link: 'https://www.upwork.com/freelancers/~01b0e16f3156c649be',
    featured: true,
    color: '#7C3AED',
  },
  {
    id: 'p8',
    title: 'Solar Energy Monitoring Dashboard',
    category: 'Sustainable Energy',
    tags: ['IoT', 'ESP32', 'Dashboard'],
    description: 'Real-time solar monitoring system using ESP32 and a cloud dashboard tracking voltage, current, power output, and efficiency.',
    image: '',
    link: 'https://www.fiverr.com/users/engr_ahmadraza',
    featured: false,
    color: '#D4A017',
  },
];

export interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  year: string;
  abstract: string;
  tags: string[];
  status: string;
  color: string;
}

export const defaultResearch: ResearchPaper[] = [
  {
    id: 'r1',
    title: 'Optimization of Pneumatic Control Systems in High-Speed Beverage Filling Lines',
    journal: 'International Journal of Industrial Automation',
    year: '2024',
    abstract: 'A novel approach to optimizing MAC valve configurations in KHS and Krones filling lines, achieving 23% reduction in air consumption while maintaining fill accuracy to ±0.5ml.',
    tags: ['Pneumatics', 'FMCG', 'Optimization'],
    status: 'Published (Client)',
    color: '#2563EB',
  },
  {
    id: 'r2',
    title: 'Deep Learning Approaches for Real-Time Fault Detection in Rotary Machinery',
    journal: 'IEEE Transactions on Industrial Electronics',
    year: '2024',
    abstract: 'A CNN-LSTM hybrid architecture for vibration-based fault detection in industrial rotary machinery, achieving 94.7% classification accuracy with sub-100ms inference.',
    tags: ['Deep Learning', 'Fault Detection', 'CNN-LSTM'],
    status: 'Published (Client)',
    color: '#7C3AED',
  },
  {
    id: 'r3',
    title: 'Comparative Analysis of PID vs Model Predictive Control for Robotic Arm Trajectory Planning',
    journal: 'Robotics and Autonomous Systems Journal',
    year: '2023',
    abstract: 'Systematic comparison of PID and MPC controllers for 6-DOF robotic arm applications; MPC showed 31% improvement in trajectory accuracy.',
    tags: ['Robotics', 'MPC', 'Control Systems'],
    status: 'Published (Client)',
    color: '#14B8A6',
  },
  {
    id: 'r4',
    title: 'IoT-Enabled Smart Manufacturing: A Framework for Small-Scale Industries in Pakistan',
    journal: 'Journal of Manufacturing Technology Management',
    year: '2023',
    abstract: 'An accessible IoT implementation framework for SME manufacturers in developing economies; case studies show 28% productivity improvement.',
    tags: ['IoT', 'Smart Manufacturing', 'Industry 4.0'],
    status: 'Published (Client)',
    color: '#D4A017',
  },
];

export const categories = [
  'All', 'Embedded Systems', 'AI & ML', 'Industrial Automation',
  'Robotics & Sensing', 'Software Development', 'Microcontroller', 'Sustainable Energy',
];

export const experienceTypes = ['full-time', 'freelance', 'contract', 'internship'];

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
