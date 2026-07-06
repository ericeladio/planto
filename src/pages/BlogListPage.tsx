import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts } from '../services/api'
import type { BlogPostOut } from '../services/api'
import SEOHead from '../components/SEOHead'
import Footer from '../components/Footer'

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPostOut[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts()
      .then((res) => setPosts(res.items))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEOHead
        title="Blog — Plant Care Tips & Guides"
        description="Expert plant care tips, guides, and stories from the Planto community. Learn how to keep your indoor plants thriving."
        canonicalPath="/blog"
      />
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 max-sm:pb-15">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white mb-3">Blog</h1>
          <p className="text-white/50 text-lg mb-12">Thoughts, tips, and stories from Planto</p>

          <div className="flex flex-col gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-0 rounded-3xl border border-white/10 bg-white/5 overflow-hidden max-lg:flex-col">
                  <div className="w-[280px] shrink-0 h-[200px] bg-white/5 animate-pulse max-lg:w-full max-lg:h-0 max-lg:pt-[40%]" />
                  <div className="flex-1 p-6 flex flex-col gap-3">
                    <div className="w-20 h-4 bg-white/5 rounded animate-pulse" />
                    <div className="w-3/4 h-6 bg-white/5 rounded animate-pulse" />
                    <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
                    <div className="w-24 h-8 bg-white/5 rounded-xl animate-pulse mt-2" />
                  </div>
                </div>
              ))
            ) : posts.length === 0 ? (
              <p className="text-white/40 text-center py-10">No hay publicaciones disponibles.</p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex max-lg:flex-col"
                >
                  <div className="relative w-[280px] shrink-0 overflow-hidden max-lg:w-full max-lg:pt-[40%]">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title || 'Blog post'}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-center gap-3">
                    {post.date && (
                      <span className="text-white/40 text-sm">{post.date}</span>
                    )}
                    <h2 className="text-xl font-semibold text-white">
                      {post.title || 'Untitled'}
                    </h2>
                    <p className="text-white/60 leading-[1.6] line-clamp-3">
                      {post.excerpt || 'No content yet. Edit this post to add your story.'}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="self-start mt-2 px-5 py-2 rounded-xl bg-white text-[#0d1a0d] text-sm font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity no-underline"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
