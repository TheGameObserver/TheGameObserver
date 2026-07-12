import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

interface FeaturedPost {
  slug: string
  title: string
  summary?: string
  images?: string[]
  tags?: string[]
}

interface FeaturedArticleProps {
  post: FeaturedPost | null
}

// TEMPORARY fallback content, used only when no article in /data/blog has
// `featured: true` in its frontmatter. Once a real article is marked as
// featured, this fallback is never rendered and can be safely removed.
const TEMP_FALLBACK: FeaturedPost = {
  slug: '',
  title: 'Mexico 3–2 South Africa',
  summary:
    'How one curved blind-side run and a midfield turnover created the first goal of the FIFA World Cup 2026.',
  images: [],
  tags: ['Match Analysis'],
}

const FeaturedArticle = ({ post }: FeaturedArticleProps) => {
  const article = post ?? TEMP_FALLBACK
  const isTemporary = !post
  const href = isTemporary ? '/blog' : `/blog/${article.slug}`
  const image = article.images?.[0] || siteMetadata.socialBanner
  const badge = article.tags?.[0] || 'Analysis'

  return (
    <div id="featured-analysis" className="pb-12">
      <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-semibold tracking-widest uppercase">
        Featured Analysis
      </p>
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-700">
        <Link href={href} aria-label={`Read: ${article.title}`}>
          <Image
            alt={article.title}
            src={image}
            width={1200}
            height={630}
            className="h-56 w-full object-cover sm:h-72 md:h-96"
          />
        </Link>
        <div className="p-6 sm:p-8">
          <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-widest uppercase">
            {badge}
          </span>
          <h2 className="mt-3 text-2xl leading-8 font-bold tracking-tight text-gray-900 sm:text-3xl sm:leading-9 dark:text-gray-100">
            <Link href={href} className="hover:text-primary-600 dark:hover:text-primary-400">
              {article.title}
            </Link>
          </h2>
          {article.summary && (
            <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg dark:text-gray-400">
              {article.summary}
            </p>
          )}
          <div className="mt-6">
            <Link
              href={href}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-semibold"
              aria-label={`Read full analysis: ${article.title}`}
            >
              Read Full Analysis &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedArticle
