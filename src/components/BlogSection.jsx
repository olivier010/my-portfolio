// src/components/BlogSection.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { getEntries } from '../utils/contentful';
import SectionHeading from './SectionHeading';
import { playClick } from '../utils/sound';

const postCache = new Map();

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const cacheKey = 'blog-posts';
    if (postCache.has(cacheKey)) {
      setPosts(postCache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const blogPosts = await getEntries('blogPost', {
        order: '-sys.createdAt',
        limit: 3,
        select: 'fields.title,fields.slug,fields.excerpt,fields.featuredImage,fields.publishDate,sys.createdAt'
      });

      if (blogPosts && blogPosts.length > 0) {
        const formatted = blogPosts.map(p => {
          let imgUrl = null;
          if (p.fields.featuredImage?.fields?.file?.url) {
            imgUrl = p.fields.featuredImage.fields.file.url.startsWith('//')
              ? `https:${p.fields.featuredImage.fields.file.url}`
              : p.fields.featuredImage.fields.file.url;
          }

          return {
            id: p.sys.id,
            title: p.fields.title,
            slug: p.fields.slug,
            excerpt: p.fields.excerpt || 'Read the full article.',
            publishDate: p.fields.publishDate || p.sys.createdAt,
            category: 'Article',
            featuredImage: imgUrl
          };
        });
        postCache.set(cacheKey, formatted);
        setPosts(formatted);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error('Error fetching blog posts from Contentful:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section 
      id="blog" 
      className="py-24 bg-white dark:bg-[#07090f] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <SectionHeading
            eyebrow="Technical Writing"
            title={<>Thoughts on <span className="text-primary-500">Architecture</span> &amp; AI</>}
            subtitle="Articles and insights directly fetched from Contentful."
          />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-[#0d101d] animate-pulse">
                <div className="h-44 bg-gray-200 dark:bg-white/5 rounded-lg mb-4" />
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-full mb-3" />
                <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No articles found in Contentful.
          </div>
        )}

        {/* Articles Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-xl bg-gray-50/70 dark:bg-[#0d101d] border border-gray-200 dark:border-white/10 hover:border-primary-500/40 dark:hover:border-primary-500/40 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link 
                  to={`/blog/${post.slug}`}
                  onClick={() => playClick()}
                  className="flex flex-1 flex-col"
                >
                  {/* Article Banner Image */}
                  <div className="h-44 overflow-hidden relative bg-gray-100 dark:bg-white/5">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-gray-400">
                        No Preview
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Article Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/80 dark:border-white/5 text-xs font-mono text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary-500/50 hover:text-primary-500 shadow-xs transition-all"
          >
            <span>Browse All Publications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
