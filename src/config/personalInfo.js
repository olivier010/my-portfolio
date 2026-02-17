// Personal Information Configuration
// Update these values with your actual information

export const personalConfig = {
  // Basic Information
  name: "Yves",
  title: "Full-Stack Developer",
  location: "Your City, Country", // Update this
  experience: "5+ years", // Update this
  specialization: "Modern Web Development",
  passion: "Building innovative, user-centric applications",
  
  // Your Story
  background: `
    Yves is a passionate full-stack developer with expertise in creating modern, 
    responsive web applications. With a strong foundation in both frontend and backend 
    technologies, Yves specializes in building scalable solutions that provide exceptional 
    user experiences. Always eager to learn and adapt to new technologies, Yves combines 
    technical excellence with creative problem-solving to deliver projects that make a 
    real impact.
  `,
  
  // Career Journey
  careerJourney: `
    Started as a frontend developer and expanded into full-stack development, 
    gaining expertise in React, Node.js, and modern web technologies. Passionate about 
    clean code, performance optimization, and creating intuitive user interfaces.
  `,
  
  // Education
  education: "Bachelor's Degree in Computer Science - Your University (Year)", // Update this
  
  // Interests & Hobbies
  interests: [
    "Web Development",
    "UI/UX Design", 
    "Performance Optimization",
    "AI Integration",
    "Open Source Contributions",
    "Technology Blogging", // Add your actual interests
    "Machine Learning",
    "Cloud Architecture"
  ],
  
  // Key Achievements
  achievements: [
    "Built multiple full-stack applications",
    "Expertise in modern JavaScript frameworks", 
    "Strong background in responsive design",
    "Experience with AI/ML integration",
    "Contributed to open source projects", // Add your actual achievements
    "Led development teams",
    "Optimized application performance by 40%"
  ],
  
  // Services Offered
  services: [
    "Custom Web Application Development",
    "Frontend Development (React, Vue, Angular)",
    "Backend Development (Node.js, Python)",
    "API Development & Integration",
    "Performance Optimization",
    "UI/UX Consulting",
    "Code Review & Mentoring",
    "Technical Writing & Documentation"
  ],
  
  // Contact Preferences
  contactPreferences: {
    email: "oliviernsengiyumva010@gmail.com", // Update this
    linkedin: "your-linkedin-profile", // Update this
    github: "olivier010", // Update this
    availableFor: ["Freelance Projects", "Full-time Positions", "Consulting", "Collaboration"]
  }
}

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
    achievements: personalConfig.achievements
  }
}
