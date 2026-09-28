/**
 * PUNIT - DIGITAL COMMAND CENTER DATA STORE
 * All portfolio information is centralized here for easy editing and maintenance.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Punit",
    callsign: "PUN-01",
    designation: "STUDENT • DEVELOPER • LEARNER",
    subDesignation: "B.Tech Computer Science & Engineering Undergraduate",
    status: "ONLINE // OPERATIONAL",
    location: "Punjab, India [31.1471° N, 75.3412° E]",
    mission: "Architecting responsive, high-performance web systems and learning modern distributed technologies with an insatiable appetite for creative problem solving.",
    availability: "OPEN FOR INTERNSHIPS & COLLABORATIONS",
    bio: [
      "Hello! I am Punit, an ambitious college student and passionate developer on a relentless mission to understand, build, and optimize software systems.",
      "My journey started with curiosity about how lines of code translate into interactive digital experiences. Today, I build full-stack web applications, solve complex algorithmic problems, and explore modern cloud, UI/UX, and AI integrations.",
      "When I am not coding, you will find me participating in hackathons, exploring open-source repositories, reading technical blogs, and experimenting with new development stacks."
    ],
    metrics: [
      { label: "ACADEMIC FOCUS", value: "Computer Science", unit: "B.Tech" },
      { label: "PROBLEM SOLVING", value: "350+", unit: "Problems" },
      { label: "CORE FOCUS", value: "Full Stack", unit: "& Modern Web" },
      { label: "CURIOSITY INDEX", value: "MAX", unit: "100%" }
    ],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "punit.dev.connect@gmail.com",
      discord: "punit#0001"
    }
  },

  skills: [
    {
      category: "Programming Languages",
      categoryKey: "languages",
      items: [
        { name: "C / C++", level: 90, tag: "Systems & DSA", icon: "code" },
        { name: "JavaScript (ES6+)", level: 92, tag: "Core Web", icon: "code" },
        { name: "Python", level: 85, tag: "Scripting & Logic", icon: "code" },
        { name: "Java", level: 80, tag: "OOP & Architecture", icon: "code" },
        { name: "HTML5 & CSS3", level: 95, tag: "UI Foundations", icon: "palette" }
      ]
    },
    {
      category: "Web & Frameworks",
      categoryKey: "web",
      items: [
        { name: "React.js", level: 88, tag: "Component Architecture", icon: "layers" },
        { name: "Node.js & Express", level: 82, tag: "REST APIs & Backend", icon: "server" },
        { name: "Modern CSS & Flexbox/Grid", level: 94, tag: "Dynamic Layouts", icon: "layout" },
        { name: "Tailwind & Vanilla CSS", level: 90, tag: "Modular Styling", icon: "palette" },
        { name: "RESTful Architecture", level: 85, tag: "API Design", icon: "network" }
      ]
    },
    {
      category: "Databases & Cloud",
      categoryKey: "backend",
      items: [
        { name: "MongoDB", level: 82, tag: "NoSQL Schemas", icon: "database" },
        { name: "MySQL / PostgreSQL", level: 80, tag: "Relational Queries", icon: "database" },
        { name: "Firebase / Supabase", level: 78, tag: "BaaS & Realtime", icon: "cloud" },
        { name: "Git & GitHub", level: 92, tag: "Version Control", icon: "git-branch" }
      ]
    },
    {
      category: "Core Computer Science",
      categoryKey: "cs",
      items: [
        { name: "Data Structures & Algorithms", level: 88, tag: "Problem Solving", icon: "cpu" },
        { name: "Object-Oriented Programming", level: 90, tag: "System Design", icon: "box" },
        { name: "Database Management (DBMS)", level: 84, tag: "ACID & Normalization", icon: "database" },
        { name: "Operating Systems & Linux CLI", level: 82, tag: "Kernel & Bash", icon: "terminal" },
        { name: "Computer Networks", level: 78, tag: "TCP/IP & HTTP", icon: "wifi" }
      ]
    }
  ],

  projects: [
    {
      id: "cyber-command",
      title: "Digital Command Center",
      category: "web",
      status: "DEPLOYED",
      badge: "Flagship",
      description: "A futuristic cyberpunk-inspired portfolio and telemetry dashboard featuring a synthesized Web Audio engine, interactive CLI terminal, and AI assistant.",
      highlights: [
        "Synthesizer-driven Web Audio API without external audio dependencies",
        "Interactive CLI terminal with command history and Matrix rain mode",
        "Reactive canvas particle constellation with mouse physics"
      ],
      technologies: ["Vanilla JavaScript", "HTML5 Canvas", "Web Audio API", "CSS Grid/Flexbox"],
      demoUrl: "#",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "ai-study-sync",
      title: "StudyMatrix - Academic Productivity Hub",
      category: "fullstack",
      status: "ACTIVE",
      badge: "Full-Stack",
      description: "An all-in-one productivity suite for engineering students featuring collaborative note synchronization, Pomodoro telemetry, and automated flashcard generation.",
      highlights: [
        "Real-time state synchronization across devices using WebSockets",
        "Automated PDF summarization and key-concept extraction",
        "Customizable Kanban task scheduler with deadline alerts"
      ],
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "TailwindCSS"],
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "dev-pulse",
      title: "AlgoPulse - Interactive Algorithm Visualizer",
      category: "tools",
      status: "COMPLETED",
      badge: "Educational",
      description: "An interactive visualizer for classic sorting, graph traversal, and pathfinding algorithms designed to help students grasp abstract time complexities visually.",
      highlights: [
        "Step-by-step playback with speed and array size adjustments",
        "Visual comparisons of QuickSort, MergeSort, Dijkstra, and A* search",
        "Real-time complexity counter and recursion call-stack preview"
      ],
      technologies: ["JavaScript (ES6+)", "Canvas 2D", "CSS Animations", "Algorithms"],
      demoUrl: "https://example.com/demo2",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "nexus-chat",
      title: "Nexus Relay - Real-Time Encrypted Chat",
      category: "fullstack",
      status: "PROTOTYPE",
      badge: "Realtime",
      description: "A secure, ephemeral chat room application utilizing socket communication, markdown support, instant room sharing, and cyber-themed messaging UI.",
      highlights: [
        "Socket.io bi-directional messaging with zero message persistence option",
        "Room access codes with password encryption and member presence lists",
        "Responsive dark HUD theme optimized for mobile and desktop screens"
      ],
      technologies: ["Socket.io", "Express.js", "Node.js", "Web Crypto API"],
      demoUrl: "https://example.com/demo3",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      id: "code-beacon",
      title: "CodeBeacon - GitHub Repository Telemetry",
      category: "tools",
      status: "COMPLETED",
      badge: "Analytics",
      description: "A lightweight analytics dashboard that analyzes GitHub user repositories, commit heatmaps, language distributions, and contribution streaks in a futuristic HUD view.",
      highlights: [
        "Deep integration with GitHub REST v3 API with rate-limit protection",
        "Dynamic SVG chart rendering for language breakdown and commit frequency",
        "Instant shareable developer stat card generator"
      ],
      technologies: ["JavaScript", "GitHub REST API", "Chart.js", "CSS Glassmorphism"],
      demoUrl: "https://example.com/demo4",
      githubUrl: "https://github.com",
      featured: false
    }
  ],

  journey: [
    {
      period: "2024 - PRESENT",
      title: "B.Tech in Computer Science & Engineering",
      subtitle: "University Engineering Program",
      icon: "graduation-cap",
      type: "education",
      status: "IN PROGRESS",
      description: "Immersed in comprehensive study of computer science fundamentals including Data Structures, Algorithms, Database Systems, Computer Architecture, and Modern Software Engineering methodologies.",
      achievements: [
        "Consistent academic performance in core technical subjects",
        "Active member of the University Technical Society & Coding Club",
        "Collaborating on multi-disciplinary engineering projects"
      ]
    },
    {
      period: "2024",
      title: "Exploration: Full Stack & Modern Web Systems",
      subtitle: "Independent Research & Project Acceleration",
      icon: "code",
      type: "milestone",
      status: "ACHIEVED",
      description: "Shifted focus to real-world software architecture. Built full-stack applications with React, Node.js, and MongoDB, mastering asynchronous patterns, RESTful APIs, and responsive design systems.",
      achievements: [
        "Developed 5+ full-stack and front-end utility applications",
        "Mastered modern JavaScript (ES6+), component design, and state management",
        "Adopted Git workflow, branch management, and continuous deployment"
      ]
    },
    {
      period: "2023",
      title: "Algorithmic Foundations & Competitive Coding",
      subtitle: "Problem Solving Mastery",
      icon: "cpu",
      type: "milestone",
      status: "ACHIEVED",
      description: "Dedicated systematic practice to Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graphs, Dynamic Programming) across LeetCode, HackerRank, and GeeksforGeeks.",
      achievements: [
        "Solved 350+ algorithmic challenges across leading coding platforms",
        "Strengthened time & space complexity optimization intuition",
        "Earned platform problem-solving badges and rank upgrades"
      ]
    },
    {
      period: "2022 - 2023",
      title: "Higher Secondary Education (Science & Mathematics)",
      subtitle: "Foundational STEM Excellence",
      icon: "award",
      type: "education",
      status: "COMPLETED",
      description: "Graduated with strong foundations in Physics, Chemistry, and Advanced Mathematics, developing analytical rigor and deductive reasoning that underpins computer science.",
      achievements: [
        "Excellence in Mathematics and Computer Science elective",
        "Sparked passion for computer programming and digital technologies"
      ]
    }
  ],

  achievements: [
    {
      id: "ach-dsa",
      title: "350+ DSA Problems Solved",
      issuer: "LeetCode & HackerRank",
      date: "2024",
      badgeIcon: "⚡",
      category: "Coding",
      description: "Demonstrated strong grasp of data structures, search algorithms, recursion, and dynamic programming.",
      highlight: "Continuous Learning Streak"
    },
    {
      id: "ach-hackathon",
      title: "Hackathon Finalist / Participant",
      issuer: "College Tech Fest",
      date: "2024",
      badgeIcon: "🏆",
      category: "Innovation",
      description: "Designed and built an interactive web prototype under a 24-hour rapid development sprint.",
      highlight: "Rapid Prototyping & Teamwork"
    },
    {
      id: "ach-cert-web",
      title: "Full-Stack Web Development Certification",
      issuer: "Professional Coursework",
      date: "2024",
      badgeIcon: "📜",
      category: "Certification",
      description: "Validated competencies in client-server architecture, database indexing, REST endpoints, and security best practices.",
      highlight: "Verified Credential"
    },
    {
      id: "ach-academic",
      title: "Academic Excellence Honors",
      issuer: "Engineering Faculty",
      date: "2023 - 2024",
      badgeIcon: "⭐",
      category: "Academics",
      description: "Recognized for high marks in Object-Oriented Programming and Data Structures course modules.",
      highlight: "Top Tier Performance"
    },
    {
      id: "ach-oss",
      title: "Open Source Contributor",
      issuer: "GitHub Community",
      date: "2024",
      badgeIcon: "🌐",
      category: "Open Source",
      description: "Submitted issues, bug fixes, and documentation improvements to student community repositories.",
      highlight: "Collaborative Engineering"
    },
    {
      id: "ach-leadership",
      title: "Tech Society Core Member",
      issuer: "University Coding Club",
      date: "2024",
      badgeIcon: "🛡️",
      category: "Leadership",
      description: "Mentored first-year juniors in programming basics, setup of development environments, and Git.",
      highlight: "Peer Mentorship"
    }
  ],

  navBotKnowledge: {
    greetings: [
      "Greetings! I am PUNIT-BOT, Punit's holographic AI assistant. How may I direct your transmission?",
      "Welcome to Punit's Command Center. Systems are nominal. What would you like to explore?",
      "Signal locked! I am PUNIT-BOT. Ask me anything about Punit's projects, skills, education, or vision."
    ],
    responses: {
      about: "Punit is a dedicated B.Tech Computer Science & Engineering college student. He specializes in full-stack web development, clean system architecture, and algorithmic problem-solving. He is driven by a passion for building software that delivers genuine utility and delightful user experiences.",
      projects: "Punit has architected several impressive projects, including: \n1. [Digital Command Center] - His futuristic cyberpunk telemetry portfolio with Web Audio & CLI.\n2. [StudyMatrix] - An academic collaboration and productivity hub.\n3. [AlgoPulse] - An interactive algorithm visualizer for sorting and graph paths.\n4. [Nexus Relay] - Real-time encrypted socket communications.\nClick the 'PROJECTS' section to explore details and GitHub links!",
      skills: "Punit's arsenal features:\n• Languages: C/C++, JavaScript (ES6+), Python, Java, HTML5/CSS3\n• Web & Frameworks: React.js, Node.js, Express, REST APIs\n• Data & Cloud: MongoDB, MySQL, Firebase, Git/GitHub\n• Core CS: DSA (350+ solved), OOP, Operating Systems, DBMS.\nCheck out the 'SKILLS' matrix for interactive proficiency gauges!",
      whyHire: "Why choose Punit?\n1. Relentless learner with rapid adaptation to new toolchains and libraries.\n2. Strong algorithmic foundation with 350+ solved challenges ensuring efficient, bug-free code.\n3. Product-oriented mindset: He cares deeply about performance, clean architecture, and polished UI/UX.\n4. Positive collaborative energy, eager to contribute and learn within high-performing engineering teams.",
      education: "Punit is currently pursuing his Bachelor of Technology (B.Tech) in Computer Science & Engineering. He maintains strong academic marks while actively pursuing real-world software development and competitive programming.",
      contact: "You can transmit a direct message to Punit through the 'CONTACT' section on this dashboard, or reach out via:\n• Email: punit.dev.connect@gmail.com\n• LinkedIn: linkedin.com\n• GitHub: github.com\nHe is actively receptive to internship and junior developer opportunities!",
      default: "Command processed. While my neural weights are focused on Punit's portfolio data, you can use the quick prompt buttons below or ask about his 'skills', 'projects', 'education', or 'contact'!"
    }
  }
};
