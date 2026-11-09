// src/services/openai.js
import { getEntries } from '../utils/contentful';
import { getPersonalInfoForAI, personalConfig } from '../config/personalInfo';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Fallback project tech stacks when not specified in CMS
const DEFAULT_PROJECT_TECHS = {
  'digital-renting-system-for-assets-and-properties': ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  'tenzies-game': ['React.js', 'JavaScript', 'CSS', 'React Hooks'],
  'umurava-ai-screener': ['React', 'TypeScript', 'AI Integration', 'Node.js']
};

// Cache portfolio data
let portfolioCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getPortfolioData() {
  const now = Date.now();
  if (portfolioCache && (now - lastCacheTime) < CACHE_DURATION) {
    return portfolioCache;
  }

  try {
    const [projectEntries, blogPosts] = await Promise.all([
      getEntries('projects', { limit: 10 }).catch(() => []),
      getEntries('blogPost', { limit: 10 }).catch(() => [])
    ]);

    const projects = (projectEntries || []).map(item => {
      const slug = item.fields?.slug || '';
      const slugKey = slug.toLowerCase();
      const techs = (Array.isArray(item.fields?.technologies) && item.fields.technologies.length > 0)
        ? item.fields.technologies
        : (DEFAULT_PROJECT_TECHS[slugKey] || ['React', 'JavaScript', 'Tailwind CSS']);

      return {
        id: item.sys?.id,
        title: item.fields?.title || 'Untitled Project',
        slug: slug,
        description: item.fields?.description || item.fields?.excerpt || '',
        technologies: techs,
        githubUrl: item.fields?.githubUrl || '',
        liveUrl: item.fields?.liveUrl || '',
        projectType: item.fields?.projectType || 'Web Application',
        createdAt: item.sys?.createdAt
      };
    });

    const blogs = (blogPosts || []).map(post => ({
      id: post.sys?.id,
      title: post.fields?.title || 'Untitled Post',
      slug: post.fields?.slug || '',
      excerpt: post.fields?.excerpt || (typeof post.fields?.content === 'string' ? post.fields.content.slice(0, 160) : ''),
      tags: post.fields?.tags || ['Technology', 'AI', 'Web Development'],
      publishedDate: post.sys?.createdAt
    }));

    const portfolioData = {
      personalInfo: getPersonalInfoForAI(),
      projects,
      blogPosts: blogs,
      lastUpdated: new Date().toISOString()
    };

    portfolioCache = portfolioData;
    lastCacheTime = now;
    return portfolioData;
  } catch (error) {
    console.warn('Error fetching portfolio data, using defaults:', error);
    return portfolioCache || {
      personalInfo: getPersonalInfoForAI(),
      projects: [
        {
          title: 'Digital Renting System For Assets and Properties',
          slug: 'Digital-Renting-System-For-Assets-and-Properties',
          description: 'A modern web platform for listing, browsing, and renting real estate and assets.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
        },
        {
          title: 'Tenzies-Game',
          slug: 'tenzies-game',
          description: 'Interactive dice game built with React state and fast UI updates.',
          technologies: ['React.js', 'JavaScript', 'CSS', 'React Hooks']
        },
        {
          title: 'Umurava ai Screener',
          slug: 'Umurava-ai-Screener',
          description: 'AI-powered recruitment assistant for automated resume screening and candidate ranking.',
          technologies: ['React', 'TypeScript', 'AI Integration', 'Node.js']
        }
      ],
      blogPosts: [
        {
          title: 'The Future of AI and Its Impact in the Coming Days 🚀🤖',
          slug: 'The Future of AI and Its Impact in the Coming Days 🚀🤖'
        },
        {
          title: 'My Experience at the Umurava AI Hackathon',
          slug: 'My-Experience-at-the-Umurava-AI-Hackathon'
        }
      ]
    };
  }
}

// Build system prompt with all verified portfolio context
function buildSystemPrompt(portfolioData) {
  const { personalInfo, projects, blogPosts } = portfolioData;

  return `You are the personal AI Assistant for ${personalInfo.name}'s developer portfolio.
Your role is to answer questions from recruiters, clients, and visitors concisely, professionally, and enthusiastically.

=== PROFILE ===
• Name: ${personalInfo.name} (also known as ${personalConfig.displayName})
• Title: ${personalInfo.title}
• Location: ${personalInfo.location}
• Experience: ${personalInfo.experience}
• Education: ${personalInfo.education}
• Specialization: ${personalInfo.specialization}
• Contact Email: ${personalConfig.contactPreferences.email}
• Phone: ${personalConfig.contactPreferences.phone}
• GitHub: ${personalConfig.contactPreferences.github}
• LinkedIn: ${personalConfig.contactPreferences.linkedin}

=== REAL PROJECTS (${projects.length}) ===
${projects.map((p, i) => `${i + 1}. **${p.title}**
   - Technologies: ${p.technologies.join(', ')}
   - Description: ${p.description.slice(0, 300)}...`).join('\n')}

=== ARTICLES / BLOG POSTS (${blogPosts.length}) ===
${blogPosts.map((b, i) => `${i + 1}. "${b.title}"`).join('\n')}

=== CORE SKILLS & SERVICES ===
• Frontend: React 19, TypeScript, JavaScript (ES6+), Next.js, Tailwind CSS, Framer Motion, HTML5/CSS3.
• Backend: Node.js, Express, REST APIs, PostgreSQL, MongoDB, Contentful Headless CMS.
• AI & Tooling: Google Gemini API, OpenAI API, Prompt Engineering, Git, Vite, Vercel.
• Available for: Full-time software engineering roles, high-impact contract projects, and freelance builds.

GUIDELINES:
1. Always base answers strictly on Yves's actual background and projects listed above.
2. Keep responses concise, direct, helpful, and formatted in clean markdown with bullet points where appropriate.
3. If asked how to get in touch, provide Yves's email (${personalConfig.contactPreferences.email}) and invite them to use the contact section.`;
}

// Query Google Gemini API (when API key starts with AIzaSy)
async function callGeminiAPI(apiKey, prompt, conversationHistory) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

  // Build conversational contents
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }]
    }
  ];

  // Append recent chat turns
  conversationHistory.slice(-4).forEach(msg => {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.6
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error status: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No text generated by Gemini');
  }
  return text.trim();
}

// Query OpenAI API (when API key starts with sk-)
async function callOpenAIAPI(apiKey, systemPrompt, message, conversationHistory) {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-4).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    })),
    { role: 'user', content: message }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}

// Smart Local Knowledge Engine for instant, relevant answers to common visitor questions
export function getKnowledgeEngineResponse(rawMessage, portfolioData) {
  const query = (rawMessage || '').toLowerCase().trim();
  const { personalInfo, projects, blogPosts } = portfolioData;

  // Specific project: Umurava AI Screener
  if (query.includes('umurava') || (query.includes('screener') && query.includes('ai')) || query.includes('recruitment')) {
    const p = projects.find(pr => pr.title.toLowerCase().includes('umurava')) || projects[2];
    return `**${p?.title || 'Umurava AI Screener'}** is an intelligent HR recruitment assistant designed to streamline candidate screening.

• **Core Purpose**: Automates resume and CV evaluation against job requirements, ranking applicants by relevance to save HR teams hundreds of manual hours.
• **Technologies**: ${p?.technologies?.join(', ') || 'React, TypeScript, AI APIs, Node.js'}.
• **Highlight**: Demonstrates practical generative AI application in human resource workflows.`;
  }

  // Specific project: Digital Renting System
  if (query.includes('renting') || query.includes('property') || query.includes('asset') || query.includes('digital renting')) {
    const p = projects.find(pr => pr.title.toLowerCase().includes('renting')) || projects[0];
    return `**${p?.title || 'Digital Renting System For Assets and Properties'}** is a comprehensive web platform for modern property and asset management.

• **Features**: Allows property owners to list rooms, houses, and equipment with pricing, availability, and location; renters can search and book rentals in real-time.
• **Technologies**: ${p?.technologies?.join(', ') || 'React, Node.js, PostgreSQL, Tailwind CSS'}.
• **Impact**: Streamlines tenant-owner communication and eliminates manual paper leasing logs.`;
  }

  // Specific project: Tenzies Game
  if (query.includes('tenzies') || query.includes('dice') || (query.includes('game') && !query.includes('project'))) {
    const p = projects.find(pr => pr.title.toLowerCase().includes('tenzies')) || projects[1];
    return `**${p?.title || 'Tenzies-Game'}** is a fast-paced interactive dice game built with React.

• **Gameplay**: Roll 10 dice, hold identical numbers, and keep rerolling until all 10 dice match to trigger victory confetti!
• **Technologies**: ${p?.technologies?.join(', ') || 'React.js, JavaScript, CSS, React Hooks'}.
• **Focus**: State management, tactile animations, and micro-interactions.`;
  }

  // All Projects / Portfolio work
  if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('what have you built') || query.includes('show me')) {
    const projectList = projects.map((p, idx) => `**${idx + 1}. ${p.title}**\n   *Stack: ${p.technologies.join(', ')}*\n   ${p.description.slice(0, 140)}...`).join('\n\n');
    return `Here are the key featured projects built by Yves:\n\n${projectList}\n\nYou can click on any card in the **Projects** section to explore the full architecture and code!`;
  }

  // Identity / Who is Yves?
  if (query.includes('who is') || query.includes('who are you') || query.includes('about yves') || query.includes('tell me about yourself') || query.includes('introduce')) {
    return `**${personalInfo.name}** (${personalConfig.displayName}) is a **${personalInfo.title}** based in ${personalInfo.location} with **${personalInfo.experience}** of experience.

Yves specializes in **${personalInfo.specialization}**, creating high-performance web platforms with fluid micro-interactions, robust backend APIs, and modern AI features.

• **Education**: ${personalInfo.education}
• **Mission**: Architecting scalable, user-centric software with sub-second response times.
• **Status**: Open to full-time engineering roles and high-impact contract projects!`;
  }

  // Skills & Technologies
  if (query.includes('skill') || query.includes('technolog') || query.includes('tech stack') || query.includes('stack') || query.includes('language') || query.includes('framework')) {
    return `Yves's core technical stack includes:

• **Frontend**: React 19, TypeScript, JavaScript (ES6+), Next.js, Tailwind CSS, Framer Motion, HTML5, CSS3
• **Backend & APIs**: Node.js, Express, RESTful APIs, Contentful Headless CMS, PostgreSQL, MongoDB
• **AI & Modern Integrations**: Google Gemini API, OpenAI API, LLM streaming, Prompt Engineering
• **DevOps & Tooling**: Git, GitHub, Vite, Postman, Vercel, Performance Profiling (Lighthouse 100)

Always eager to adopt cutting-edge developer tools and architecture patterns!`;
  }

  // Contact / Hire / Work together
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('touch') || query.includes('collaborat')) {
    return `You can get in touch with Yves directly through:

• **Email**: [${personalConfig.contactPreferences.email}](mailto:${personalConfig.contactPreferences.email})
• **Phone / WhatsApp**: [${personalConfig.contactPreferences.phone}](tel:+250791839279)
• **LinkedIn**: [Olivier Nsengiyumva](${personalConfig.contactPreferences.linkedin})
• **GitHub**: [github.com/olivier010](${personalConfig.contactPreferences.github})

Or submit a message through the **Contact** form at the bottom of the page!`;
  }

  // Blog / Articles / Writing
  if (query.includes('blog') || query.includes('article') || query.includes('post') || query.includes('hackathon') || query.includes('write') || query.includes('writing')) {
    if (blogPosts.length > 0) {
      const posts = blogPosts.map((b, i) => `${i + 1}. **${b.title}**`).join('\n');
      return `Yves writes about emerging tech and development experiences. Recent articles include:

${posts}

Check out the **Blog** section on this site to read the full articles!`;
    }
    return `Yves shares insights on modern web development, artificial intelligence, and engineering experiences in the **Blog** section.`;
  }

  // Experience / Background / Career
  if (query.includes('experience') || query.includes('background') || query.includes('career') || query.includes('history')) {
    return `Yves has **${personalInfo.experience}** of experience building software, starting with frontend interface design and expanding into full-stack architecture, database design, and cloud deployments.

• Currently studying **${personalInfo.education}**.
• Focused on clean architecture, resilient code, and developer tooling.
• Proven track record delivering production web apps with 99.9% uptime and high Google Lighthouse scores.`;
  }

  // Services offered
  if (query.includes('service') || query.includes('offer') || query.includes('what can you do') || query.includes('help me with')) {
    return `Yves provides specialized software engineering services:

1. **Full-Stack Web Application Development** (React 19, TypeScript, Node.js)
2. **AI Interface & LLM Integration** (RAG, Gemini/OpenAI API, intelligent agents)
3. **Frontend Performance & UI/UX Systems** (Tailwind CSS, fluid animations, Lighthouse 100)
4. **API & Database Engineering** (REST, PostgreSQL, MongoDB, Contentful)

Interested in working together? Reach out via the contact form!`;
  }

  // General default fallback
  return `Hi! I'm Yves's AI Assistant. I can tell you all about:

• **Projects**: *Digital Renting System*, *Tenzies Game*, and *Umurava AI Screener*
• **Tech Stack**: React 19, TypeScript, Node.js, Tailwind CSS, AI integrations
• **Background & Skills**: 5+ years building fast, accessible web platforms
• **Contact & Hiring**: Email, LinkedIn, GitHub, or phone

What would you like to know more about?`;
}

// Main chat handler
export async function getChatResponse(message, conversationHistory = []) {
  const trimmed = (message || '').trim();
  if (!trimmed) return "How can I help you today?";

  const portfolioData = await getPortfolioData();

  // If no API key or mock key, use knowledge engine directly
  if (!API_KEY) {
    return getKnowledgeEngineResponse(trimmed, portfolioData);
  }

  try {
    const systemPrompt = buildSystemPrompt(portfolioData);

    // If key is a Google Gemini key (starts with AIzaSy)
    if (API_KEY.startsWith('AIzaSy')) {
      const fullPrompt = `${systemPrompt}\n\nUser asked: "${trimmed}"\nPlease provide a helpful, accurate, markdown-formatted response based on Yves's portfolio context above.`;
      const reply = await callGeminiAPI(API_KEY, fullPrompt, conversationHistory);
      if (reply) return reply;
    }

    // If key is an OpenAI key (starts with sk-)
    if (API_KEY.startsWith('sk-')) {
      const reply = await callOpenAIAPI(API_KEY, systemPrompt, trimmed, conversationHistory);
      if (reply) return reply;
    }

    // Fallback if provider not identified
    return getKnowledgeEngineResponse(trimmed, portfolioData);
  } catch (error) {
    console.warn('AI API Error, falling back to Knowledge Engine:', error.message);
    return getKnowledgeEngineResponse(trimmed, portfolioData);
  }
}
