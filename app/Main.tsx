import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import HomeHero from '@/components/home/HomeHero'
import FeaturedArticle from '@/components/home/FeaturedArticle'
import ArticleCard from '@/components/home/ArticleCard'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import AboutPreview from '@/components/home/AboutPreview'

const MAX_DISPLAY = 5

interface HomeProps {
  posts: CoreContent<Blog>[]
  featuredPost: CoreContent<Blog> | null
}

export default function Home({ posts, featuredPost }: HomeProps) {
  const featuredHref = featuredPost ? `/blog/${featuredPost.slug}` : '/blog'

  return (
    <>
      <HomeHero featuredHref={featuredHref} />

      <FeaturedArticle post={featuredPost} />

      <div className="pb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
          Latest Analysis
        </h2>
        {!posts.length && <p className="text-gray-500 dark:text-gray-400">No posts found.</p>}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.slice(0, MAX_DISPLAY).map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="mt-6 flex justify-end text-base leading-6 font-medium">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>

      <CategoriesGrid />

      <AboutPreview />

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-10 pb-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
