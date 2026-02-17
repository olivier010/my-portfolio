// src/components/Projects.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { getProjects } from '../utils/projectService'
import { format } from 'date-fns'

const HomeProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects...');
        const projects = await getProjects({
          limit: 6,
          include: 2  // Include linked assets and entries
        });
        
        console.log('Projects from Contentful:', projects);
        
        if (projects && projects.length > 0) {
          console.log('Raw projects data:', projects);
          
          const formattedProjects = projects.map(project => {
            // Log all fields available in the project
            console.log('Project fields:', Object.keys(project.fields));
            console.log('Project data:', {
              title: project.fields.title,
              description: project.fields.description,
              technologies: project.fields.technologies,
              featuredImage: project.fields.featuredImage ? 'Exists' : 'Missing',
              gitHubUrl: project.fields.gitHubUrl,
              liveDemoUrl: project.fields.liveDemoUrl
            });
            // Get the image URL if it exists
            let imageUrl = null;
            const imageField = project.fields.featuredImage;
            console.log('Project image data:', imageField);
            
            if (imageField) {
              console.log('Image object structure:', {
                hasFields: !!imageField.fields,
                hasFile: !!imageField.fields?.file,
                hasUrl: !!imageField.fields?.file?.url,
                url: imageField.fields?.file?.url
              });
              
              if (imageField.fields?.file?.url) {
                imageUrl = imageField.fields.file.url.startsWith('//') 
                  ? `https:${imageField.fields.file.url}`
                  : imageField.fields.file.url;
                console.log('Final image URL:', imageUrl);
              }
            }
            
            // Return the formatted project
            return {
              ...project,
              fields: {
                ...project.fields,
                featuredImage: imageUrl ? { 
                  fields: { 
                    file: { url: imageUrl } 
                  } 
                } : null
              }
            };
          });
          
          console.log('Formatted projects:', formattedProjects);
          setProjects(formattedProjects);
        } else {
          console.warn('No projects found in Contentful');
          setError('No projects found. Please add some projects in Contentful.');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please check your console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-36 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  // Format date if available
  const formatProjectDate = (dateString) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch (e) {
      return null;
    }
  };

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            My Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            A collection of my recent work and projects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.sys.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <Link
                  to={`/projects/${project.fields.slug}`}
                  className="block h-full"
                >
                  <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col">
                    {project.fields.featuredImage?.fields?.file?.url ? (
                      <div className="h-36 overflow-hidden">
                        <img
                          src={`${project.fields.featuredImage.fields.file.url}?w=400&h=200&fit=fill`}
                          alt={project.fields.title || 'Project'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = (
                              '<div class="h-full w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">' +
                              '<span class="text-xs text-gray-400">No image</span>' +
                              '</div>'
                            );
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-36 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                    
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1 pr-2">
                          {project.fields.title}
                        </h3>
                        {project.fields.featured && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                        {project.fields.projectDate && (
                          <span className="flex items-center">
                            <Calendar className="mr-1 w-3 h-3" />
                            <span>{formatProjectDate(project.fields.projectDate)}</span>
                          </span>
                        )}
                        
                        {project.fields.technologies?.length > 0 && (
                          <span className="flex items-center">
                            <Tag className="mr-1 w-3 h-3" />
                            <span>{project.fields.technologies.length} techs</span>
                          </span>
                        )}
                      </div>
                      
                      <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 line-clamp-2 h-8">
                        {project.fields.description}
                      </p>
                      
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex space-x-2">
                          {project.fields.gitHubUrl && (
                            <a
                              href={project.fields.gitHubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-xs"
                              onClick={(e) => e.stopPropagation()}
                              title="GitHub"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          
                          {project.fields.liveDemoUrl && (
                            <a
                              href={project.fields.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-xs"
                              onClick={(e) => e.stopPropagation()}
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">No projects found. Please add some projects in Contentful.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            View all projects <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeProjects