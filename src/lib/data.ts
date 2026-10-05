export const personal = {
  name: "Shiva Shankar Chanda",
  firstName: "Shiva",
  title: "Full Stack Developer",
  focus: "Python · React · React Native · AI/LLM",
  location: "Hyderabad, TS",
  email: "shankarshiva74541@gmail.com",
  phone: "+91 96183-94701",
  github: "https://github.com/Samplerritgithu",
  linkedin: "https://www.linkedin.com/in/chanda-shiva-shankar-3bb6b5260/",
  resumeUrl: "/resume.pdf",
  availability: "Open to opportunities",
  summary:
    "Full Stack Developer with 2+ years building Python backends, React / React Native apps, and AI features — LLM integration, RAG pipelines, embeddings, and semantic search for grounded, production-ready workflows.",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aboutCards = [
  {
    label: "2+ Years",
    title: "Professional Experience",
    description:
      "Building production systems across backend, frontend, mobile, and cloud.",
  },
  {
    label: "Python",
    title: "Backend Focus",
    description: "Django, DRF, REST APIs..",
  },
  {
    label: "Full Stack",
    title: "Web + Mobile",
    description: "React, Next.js, and React Native product interfaces end to end.",
  },
  {
    label: "AI / LLM",
    title: "Current Focus",
    description: "RAG, embeddings, semantic search, and LLM-assisted automation.",
  },
];

export const skillCategories = [
  {
    id: "backend",
    title: "Backend",
    description: "Scalable services, APIs, and data layers.",
    icon: "server" as const,
    technologies: [
      "Python",
      "Django",
      "DRF",
      "Celery",
      "WebSockets",
      "Redis",
      "GraphQL",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Product-grade interfaces and design systems.",
    icon: "layout" as const,
    technologies: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Redux",
      "Material UI",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    description: "LLM apps, retrieval, and intelligent workflows.",
    icon: "brain" as const,
    technologies: [
      "LLM Integration",
      "RAG Pipelines",
      "Embeddings",
      "Semantic Search",
      "Vector DBs",
      "Prompt Engineering",
      "OpenCV",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform experiences on modern stacks.",
    icon: "smartphone" as const,
    technologies: ["React Native", "Expo", "Flutter","dart","java","kotlin"],
  },
  {
    id: "cloud",
    title: "Cloud",
    description: "Deployment, containers, and CI/CD pipelines.",
    icon: "cloud" as const,
    technologies: [
      "AWS",
      "Docker",
      "CI/CD",
      "NGINX",
      "Firebase",
    ],
  },
  {
    id: "data",
    title: "Databases",
    description: "Relational, cache, search, and vector storage.",
    icon: "database" as const,
    technologies: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
    ],
  },
];

export const experiences = [
  {
    company: "Avsys International India Pvt Ltd",
    role: "Full Stack Developer",
    period: "Aug 2024 — Present",
    location: "Hyderabad, TS",
    highlights: [
      "Developed scalable backend applications and REST APIs using Python, Django, Django REST Framework, and FastAPI for enterprise web, simulation, monitoring, and internal business applications.",
      "Designed and implemented real-time application workflows using Django Channels, WebSockets, Redis, and ASGI, enabling live data updates and event-driven communication.",
      "Architected and developed database-driven modules using PostgreSQL and MySQL, handling data models, relationships, CRUD operations, business logic, and API integrations.",
      "Implemented secure authentication and authorization using JWT, role-based permissions, input validation, and access-control mechanisms across web and mobile applications.",
      "Contributed to and delivered backend functionality for a real-time simulation platform, including live data ingestion, tracking workflows, scan operations, reporting, and visualization-ready APIs.",
      "Developed responsive frontend modules using React.js, JavaScript, HTML5, CSS3, Tailwind CSS, and reusable components, integrating them with Django/DRF and FastAPI services.",
      "Developed and integrated Flutter mobile application features with backend REST APIs, authentication, user workflows, and application services.",
      "Worked across AWS, Firebase, Linux, Git/GitHub, and CI/CD pipelines for application deployment, environment configuration, version control, and release management.",
      "Built and integrated web application functionality using Next.js and Node.js, extending full-stack development capabilities across modern JavaScript technologies.",
      "Led and coordinated a 3-member development team through planning, task distribution, code reviews, debugging, and delivery coordination while contributing hands-on to product development.",
      "Applied OOP, SOLID principles, modular architecture, caching, middleware, NGINX/reverse-proxy concepts, and secure deployment practices to maintain clean and production-ready applications.",
      "Currently expanding expertise in AI/ML application development, focusing on LLMs, RAG, embeddings, semantic search, and AI-assisted workflows as a personal technical learning direction.",
    ],
  },
  {
    company: "Bharath Intern",
    role: "Full Stack Developer Intern",
    period: "Jan 2024 — May 2024",
    location: "Madhya Pradesh, India",
    highlights: [
      "Engineered a media streaming platform with profiles, search, and recommendation-style discovery.",
      "Built responsive React interfaces and integrated backend API workflows for dynamic media rendering.",
      "Added AI-inspired recommendation logic and search optimization for personalized content relevance.",
      "Improved performance with caching and load-balancing concepts, reducing wait time by ~25%.",
      "Deployed on Microsoft Azure for scalable production readiness with concurrent users.",
    ],
  },
  {
    company: "Interpe",
    role: "Full Stack Developer Intern",
    period: "Jul 2023 — Aug 2023",
    location: "New Delhi, India",
    highlights: [
      "Developed a real-time e-commerce platform with product listing, search, and admin workflows.",
      "Built Django REST APIs with MySQL, secure authentication, and data-protection practices.",
      "Designed responsive pages with HTML5, CSS3, and JavaScript to improve customer-facing UX.",
      "Reduced manual product promotion efforts by approximately 30%.",
      "Deployed on AWS with optimized database queries and reliable production hosting.",
    ],
  },
];

export const featuredProject = {
  slug: "flightdeck",
  name: "FlightDeck",
  tagline: "Aviation platform for Indian aviators",
  problem:
    "Indian aviators needed a unified digital platform to access aviation resources, tools, and community features without fragmented workflows.",
  solution:
    "Owned an existing live aviation platform end to end across web and mobile, from requirements through release, using Firebase as the shared backend while improving production reliability and UX consistency.",
  features: [
    "Took full ownership of an existing live aviation platform across web and mobile (React Native for iOS and Android), working independently from requirements through release.",
    "Used Firebase (Auth/Firestore) as the shared backend for both web and mobile; delivered admin/content workflows and kept UX aligned across platforms.",
    "Investigated production issues and shipped fixes without rewriting the product; contributed practical architectural improvements while preserving existing systems.",
  ],
  technologies: [
    "React",
    "React Native",
    "Firebase",
    "Auth",
    "Firestore",
  ],
};

export const projects = [
  {
    slug: "documind-ai",
    name: "DocuMind AI",
    tagline: "LLM & RAG knowledge assistant",
    description:
      "AI knowledge assistant that answers questions from uploaded PDFs/docs using LLM + RAG — chunking, embeddings, vector retrieval, grounded generation with source citations, FastAPI orchestration, and a React chat UI.",
    technologies: [
      "Python",
      "FastAPI",
      "LLM",
      "RAG",
      "Embeddings",
      "Vector DB",
      "React",
      "Redis",
      "Docker",
    ],
  },
  {
    slug: "blood450",
    name: "Blood450",
    tagline: "AI-powered blood donation & emergency donor matching",
    description:
      "Full-stack blood donation platform with Django/DRF backend and Flutter mobile app for donor onboarding, emergency matching, and real-time alerts.",
    details: [
      "Built a full-stack blood donation platform with Django/DRF backend and Flutter mobile application for donor onboarding, authentication, profiles and emergency blood requests.",
      "Implemented geospatial donor matching, blood-group filtering and progressive search-radius expansion to identify nearby potential donors.",
      "Developed JWT/Google OAuth/OTP authentication, donor eligibility based on donation history, and admin workflows for managing eligible, ineligible and unavailable donors.",
      "Integrated Redis, Django Channels and asynchronous services for real-time communication and emergency notification workflows.",
      "Deployed and configured the application across AWS/Vercel with PostgreSQL, environment variables, API integration and Android release builds.",
    ],
    technologies: [
      "Django",
      "DRF",
      "Flutter",
      "PostgreSQL",
      "PostGIS",
      "Redis",
      "Django Channels",
      "Celery",
      "JWT",
      "Google OAuth",
      "AWS",
      "Vercel",
    ],
  },
  {
    slug: "proms",
    name: "PROMS",
    tagline: "Enterprise workflow & monitoring platform",
    description:
      "Built PROMS from scratch on the Dev and HR sides, covering frontend, Django backend, REST APIs, PostgreSQL, and authentication. Combined PROMS, HRM, and the bug-tracking tool into one unified company web product. Led a 3-member team through planning, code reviews, and delivery coordination. Implemented real-time collaboration using Django Channels and WebSockets.",
    technologies: ["Python", "Django", "DRF", "WebSockets", "PostgreSQL"],
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Platform",
    tagline: "Real-time storefront & admin",
    description:
      "Built a full-stack e-commerce platform with product catalog, category-based browsing, search and filtering, shopping cart, user authentication, order management, secure checkout flows, and admin tools for managing products, inventory and orders. Developed the Django backend, MySQL database integration, responsive JavaScript frontend, and deployed the application on AWS.",
    technologies: ["Django", "MySQL", "JavaScript", "AWS"],
  },
];

export const education = {
  school: "TKR College of Engineering and Technology",
  degree: "B.Tech, Computer Science and Engineering",
  gpa: "8.30",
  period: "Aug 2020 — Jun 2024",
  location: "Hyderabad, India",
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Database Systems",
    "Distributed Systems",
    "Cloud Computing",
    "Data Science",
    "Machine Learning",
  ],
};

export const certificates = [
  {
    name: "Data Structures and Algorithms in Python",
    period: "Aug 2023",
  },
  {
    name: "Kimo Python Certificate",
    period: "Apr 2023",
  },
  {
    name: "Online National Level Workshop on ReactJS",
    period: "Jul 2021",
  },
];
