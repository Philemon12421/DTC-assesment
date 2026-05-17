export type Skill = {
  id: string;
  name: string;
  career: string;
  techStack: string[];
  description: string;
  roadmap?: {
    foundation: string[];
    intermediate: string[];
    advanced: string[];
  };
};

export type AssessmentQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
};

export type CandidateData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  education: string;
  experience: string;
  currentSkills: string;
  desiredSkills: string;
  whyJoin: string;
  careerGoal: string;
  focusArea: string;
  linkedIn: string;
  github: string;
  twitter: string;
  selectedSkills: string[];
  assessmentScore: number;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  portfolioUrl?: string;
  cvUrl?: string;
  projectsUrl?: string;
  driveLink?: string;
};

export type RoleSpecificQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
};

export type FAQItem = {
  section: string;
  question: string;
  answer: string;
};

export const PORTAL_FAQS: FAQItem[] = [
  {
    section: "information",
    question: "Do I need to be in a specific time zone?",
    answer: "No, DTC is remote-first. However, we expect at least 4 hours of overlap with GMT+1 for team syncs."
  },
  {
    section: "commitment",
    question: "What is the minimum weekly commitment?",
    answer: "We prefer candidates who can commit at least 20 hours per week for part-time or 40 hours for full-time roles."
  },
  {
    section: "assessment",
    question: "How is the score calculated?",
    answer: "Your score is a weighted average of your professional experience, technical aptitude, and problem-solving approach."
  },
  {
    section: "portfolio",
    question: "What if my best work is in a private repo?",
    answer: "You can provide a Loom video walkthrough or a PDF case study highlighting the architectural decisions and your specific contributions."
  }
];

export const ROLE_QUESTIONS: Record<string, RoleSpecificQuestion[]> = {
  frontend: [
    {
      id: 'fe1',
      question: 'Which HTML tag is used to define an internal style sheet?',
      options: ['<css>', '<script>', '<style>', '<design>'],
      correctAnswer: '<style>',
      hint: 'It is the standard tag for CSS code within an HTML document.'
    },
    {
      id: 'fe2',
      question: 'In React, what is the primary purpose of the "useMemo" hook?',
      options: ['To create refs', 'To memoize expensive calculations', 'To handle side effects', 'To manage global state'],
      correctAnswer: 'To memoize expensive calculations',
      hint: 'Think about performance and avoiding unnecessary computations on every render.'
    }
  ],
  backend: [
    {
      id: 'be1',
      question: 'Which HTTP method is typically used to create a new resource in a REST API?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 'POST',
      hint: 'Think about the standard methods: GET for fetching, PUT for updating, and another for creation.'
    },
    {
      id: 'be2',
      question: 'Which of the following is a non-relational (NoSQL) database?',
      options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
      correctAnswer: 'MongoDB',
      hint: 'NoSQL databases often store data in JSON-like documents rather than fixed tables.'
    }
  ],
  cybersecurity: [
    {
      id: 'cs1',
      question: 'What does the abbreviation SQL injection refer to?',
      options: ['Vaccinating servers', 'Database query manipulation', 'Cloud storage encryption', 'Network cable repair'],
      correctAnswer: 'Database query manipulation',
      hint: 'This vulnerability allows attackers to interfere with the queries that an application makes to its database.'
    },
    {
      id: 'cs2',
      question: 'Which protocol is used to provide secure communication over a computer network?',
      options: ['HTTP', 'FTP', 'HTTPS', 'Telnet'],
      correctAnswer: 'HTTPS',
      hint: 'It is the secure version of the protocol used for transmitting data between a web browser and a website.'
    }
  ],
  'ui-ux': [
    {
      id: 'ux1',
      question: 'What is the main goal of "User Research" in the design process?',
      options: ['To make the UI colorful', 'To understand user needs and behaviors', 'To write faster code', 'To increase marketing budget'],
      correctAnswer: 'To understand user needs and behaviors',
      hint: 'Design starts with empathy and understanding the people who will actually use the product.'
    },
    {
      id: 'ux2',
      question: 'What does "Fitt\'s Law" predict in UI design?',
      options: ['The color of buttons', 'The time required to move to a target area', 'The font size scaling', 'The load time of images'],
      correctAnswer: 'The time required to move to a target area',
      hint: 'It relates human movement to the distance and size of the target.'
    }
  ],
  'ai-ml': [
    {
      id: 'ai1',
      question: 'In Machine Learning, what is "Supervised Learning"?',
      options: ['Learning without data', 'Learning with labeled training data', 'Learning by playing games', 'A human teaching a robot live'],
      correctAnswer: 'Learning with labeled training data',
      hint: 'This type of learning involves providing the algorithm with pre-labeled examples to learn from.'
    },
    {
      id: 'ai2',
      question: 'What is a "Neural Network" primarily modeled after?',
      options: ['Computer circuits', 'Social networks', 'The human brain structure', 'Spider webs'],
      correctAnswer: 'The human brain structure',
      hint: 'It consists of interconnected nodes that mimic the way biological neurons work.'
    }
  ]
};

export const SKILLS: Skill[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    career: 'Build websites and user interfaces.',
    techStack: ['HTML', 'React', 'React Native', 'Flutter'],
    description: 'Specializing in visual interfaces and user experiences.',
    roadmap: {
      foundation: ['HTML5 Semantic Markup', 'CSS3 Layouts (Flex/Grid)', 'Modern JavaScript (ES6+)', 'Version Control (Git)'],
      intermediate: ['React Hooks & Context', 'Tailwind CSS Systems', 'TypeScript Fundamentals', 'API Integration'],
      advanced: ['Next.js Architecture', 'Server Component Optimization', 'State Management (Redux/Zustand)', 'Micro-Frontend Patterns']
    }
  },
  {
    id: 'backend',
    name: 'Backend Development',
    career: 'Build servers, APIs, and system logic.',
    techStack: ['Java', 'Node.js', 'Django'],
    description: 'Core system stability and high-performance logic.',
    roadmap: {
      foundation: ['Server-side Logic (Node/Python)', 'HTTP/REST Fundamentals', 'SQL Basics (Postgres)', 'Data Structures'],
      intermediate: ['Distributed Databases', 'Authentication (OAuth/JWT)', 'Docker Containerization', 'Middleware Design'],
      advanced: ['System Design at Scale', 'Kubernetes Orchestration', 'gRPC & Message Brokers', 'Cloud Infrastructure Design']
    }
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    career: 'Protect systems and test vulnerabilities.',
    techStack: ['Python', 'Networking', 'Java', 'PHP', 'SQL'],
    description: 'System hardening and vulnerability management.',
    roadmap: {
      foundation: ['Networking Protocols (TCP/IP)', 'Linux Fundamentals', 'Basics of Cryptography', 'Security Mindset'],
      intermediate: ['Penetration Testing (OWASP)', 'Network Scanning (Nmap)', 'Static Application Security (SAST)', 'Firewall Configuration'],
      advanced: ['Reverse Engineering', 'Malware Analysis', 'Zero Trust Architecture', 'Cloud Compliance & Auditing']
    }
  },
  {
    id: 'ai-ml',
    name: 'AI and Machine Learning',
    career: 'Build intelligent systems and automation.',
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'APIs'],
    description: 'Predictive modeling and intelligent automation.',
    roadmap: {
      foundation: ['Python for Data Science', 'Linear Algebra & Calculus', 'Statistics & Probability', 'Data Wrangling (Pandas)'],
      intermediate: ['Supervised & Unsupervised Learning', 'Neural Network Architectures', 'Natural Language Processing (NLP)', 'Computer Vision'],
      advanced: ['LLM Orchestration', 'GANs & Generative AI', 'MLOps (Deployment & Monitoring)', 'Reinforcement Learning']
    }
  },
  {
    id: 'data-science',
    name: 'Data Science / Data Scientist',
    career: 'Analyze and interpret data.',
    techStack: ['Python', 'SQL', 'Pandas', 'Visualization'],
    description: 'Data-driven decision making and analysis.',
    roadmap: {
      foundation: ['SQL for Analytics', 'Data Exploration (EDA)', 'Probability Theory', 'Dashboarding Basics'],
      intermediate: ['Statistical Hypothesis Testing', 'Machine Learning for Prediction', 'Feature Engineering', 'Big Data Intro (Spark)'],
      advanced: ['Deep Learning for Analytics', 'Time Series Forecasting', 'Experimental Design (A/B Testing)', 'AI Strategy for Business']
    }
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    career: 'Design digital experiences.',
    techStack: ['Figma', 'Wireframing', 'User Research'],
    description: 'User-centric design and behavioral research.',
    roadmap: {
      foundation: ['Design Principles (Alignment/Contrast)', 'Color Theory', 'Typography Basics', 'Figma Fundamentals'],
      intermediate: ['User Research Methodologies', 'High-Fidelity Prototyping', 'Design Systems Creation', 'Information Architecture'],
      advanced: ['Accessibility (WCAG) Auditing', 'Behavioral Psychology in Design', 'Conversion Rate Optimization (CRO)', 'Strategic UX Leadership']
    }
  }
];
