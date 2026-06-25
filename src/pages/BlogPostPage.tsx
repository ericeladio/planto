import { useParams, useNavigate } from 'react-router-dom'
import { BLOG_POSTS } from '../data/blog'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 text-center">
        <h1 className="text-2xl text-white mb-4">Post not found</h1>
        <button
          onClick={() => navigate('/blog')}
          className="text-white/60 hover:text-white underline bg-transparent border-none cursor-pointer font-[inherit]"
        >
          Back to Blog
        </button>
      </section>
    )
  }

  return (
    <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 max-sm:pb-15">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-white/50 hover:text-white bg-transparent border-none cursor-pointer font-[inherit] text-sm mb-8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Back to Blog
        </button>

        <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title || 'Blog post'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <h1 className="text-[clamp(28px,3vw,48px)] font-semibold text-white mb-3">
          {post.title || 'Untitled'}
        </h1>

        {post.date && (
          <p className="text-white/40 text-sm mb-10">
            {post.date} · by {post.author || 'Planto'}
          </p>
        )}

        <div className="flex flex-col gap-5">
          {post.content ? (
            post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-white/70 leading-[1.8] text-base">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-white/40 italic">
              This post is empty. Come back later for the full story.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
