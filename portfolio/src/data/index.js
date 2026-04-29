export const data = {
  name: 'Nishma Tanugundla',
  title: 'Senior Frontend Developer',
  tagline: 'Crafting scalable, accessible, high-performance web experiences.',
  location: 'Charlotte, NC',
  email: 'nishma.tanugundla@gmail.com',
  linkedin: 'https://linkedin.com/in/nishmatanugundla/',
  github: 'https://github.com/nishmatanugundla/',
  summary: 'Front-End Developer with 5+ years of experience building scalable, responsive, and high-performance web applications using React, JavaScript, Redux, and React Query. Experienced in enterprise-level payment and rewards applications, micro-frontend architecture, and accessibility-first development.',

  skills: [
    { cat: 'Frontend', items: ['React v16+', 'JavaScript ES6+', 'HTML5', 'CSS3', 'SASS'] },
    { cat: 'State', items: ['Redux', 'React Query', 'Hooks', 'Context API'] },
    { cat: 'Testing', items: ['Jest', 'React Testing Library', 'Chrome DevTools'] },
    { cat: 'Accessibility', items: ['WCAG 2.0', 'ARIA', 'JAWS', 'NVDA'] },
    { cat: 'Tools', items: ['Git', 'Jenkins', 'Figma', 'Splunk', 'AWS', 'Jira'] },
    { cat: 'Other', items: ['REST APIs', 'Micro-frontends', 'Agile', 'CI/CD'] },
  ],

  projects: [
    {
      name: 'Meetly',
      subtitle: 'Real-time Video Calling App',
      desc: 'A peer-to-peer video calling application with live chat, built using WebRTC and PeerJS for cross-device connections. Features camera/mic controls, shareable meeting links, and a real-time chat panel.',
      tech: ['React', 'WebRTC', 'PeerJS', 'React Router', 'CSS'],
      projectUrl: 'https://spectacular-biscuit-27f369.netlify.app/',
      color: '#7c3aed',
    },
    {
      name: 'CineFind',
      subtitle: 'Movie Discovery Platform',
      desc: 'A full-stack movie discovery app that suggests films by language (Telugu, Hindi, Tamil, Malayalam, Kannada, English), genre, release year, and IMDB rating using the TMDB API. Shows OTT streaming availability.',
      tech: ['React', 'Node.js', 'Express', 'TMDB API', 'React Router'],
      projectUrl: 'https://movie-recommend-list.netlify.app/',
      color: '#c0392b',
    },
  ],

  experience: [
    {
      company: 'Indotronix International Corporation',
      client: 'Bank of America',
      role: 'Sr. Front End Developer',
      period: 'Apr 2024 – Present',
      skills: ['React', 'Redux', 'React Query', 'Jest', 'Jenkins', 'Splunk', 'WCAG'],
      points: [
        'Led development of micro-frontend interfaces across 10+ enterprise payment applications',
        'Built dynamic rewards modules rendering customer-specific experiences based on eligibility rules',
        'Managed complex state with Redux selectors, reducers, and thunk-based async actions',
        'Leveraged React Query for server-state caching, reducing unnecessary API calls',
        'Increased unit test coverage to 82% with Jest and React Testing Library',
        'Implemented WCAG 2.0-compliant interfaces with ARIA, keyboard navigation, and screen-reader support',
      ],
    },
    {
      company: 'Logicera Inc',
      role: 'Software Developer',
      period: 'Aug 2023 – Apr 2024',
      skills: ['React', 'Redux', 'Axios', 'AWS', 'WCAG'],
      points: [
        'Developed responsive web applications using React, ES6+, Redux, and modern JavaScript patterns',
        'Built reusable React hooks, utilities, and API helpers reducing duplicate implementation',
        'Integrated REST APIs using Axios with coordinated Node.js backend services',
        'Deployed front-end applications on AWS using S3, CloudFront, and CI/CD pipelines',
        'Performed JAWS testing and implemented WCAG accessibility improvements',
      ],
    },
    {
      company: 'Accenture Solutions',
      client: 'Whirlpool Corporation',
      role: 'UI Developer',
      period: 'Apr 2021 – Dec 2021',
      skills: ['React', 'Redux', 'React Router', 'Figma', 'Jenkins'],
      points: [
        'Developed single-page applications with dynamic UI components and nested routing',
        'Managed async API state with Redux actions and reducers',
        'Collaborated with UX teams in Figma, reducing rework by 20%',
        'Built mock APIs to decouple frontend and backend workflows',
      ],
    },
    {
      company: 'Sanvan Software',
      client: 'GE Electronics',
      role: 'UI Developer',
      period: 'Aug 2019 – Mar 2021',
      skills: ['JavaScript ES6', 'HTML5', 'CSS3', 'jQuery'],
      points: [
        'Built responsive front-end features with HTML5, CSS3, and ES6',
        'Implemented adaptive layouts using Flexbox and CSS Grid',
        'Diagnosed and resolved UI performance issues, improving load times by 15%',
        'Simulated backend APIs with JSON Server to accelerate development',
      ],
    },
  ],

  education: [
    {
      degree: 'Master of Science, Computer Science',
      school: 'Kennesaw State University',
      year: 'May 2023',
      gpa: '3.6',
      location: 'Marietta, Georgia',
      type: 'Masters',
    },
    {
      degree: 'Bachelor of Engineering, Computer Science',
      school: 'Joginpally BR Engineering College',
      year: '2020',
      gpa: '7.5',
      location: 'Hyderabad, India',
      type: 'Bachelors',
    },
  ],
}
