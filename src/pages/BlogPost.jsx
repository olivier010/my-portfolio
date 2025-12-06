// src/pages/BlogPost.jsx
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark, MessageSquare } from 'lucide-react'
import { getEntries, getEntry } from '../utils/contentful'

// Custom components for rich text rendering
const renderOptions = {
  renderNode: {
    'embedded-asset-block': (node) => {
      const { title, description, file } = node.data.target.fields
      return (
        <div className="my-6">
          <img
            src={file.url}
            alt={title || 'Blog post image'}
            className="rounded-lg shadow-lg w-full max-w-3xl mx-auto"
          />
          {description && (
            <p className="text-center text-sm text-gray-500 mt-2">{description}</p>
          )}
        </div>
      )
    },
  },
}

export default function BlogPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [posts, related] = await Promise.all([
          getEntries('blogPost', { 'fields.slug': slug, limit: 1 }),
          getEntries('blogPost', { 'fields.slug[ne]': slug, limit: 3, order: '-sys.createdAt' })
        ])
        
        if (posts.length > 0) {
          setPost(posts[0])
          setRelatedPosts(related)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
    
    // Check if post is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
    setIsBookmarked(bookmarks.includes(slug))
  }, [slug])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.fields.title,
          text: post.fields.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter(s => s !== slug)
      localStorage.setItem('bookmarkedPosts', JSON.stringify(newBookmarks))
    } else {
      localStorage.setItem('bookmarkedPosts', JSON.stringify([...bookmarks, slug]))
    }
    setIsBookmarked(!isBookmarked)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-12"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
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

  const readTime = Math.ceil(post.fields.content.content[0].content[0].value.length / 200)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to blog
        </button>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {post.fields.featuredImage && (
            <div className="h-96 overflow-hidden">
              <img
                src={post.fields.featuredImage.fields.file.url}
                alt={post.fields.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="flex items-center mr-4 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center mr-4 mb-2">
                <Clock className="w-4 h-4 mr-1" />
                {readTime} min read
              </span>
              {post.fields.tags && (
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {post.fields.tags.join(', ')}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.fields.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none mb-8">
              {documentToReactComponents(post.fields.content, renderOptions)}
            </div>

            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <button
                  onClick={toggleBookmark}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm font-medium"
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </button>
              </div>
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <MessageSquare className="w-4 h-4 mr-2" /> Leave a comment
              </button>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.sys.id}
                  to={`/blog/${relatedPost.fields.slug}`}
                  className="group"
                >
                  <article className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {relatedPost.fields.featuredImage && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={relatedPost.fields.featuredImage.fields.file.url}
                          alt={relatedPost.fields.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {relatedPost.fields.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {relatedPost.fields.excerpt}
                      </p>
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        Read more →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}