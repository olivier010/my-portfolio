// src/pages/BlogPost.jsx
import { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark, MessageSquare, Heart, ThumbsUp, Eye, Copy, Check } from 'lucide-react'
import { getEntries } from '../utils/contentful'

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
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">{description}</p>
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
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [views, setViews] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const { slug } = useParams()
  const navigate = useNavigate()
  const contentRef = useRef(null)

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
          
          // Initialize likes and views from localStorage
          const likesKey = `likes_${slug}`
          const viewsKey = `views_${slug}`
          setLikes(parseInt(localStorage.getItem(likesKey) || '0'))
          setViews(parseInt(localStorage.getItem(viewsKey) || '0'))
          
          // Increment views
          const newViews = parseInt(localStorage.getItem(viewsKey) || '0') + 1
          localStorage.setItem(viewsKey, newViews.toString())
          setViews(newViews)
          
          // Check if post is liked
          const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
          setIsLiked(likedPosts.includes(slug))
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
    
    // Load comments
    const savedComments = JSON.parse(localStorage.getItem(`comments_${slug}`) || '[]')
    setComments(savedComments)
  }, [slug])

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100
        setReadingProgress(Math.min(scrollPercent, 100))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShare = async (platform = 'native') => {
    const url = window.location.href
    const title = post?.fields?.title || 'Blog Post'
    const text = post?.fields?.excerpt || ''

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 2000)
        } catch (err) {
          console.error('Failed to copy link:', err)
        }
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url })
          } catch (err) {
            console.error('Error sharing:', err)
          }
        } else {
          await navigator.clipboard.writeText(url)
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 2000)
        }
    }
    setShowShareOptions(false)
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

  const toggleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    const likesKey = `likes_${slug}`
    
    if (isLiked) {
      const newLikedPosts = likedPosts.filter(s => s !== slug)
      localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts))
      const newLikes = Math.max(0, likes - 1)
      localStorage.setItem(likesKey, newLikes.toString())
      setLikes(newLikes)
    } else {
      localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, slug]))
      const newLikes = likes + 1
      localStorage.setItem(likesKey, newLikes.toString())
      setLikes(newLikes)
    }
    setIsLiked(!isLiked)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment.trim(),
        author: 'Anonymous User', // You can add user authentication later
        timestamp: new Date().toISOString(),
        likes: 0
      }
      const updatedComments = [...comments, comment]
      setComments(updatedComments)
      localStorage.setItem(`comments_${slug}`, JSON.stringify(updatedComments))
      setNewComment('')
    }
  }

  const handleCommentLike = (commentId) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    )
    setComments(updatedComments)
    localStorage.setItem(`comments_${slug}`, JSON.stringify(updatedComments))
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 px-4">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to blog
        </button>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden" ref={contentRef}>
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
            {/* Post Meta */}
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
              <span className="flex items-center mr-4 mb-2">
                <Eye className="w-4 h-4 mr-1" />
                {views} views
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

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none mb-8">
              {documentToReactComponents(post.fields.content, renderOptions)}
            </div>

            {/* Engagement Bar */}
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {likes} {likes === 1 ? 'Like' : 'Likes'}
                </button>
                
                <button
                  onClick={toggleBookmark}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm font-medium"
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </button>
                  
                  {showShareOptions && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[200px]">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Share on Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Share on LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Share on Facebook
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-4 h-4 mr-2 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> 
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave a comment..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows="4"
              />
              <button
                type="submit"
                className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                            {comment.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{comment.author}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 ml-11">{comment.text}</p>
                      </div>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 ml-4"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Related Posts */}
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
    </div>
  )
}
