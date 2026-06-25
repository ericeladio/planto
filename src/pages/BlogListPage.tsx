import { useNavigate } from 'react-router-dom'
import { BLOG_POSTS } from '../data/blog'

export default function BlogListPage() {
  const navigate = useNavigate()

  return (
    <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 max-sm:pb-15">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white mb-3">Blog</h1>
        <p className="text-white/50 text-lg mb-12">Thoughts, tips, and stories from Planto</p>

        <div className="flex flex-col gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex max-lg:flex-col"
            >
              <div className="relative w-[280px] shrink-0 overflow-hidden max-lg:w-full max-lg:pt-[40%]">
                <img
                  src={post.image}
                  alt={post.title || 'Blog post'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
                <button
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="self-start mt-2 px-5 py-2 rounded-xl bg-white text-[#0d1a0d] text-sm font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity"
                >
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
