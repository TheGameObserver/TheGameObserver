import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface ArticleCardProps {
  post: CoreContent<Blog>
}

const ArticleCard = ({ post }: ArticleCardProps) => {
  const { slug, date, title, summary, tags } = post

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
        </dd>
      </dl>
      <h3 className="mt-3 text-xl leading-7 font-bold tracking-tight">
        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
          {title}
        </Link>
      </h3>
      <div className="mt-2 flex flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      {summary && (
        <p className="prose mt-4 line-clamp-3 max-w-none text-gray-500 dark:text-gray-400">
          {summary}
        </p>
      )}
      <div className="mt-auto pt-4 text-base leading-6 font-medium">
        <Link
          href={`/blog/${slug}`}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label={`Read more: "${title}"`}
        >
          Read more &rarr;
        </Link>
      </div>
    </article>
  )
}

export default ArticleCard
