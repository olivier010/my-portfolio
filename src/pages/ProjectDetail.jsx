// src/pages/ProjectDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/#projects"
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {project.fields.featuredImage && (
            <div className="h-96 overflow-hidden">
              <img
                src={project.fields.featuredImage.fields.file.url + '?w=1200'}
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
                {project.fields.gitHubUrl && (
                  <a
                    href={project.fields.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    aria-label={`View ${project.fields.title} on GitHub`}
                  >
                    <Github className="w-5 h-5 mr-2" /> Source Code
                  </a>
                )}
                
                {project.fields.liveDemoUrl && (
                  <a
                    href={project.fields.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Project Description */}
            {project.fields.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.fields.description}
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.fields.technologies && project.fields.technologies.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.fields.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Date */}
            {project.fields.projectDate && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project Date</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(project.fields.projectDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}

            {/* Rich Content */}
            {project.fields.content && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project Details</h2>
                <div className="prose dark:prose-invert max-w-none">
                  {documentToReactComponents(project.fields.content)}
                </div>
              </div>
            )}

            {/* Additional Images Gallery */}
            {project.fields.additionalImages && project.fields.additionalImages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.fields.additionalImages.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img
                        src={image.fields.file.url + '?w=600'}
                        alt={`${project.fields.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

export default ProjectDetail