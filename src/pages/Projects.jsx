// src/pages/Projects.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar, Code, Tag } from 'lucide-react'
import { getProjects } from '../utils/projectService'
import { format } from 'date-fns'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects...')
        const projects = await getProjects({ include: 2 })
        console.log('Fetched projects:', projects)
        
        // Process projects to ensure image URLs are correct
        const processedProjects = projects.map(project => {
          // Log the project data for debugging
          console.log('Project data:', {
            title: project.fields.title,
            hasFeaturedImage: !!project.fields.featuredImage,
            imageUrl: project.fields.featuredImage?.fields?.file?.url
          })
          
          return project;
        });
        
        setProjects(processedProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Projects</h1>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Format date if available
  const formatProjectDate = (dateString) => {
    if (!dateString) return 'No date specified';
    try {
      return format(new Date(dateString), 'MMMM yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Projects</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse through my collection of projects and works
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.sys.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="group"
            >
              <Link
                to={`/projects/${project.fields.slug}`}
                className="block h-full"
              >
                <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col">
                  {project.fields.featuredImage?.fields?.file?.url ? (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={`${project.fields.featuredImage.fields.file.url.startsWith('//') ? 'https:' : ''}${project.fields.featuredImage.fields.file.url}?w=400&h=250&fit=fill`}
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
                    <div className="h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                  
                  <div className="p-4 flex-1 flex flex-col">
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
                    
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-2 h-8">
                      {project.fields.description}
                    </p>
                    
                    <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
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
                      
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage