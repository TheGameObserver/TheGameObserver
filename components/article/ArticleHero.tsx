import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import type { Blog, Authors } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'

interface ArticleHeroProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
}

const ArticleHero = ({ content, authorDetails }: ArticleHeroProps) => {
  const { title, summary, date, tags, images, category, competition, readingTime } = content

  const coverImage = images && images.length > 0 ? images[0] : siteMetadata.socialBanner
  // Category is CMS-ready via the optional `category` field. Falls back to the
  // first tag so older/undated content still shows a sensible badge.
  const badge = category || tags?.[0]

  return (
    <header className="pt-6 pb-8">
      <div className="mb-8 overflow-hidden rounded-2xl">
        <Image
          src={coverImage}
          alt={title}
          width={1600}
          height={900}
          className="h-64 w-full object-cover sm:h-80 md:h-[28rem]"
        />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badge && (
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase">
              {badge}
            </span>
          )}
          {competition && (
            <span className="rounded-full border border-gray-300 px-3 py-0.5 text-xs font-medium text-gray-600 dark:border-gray-600 dark:text-gray-300">
              {competition}
            </span>
          )}
        </div>

        <div className="mt-3">
          <PageTitle>{title}</PageTitle>
        </div>

        {summary && (
          <p className="mt-4 text-lg leading-7 text-gray-500 dark:text-gray-400">{summary}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          {authorDetails.map((author, idx) => (
            <span key={author.name} className="flex items-center gap-2">
              {author.avatar && (
                <Image
                  src={author.avatar}
                  width={24}
                  height={24}
                  alt={author.name}
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span className="font-medium text-gray-700 dark:text-gray-300">{author.name}</span>
              {idx < authorDetails.length - 1 && <span aria-hidden="true">,</span>}
            </span>
          ))}
          {authorDetails.length > 0 && <span aria-hidden="true">&middot;</span>}
          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          {readingTime?.text && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{readingTime.text}</span>
            </>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default ArticleHero
