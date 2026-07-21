import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import ArticleCard from '@/components/home/ArticleCard'

interface RelatedArticlesProps {
  posts: CoreContent<Blog>[]
}

const RelatedArticles = ({ posts }: RelatedArticlesProps) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className="border-t border-gray-200 pt-10 pb-4 dark:border-gray-700">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
        Related Analysis
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

export default RelatedArticles
