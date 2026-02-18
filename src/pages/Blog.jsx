// src/pages/Blog.jsx
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getEntries } from '../utils/contentful'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'

// Simple cache implementation
const postCache = new Map()

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = useCallback(async () => {
    const cacheKey = 'all-blog-posts'
    
    // Return cached data if available
    if (postCache.has(cacheKey)) {
      setPosts(postCache.get(cacheKey))
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const blogPosts = await getEntries('blogPost', {
        order: '-sys.createdAt',
        limit: 20, // Get more posts for the listing page
        select: 'fields.title,fields.slug,fields.excerpt,fields.featuredImage,fields.publishDate,fields.tags,sys.createdAt'
      })

      // Cache the results
      postCache.set(cacheKey, blogPosts)
      setPosts(blogPosts)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">No articles found.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, and technology.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.sys.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link 
                to={`/blog/${post.fields.slug}`} 
                className="block h-full"
                aria-label={`Read more about ${post.fields.title}`}
              >
                <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {post.fields.featuredImage && (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={post.fields.featuredImage.fields.file.url + '?w=600&h=300&fit=fill'}
                        alt={post.fields.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="600"
                        height="300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {/* Tags */}
                    {post.fields.tags && post.fields.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.fields.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.fields.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.fields.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.fields.publishDate || post.sys.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        <span className="text-sm font-medium">Read more</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/#blog"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
            Back to blog preview
          </Link>
        </div>
      </div>
    </section>
  )
}
