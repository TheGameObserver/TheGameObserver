import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ArticleHero from '@/components/article/ArticleHero'
import AuthorBio from '@/components/article/AuthorBio'
import RelatedArticles from '@/components/article/RelatedArticles'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails?: CoreContent<Authors>[]
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  relatedPosts?: CoreContent<Blog>[]
}

export default function PostMinimal({
  content,
  authorDetails = [],
  next,
  prev,
  relatedPosts = [],
  children,
}: LayoutProps) {
  const { slug } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <ArticleHero content={content} authorDetails={authorDetails} />

        <div className="mx-auto max-w-3xl">
          <div className="prose dark:prose-invert py-4">{children}</div>

          {siteMetadata.comments && (
            <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
              <Comments slug={slug} />
            </div>
          )}

          <AuthorBio authorDetails={authorDetails} />
        </div>

        <div className="mx-auto max-w-5xl">
          <RelatedArticles posts={relatedPosts} />
        </div>

        <div className="mx-auto max-w-3xl">
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
