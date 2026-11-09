// src/config/personalInfo.js
// Personal Information Configuration for Yves Olivier NSENGIYUMVA

export const personalConfig = {
  // Basic Information
  name: "Yves Olivier NSENGIYUMVA",
  displayName: "Yves Foex",
  title: "Full-Stack Software Developer",
  location: "Kigali, Rwanda (CAT / UTC+2)",
  experience: "5+ years",
  specialization: "Modern Full-Stack & Frontend Engineering (React 19, TypeScript, Node.js)",
  passion: "Architecting high-performance, user-centric web applications and AI interfaces",
  
  // Your Story
  background: `
    Yves Olivier NSENGIYUMVA is a dedicated full-stack developer with deep expertise in 
    creating modern, responsive, and ultra-performant web applications. With a strong 
    command of React 19, TypeScript, Tailwind CSS, Node.js, and modern AI integration, 
    Yves builds scalable platforms with sub-second response times and delightful micro-interactions.
  `,
  
  // Career Journey
  careerJourney: `
    Started with a passion for frontend craft and design systems, expanding into full-stack 
    architecture, database design, and cloud deployments. Committed to clean code, test-driven 
    reliability, and cutting-edge user interfaces.
  `,
  
  // Education
  education: "Advanced Diploma in Information Technology - RP Karongi College (2024 - Present)",
  
  // Interests & Hobbies
  interests: [
    "React 19 Architecture",
    "UI/UX Design Systems", 
    "Web Performance Tuning",
    "AI & LLM Integration (RAG, Streaming)",
    "Real-Time Systems & WebSockets",
    "Open Source Tooling",
    "Cloud Architecture & DevOps"
  ],
  
  // Key Achievements
  achievements: [
    "Engineered production full-stack systems with 99.9% uptime",
    "Consistent 100/100 Google Lighthouse performance optimization", 
    "Built streaming AI interfaces with sub-120ms time-to-first-token",
    "Created fluid spring animation systems and interactive component sandboxes",
    "Designed and deployed responsive multi-tenant SaaS dashboards"
  ],
  
  // Core Capabilities
  services: [
    "Full-Stack Web Application Engineering",
    "High-Performance Frontend Systems (React 19, Next.js, TypeScript)",
    "Resilient Backend & API Design (Node.js, Express, PostgreSQL, MongoDB)",
    "AI Integration & LLM Streaming (OpenAI, Gemini, RAG)",
    "Core Web Vitals & Lighthouse 100 Optimization",
    "Design System Architecture & Tactile Micro-Interactions"
  ],
  
  // Contact Preferences
  contactPreferences: {
    email: "oliviernsengiyumva010@gmail.com",
    phone: "+250 791 839 279",
    linkedin: "https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/",
    github: "https://github.com/olivier010",
    twitter: "https://x.com/yves_olly_foex",
    availableFor: ["Full-Time Senior Roles", "High-Impact Contracts", "Technical Consulting", "Collaborations"]
  }
};

// Helper function to get formatted personal info for AI
export function getPersonalInfoForAI() {
  return {
    name: personalConfig.name,
    title: personalConfig.title,
    location: personalConfig.location,
    experience: personalConfig.experience,
    specialization: personalConfig.specialization,
    passion: personalConfig.passion,
    background: personalConfig.background.trim(),
    careerJourney: personalConfig.careerJourney.trim(),
    education: personalConfig.education,
    interests: personalConfig.interests,
    achievements: personalConfig.achievements,
    contactPreferences: personalConfig.contactPreferences
  };
}
