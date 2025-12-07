// src/components/BlogSection.jsx
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getEntries } from '../utils/contentful'

// Simple cache implementation
const postCache = new Map()

export default function BlogSection() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = useCallback(async () => {
    const cacheKey = 'blog-posts'
    
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
        limit: 3,
        select: 'fields.title,fields.slug,fields.excerpt,fields.featuredImage,fields.publishDate,sys.createdAt'
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
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
          <p>No articles found.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              to={`/blog/${post.fields.slug}`} 
              key={post.sys.id} 
              className="group"
              aria-label={`Read more about ${post.fields.title}`}
            >
              <article className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.fields.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.fields.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(post.fields.publishDate || post.sys.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}