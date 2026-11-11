// src/components/HomeProjects.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, ExternalLink, ArrowRight, Code2 
} from 'lucide-react';
import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, 
  SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, 
  SiOpenai, SiStripe, SiDocker, SiSocketdotio, SiVite, 
  SiFramer, SiCss3, SiVercel 
} from 'react-icons/si';
import SectionHeading from './SectionHeading';
import { getProjects } from '../utils/projectService';
import { playClick } from '../utils/sound';

// Helper to render branded colored tech icons
export const TechIconBadge = ({ name }) => {
  const lower = (name || '').toLowerCase().trim();

  let Icon = Code2;
  let color = '#0ea5e9';

  if (lower.includes('react hooks')) {
    Icon = SiReact;
    color = '#61DAFB';
  } else if (lower.includes('react')) {
    Icon = SiReact;
    color = '#61DAFB';
  } else if (lower.includes('typescript') || lower === 'ts') {
    Icon = SiTypescript;
    color = '#3178C6';
  } else if (lower.includes('javascript') || lower === 'js') {
    Icon = SiJavascript;
    color = '#F7DF1E';
  } else if (lower.includes('css')) {
    Icon = SiCss3;
    color = '#1572B6';
  } else if (lower.includes('node')) {
    Icon = SiNodedotjs;
    color = '#5FA04E';
  } else if (lower.includes('next')) {
    Icon = SiNextdotjs;
    color = 'currentColor';
  } else if (lower.includes('tailwind')) {
    Icon = SiTailwindcss;
    color = '#06B6D4';
  } else if (lower.includes('vercel')) {
    Icon = SiVercel;
    color = 'currentColor';
  } else if (lower.includes('postgres') || lower.includes('sql')) {
    Icon = SiPostgresql;
    color = '#4169E1';
  } else if (lower.includes('mongo')) {
    Icon = SiMongodb;
    color = '#47A248';
  } else if (lower.includes('openai') || lower.includes('ai')) {
    Icon = SiOpenai;
    color = '#10A37F';
  } else if (lower.includes('stripe')) {
    Icon = SiStripe;
    color = '#635BFF';
  } else if (lower.includes('docker')) {
    Icon = SiDocker;
    color = '#2496ED';
  } else if (lower.includes('socket')) {
    Icon = SiSocketdotio;
    color = 'currentColor';
  } else if (lower.includes('vite')) {
    Icon = SiVite;
    color = '#646CFF';
  } else if (lower.includes('framer')) {
    Icon = SiFramer;
    color = '#0055FF';
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono bg-gray-100 dark:bg-white/[0.05] border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-300">
      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
      <span>{name}</span>
    </span>
  );
};

const HomeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetched = await getProjects({ limit: 6 });
        
        if (fetched && fetched.length > 0) {
          const formatted = fetched.map(p => {
            const imgField = p.fields?.featuredImage;
            let imgUrl = null;
            if (imgField?.fields?.file?.url) {
              imgUrl = imgField.fields.file.url.startsWith('//')
                ? `https:${imgField.fields.file.url}`
                : imgField.fields.file.url;
            }

            // Derive technologies if not explicitly present in Contentful entry
            let technologies = p.fields?.technologies;
            if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
              const titleLower = (p.fields?.title || '').toLowerCase();
              if (titleLower.includes('tenzies')) {
                technologies = ['React.js', 'JavaScript', 'CSS', 'React Hooks'];
              } else if (titleLower.includes('screener') || titleLower.includes('umurava')) {
                technologies = ['React.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'];
              } else if (titleLower.includes('renting') || titleLower.includes('properties')) {
                technologies = ['React.js', 'Node.js', 'Tailwind CSS', 'Vercel'];
              } else {
                technologies = ['React.js', 'JavaScript', 'CSS'];
              }
            }

            return {
              id: p.sys.id,
              slug: p.fields.slug || p.sys.id,
              title: p.fields.title,
              description: p.fields.description || p.fields.excerpt || 'Explore project details and live demo.',
              featuredImage: imgUrl,
              tags: technologies,
              gitHubUrl: p.fields.gitHubUrl || '',
              liveDemoUrl: p.fields.liveDemoUrl || '',
            };
          });

          setProjects(formatted);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects from Contentful:', err);
        setError('Failed to load projects from Contentful.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section 
      id="projects" 
      className="py-12 md:py-16 bg-gray-50/60 dark:bg-[#090b13] text-gray-900 dark:text-white transition-colors duration-300 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Portfolio Projects"
          title={<>Featured <span className="text-primary-500">Work</span></>}
          subtitle="Selected web applications and digital solutions fetched live from Contentful."
        />

        {/* Loading State Skeleton (3 Cards) */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d101d] overflow-hidden animate-pulse p-4"
              >
                <div className="h-44 bg-gray-200 dark:bg-white/5 rounded-lg mb-4" />
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-2/3 mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-white/5 rounded" />
                  <div className="h-6 w-16 bg-gray-200 dark:bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-rose-500 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No projects found in Contentful.
          </div>
        )}

        {/* 3 Columns Grid of Contentful Projects (Little / Compact Cards) */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-xl bg-white dark:bg-[#0d101d] border border-gray-200 dark:border-white/10 overflow-hidden shadow-xs hover:shadow-xl hover:border-primary-500/50 dark:hover:border-primary-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Compact Thumbnail Image */}
                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => playClick()}
                  className="relative h-40 sm:h-44 w-full overflow-hidden block bg-gray-100 dark:bg-white/5"
                >
                  {project.featuredImage ? (
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-gray-400">
                      No Preview Available
                    </div>
                  )}
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d101d]/80 via-transparent to-transparent opacity-60" />
                </Link>

                {/* Compact Card Content Body (Few Words) */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title linked to project */}
                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={() => playClick()}
                      className="block"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Few words description */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech stack with branded colored icons */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <TechIconBadge key={tag} name={tag} />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Bar: Read More & Quick Links */}
                  <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    {/* Read More button that opens the project */}
                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={() => playClick()}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors group-hover:translate-x-0.5"
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {project.gitHubUrl && (
                        <a
                          href={project.gitHubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playClick()}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playClick()}
                          className="p-1.5 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-500/10 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary-500/50 hover:text-primary-500 shadow-xs transition-all"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomeProjects;
