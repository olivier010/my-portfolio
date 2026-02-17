// src/services/openai.js
import { getEntries } from '../utils/contentful'
import { getPersonalInfoForAI } from '../config/personalInfo'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

// Cache portfolio data to avoid repeated API calls
let portfolioCache = null
let lastCacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Fetch portfolio data dynamically
export async function getPortfolioData() {
  const now = Date.now()
  
  // Return cached data if still fresh
  if (portfolioCache && (now - lastCacheTime) < CACHE_DURATION) {
    return portfolioCache
  }

  try {
    // Fetch all portfolio content
    const [projects, blogPosts, aboutInfo] = await Promise.all([
      getEntries('project', { limit: 10 }),
      getEntries('blogPost', { limit: 20 }),
      // Try to get about page info if it exists
      getEntries('page', { 'fields.title': 'About', limit: 1 }).catch(() => [])
    ])

    const portfolioData = {
      // Personal Information about Yves - from config file
      personalInfo: getPersonalInfoForAI(),
      
      projects: projects.map(project => ({
        title: project.fields.title,
        slug: project.fields.slug,
        description: project.fields.description || project.fields.excerpt || '',
        technologies: project.fields.technologies || [],
        featuredImage: project.fields.featuredImage?.fields?.file?.url || '',
        githubUrl: project.fields.githubUrl || '',
        liveUrl: project.fields.liveUrl || '',
        projectType: project.fields.projectType || 'Web Application',
        completionDate: project.fields.completionDate || project.sys.createdAt,
        challenges: project.fields.challenges || '',
        solutions: project.fields.solutions || '',
        keyFeatures: project.fields.keyFeatures || []
      })),
      
      blogPosts: blogPosts.map(post => ({
        title: post.fields.title,
        slug: post.fields.slug,
        excerpt: post.fields.excerpt || '',
        tags: post.fields.tags || [],
        publishedDate: post.sys.createdAt,
        readTime: Math.ceil((post.fields.content?.content?.[0]?.content?.[0]?.value || '').length / 200)
      })),
      
      aboutInfo: aboutInfo.length > 0 ? {
        title: aboutInfo[0].fields.title,
        content: aboutInfo[0].fields.content?.content?.[0]?.content?.[0]?.value || ''
      } : null,
      
      lastUpdated: new Date().toISOString()
    }

    // Cache the data
    portfolioCache = portfolioData
    lastCacheTime = now
    
    return portfolioData
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return portfolioCache || { 
      personalInfo: getPersonalInfoForAI(),
      projects: [], 
      blogPosts: [], 
      aboutInfo: null 
    }
  }
}

// Generate dynamic context based on portfolio data
function generatePortfolioContext(portfolioData) {
  const { projects, blogPosts, aboutInfo, personalInfo } = portfolioData

  let context = `
You are an AI assistant for Yves's portfolio website. Your name is "Portfolio Assistant" and you help visitors learn about Yves's work, skills, experience, and background.

IMPORTANT: Base ALL your answers on the actual portfolio data provided below. Do not make up information about projects, blog posts, or personal details that don't exist.

=== ABOUT YVES ===

Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Experience: ${personalInfo.experience}
Specialization: ${personalInfo.specialization}
Passion: ${personalInfo.passion}

Background:
${personalInfo.background}

Career Journey:
${personalInfo.careerJourney}

Education: ${personalInfo.education}

Interests: ${personalInfo.interests.join(', ')}

Key Achievements:
${personalInfo.achievements.map(achievement => `• ${achievement}`).join('\n')}

=== PORTFOLIO DATA ===

PROJECTS (${projects.length} total):
${projects.map((project, index) => `
${index + 1}. ${project.title}
   - Slug: ${project.slug}
   - Description: ${project.description}
   - Technologies: ${Array.isArray(project.technologies) ? project.technologies.join(', ') : 'Not specified'}
   - Project Type: ${project.projectType}
   - Completion Date: ${new Date(project.completionDate).toLocaleDateString()}
   - GitHub: ${project.githubUrl || 'Not available'}
   - Live Demo: ${project.liveUrl || 'Not available'}
   ${project.challenges ? `- Challenges: ${project.challenges}` : ''}
   ${project.solutions ? `- Solutions: ${project.solutions}` : ''}
   ${project.keyFeatures && project.keyFeatures.length > 0 ? `- Key Features: ${project.keyFeatures.join(', ')}` : ''}
`).join('')}

BLOG POSTS (${blogPosts.length} total):
${blogPosts.map((post, index) => `
${index + 1}. ${post.title}
   - Slug: ${post.slug}
   - Excerpt: ${post.excerpt}
   - Tags: ${Array.isArray(post.tags) ? post.tags.join(', ') : 'No tags'}
   - Published: ${new Date(post.publishedDate).toLocaleDateString()}
   - Read Time: ${post.readTime} minutes
`).join('')}

${aboutInfo ? `
ABOUT PAGE:
${aboutInfo.content}
` : ''}

=== RESPONSE GUIDELINES ===

1. ONLY discuss projects, blog posts, and personal information that are listed above
2. When asked about Yves, use the personal information provided in the "ABOUT YVES" section
3. For "Who is Yves?" questions, provide a comprehensive overview including background, experience, and passion
4. When asked about projects, reference the actual titles and descriptions from the data
5. For blog posts, mention actual titles, tags, and topics covered
6. If asked about something not in the data, say "I don't have information about that in the current portfolio"
7. Always be helpful and guide users to explore the actual content
8. When suggesting projects or posts, only mention ones that exist in the data above
9. Use the actual technology stacks, dates, and descriptions provided
10. If someone asks for "examples" or "show me", reference the real projects with their slugs

SKILLS INFERRED FROM PROJECTS:
Based on the projects, Yves has experience with: ${[...new Set(projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : []))].join(', ')}

CONTACT & SERVICES:
- Available for freelance projects and collaborations
- Contact through the portfolio's contact form
- Specializes in the technologies shown in the projects above

Remember: You are a helpful assistant for YVES's SPECIFIC portfolio. Only discuss what's actually shown in the data above, especially when answering personal questions about Yves.
`

  return context
}

export async function getChatResponse(message, conversationHistory = []) {
  if (!OPENAI_API_KEY) {
    // Enhanced demo mode with portfolio-specific responses
    return getDemoResponse(message)
  }

  try {
    // Get fresh portfolio data
    const portfolioData = await getPortfolioData()
    const portfolioContext = generatePortfolioContext(portfolioData)

    const messages = [
      {
        role: 'system',
        content: portfolioContext
      },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 600,
        temperature: 0.7,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return getDemoResponse(message)
  }
}

// Enhanced demo mode with portfolio awareness
async function getDemoResponse(message) {
  try {
    // Still try to get portfolio data for better demo responses
    const portfolioData = await getPortfolioData()
    const lowerMessage = message.toLowerCase()

    // Personal questions about Yves
    if (lowerMessage.includes('who is') || lowerMessage.includes('about yves') || lowerMessage.includes('tell me about yves') || lowerMessage.includes('who are you')) {
      return `${portfolioData.personalInfo.name} is a ${portfolioData.personalInfo.title} with ${portfolioData.personalInfo.experience} of experience specializing in ${portfolioData.personalInfo.specialization}. 

${portfolioData.personalInfo.background}

Key achievements include:
${portfolioData.personalInfo.achievements.map(achievement => `• ${achievement}`).join('\n')}

Yves is passionate about ${portfolioData.personalInfo.passion} and is always interested in new opportunities and collaborations!`
    }

    // Background/experience questions
    if (lowerMessage.includes('background') || lowerMessage.includes('experience') || lowerMessage.includes('career')) {
      return `${portfolioData.personalInfo.name}'s background: ${portfolioData.personalInfo.careerJourney}

Education: ${portfolioData.personalInfo.education}

With expertise in technologies like ${[...new Set(portfolioData.projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : []))].slice(0, 5).join(', ')}, Yves brings strong technical skills to every project.`
    }

    // Interest/passion questions
    if (lowerMessage.includes('interest') || lowerMessage.includes('passion') || lowerMessage.includes('what do you like')) {
      return `${portfolioData.personalInfo.name} is passionate about ${portfolioData.personalInfo.passion}. Current interests include:

${portfolioData.personalInfo.interests.map(interest => `• ${interest}`).join('\n')}

This passion drives the creation of innovative, user-centric applications that solve real problems.`
    }

    // Project-related queries
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('built')) {
      if (portfolioData.projects.length > 0) {
        const projectTitles = portfolioData.projects.map(p => p.title).join(', ')
        return `I can tell you about ${portfolioData.personalInfo.name}'s projects! There are ${portfolioData.projects.length} projects including: ${projectTitles}. Which specific project would you like to know more about?`
      }
      return `${portfolioData.personalInfo.name} has worked on several exciting projects! However, I need to connect to my AI brain to give you specific details. Please check back later or contact directly.`
    }

    // Blog-related queries
    if (lowerMessage.includes('blog') || lowerMessage.includes('post') || lowerMessage.includes('article')) {
      if (portfolioData.blogPosts.length > 0) {
        const blogTitles = portfolioData.blogPosts.slice(0, 3).map(p => p.title).join(', ')
        return `${portfolioData.personalInfo.name} has written ${portfolioData.blogPosts.length} blog posts! Recent topics include: ${blogTitles}. Would you like to know more about any specific topic?`
      }
      return `${portfolioData.personalInfo.name} writes about web development and technology. Check out the blog section for the latest articles!`
    }

    // Technology queries
    if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('skill')) {
      if (portfolioData.projects.length > 0) {
        const allTechs = [...new Set(portfolioData.projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : []))]
        return `Based on ${portfolioData.personalInfo.name}'s projects, the tech stack includes: ${allTechs.slice(0, 8).join(', ')}. Always learning new technologies too!`
      }
      return `${portfolioData.personalInfo.name} specializes in modern web development technologies. Check out the projects to see what's been used!`
    }

    // Contact queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('work')) {
      return `${portfolioData.personalInfo.name} would love to discuss opportunities with you! The best way to reach out is through the contact form on this portfolio. Available for freelance projects and full-time positions.`
    }

    // Default response
    return `I'm ${portfolioData.personalInfo.name}'s AI assistant! I can tell you about ${portfolioData.personalInfo.name}'s background, ${portfolioData.projects.length} projects, ${portfolioData.blogPosts.length} blog posts, and skills. For detailed information, explore the site or contact ${portfolioData.personalInfo.name} directly!`
  } catch (error) {
    return "I'm having trouble accessing portfolio data right now. Please explore the site to see projects and blog posts, or contact directly!"
  }
}
