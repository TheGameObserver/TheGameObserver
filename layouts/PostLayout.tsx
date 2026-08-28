import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ArticleHero from '@/components/article/ArticleHero'
import FootballMetadata from '@/components/article/FootballMetadata'
import MatchHero from '@/components/article/MatchHero'
import ArticleSidebar from '@/components/article/ArticleSidebar'
import AuthorBio from '@/components/article/AuthorBio'
import RelatedArticles from '@/components/article/RelatedArticles'

interface TocHeading {
  value: string
  url: string
  depth: number
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc?: TocHeading[]
  relatedPosts?: CoreContent<Blog>[]
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  toc = [],
  relatedPosts = [],
  children,
}: LayoutProps) {
  const { path, slug } = content
  const basePath = path.split('/')[0]
  const shareUrl = `${siteMetadata.siteUrl}/${path}`

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <ArticleHero content={content} authorDetails={authorDetails} />

        <MatchHero data={content} />

        <div className="mb-8">
          <FootballMetadata data={content} />
        </div>

        <div className="mx-auto max-w-5xl xl:grid xl:grid-cols-[42rem_220px] xl:justify-center xl:gap-16">
          <div className="mx-auto max-w-3xl xl:mx-0 xl:max-w-none">
            <div className="prose dark:prose-invert pt-6 pb-8">{children}</div>

            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}

            <AuthorBio authorDetails={authorDetails} />
          </div>

          <ArticleSidebar toc={toc} shareUrl={shareUrl} shareTitle={content.title} />
        </div>

        <div className="mx-auto max-w-5xl">
          <RelatedArticles posts={relatedPosts} />

          <footer>
            {(next || prev) && (
              <div className="flex justify-between border-t border-gray-200 py-8 text-sm leading-5 font-medium dark:border-gray-700">
                {prev && prev.path && (
                  <div>
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Previous Article
                    </h2>
                    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      <Link href={`/${prev.path}`}>{prev.title}</Link>
                    </div>
                  </div>
                )}
                {next && next.path && (
                  <div className="ml-auto text-right">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Next Article
                    </h2>
                    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      <Link href={`/${next.path}`}>{next.title}</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="pt-4">
              <Link
                href={`/${basePath}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Back to Analysis"
              >
                &larr; Back to Analysis
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
