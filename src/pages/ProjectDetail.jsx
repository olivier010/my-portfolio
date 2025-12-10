// src/pages/ProjectDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getProjectBySlug } from '../utils/projectService'

const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProjectBySlug(slug)
        setProject(project)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h2>
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/#projects"
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {project.fields.image && (
            <div className="h-96 overflow-hidden">
              <img
                src={project.fields.image.fields.file.url + '?w=1200'}
                alt={project.fields.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {project.fields.title}
              </h1>
              
              <div className="flex space-x-4">
                {project.fields.github && (
                  <a
                    href={project.fields.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    aria-label={`View ${project.fields.title} on GitHub`}
                  >
                    <Github className="w-5 h-5 mr-2" /> Source Code
                  </a>
                )}
                
                {project.fields.live && (
                  <a
                    href={project.fields.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {project.fields.technologies && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.fields.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none">
              {project.fields.content && documentToReactComponents(project.fields.content)}
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  )
}

export default ProjectDetail