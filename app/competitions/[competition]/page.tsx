import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { slug } from 'github-slugger'

interface CompetitionPageProps {
  params: Promise<{
    competition: string
  }>
}

export default async function CompetitionPage({ params }: CompetitionPageProps) {
  const { competition } = await params

  const posts = allCoreContent(sortPosts(allBlogs)).filter(
    (post) => post.competition && slug(post.competition) === competition
  )

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Competition Not Found</h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          We could not find any articles for this competition.
        </p>

        <Link
          href="/competitions"
          className="text-primary-500 hover:text-primary-600 mt-6 inline-block"
        >
          ← Back to competitions
        </Link>
      </div>
    )
  }

  // The filter above guarantees every matching post has a competition, so the
  // display name is always defined.
  const competitionName = posts[0].competition as string

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Competitions', href: '/competitions' },
            { label: competitionName },
          ]}
          className="mb-6"
        />
        <p className="text-primary-500 text-sm font-semibold tracking-widest uppercase">
          Competition
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
          {competitionName}
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Tactical analysis, match reports and football insights from {competitionName}.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.path}
            className="hover:border-primary-500 rounded-2xl border border-gray-200 p-6 transition hover:shadow-md dark:border-gray-700"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {post.season && <span>{post.season}</span>}
              {post.stage && <span>• {post.stage}</span>}
              {post.analysisType && <span>• {post.analysisType}</span>}
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
              <Link href={`/${post.path}`} className="hover:text-primary-500">
                {post.title}
              </Link>
            </h2>

            {post.summary && (
              <p className="mt-3 text-gray-600 dark:text-gray-400">{post.summary}</p>
            )}

            {(post.homeTeam || post.awayTeam) && (
              <div className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                {post.homeTeam} {post.score && ` ${post.score} `} {post.awayTeam}
              </div>
            )}

            <Link
              href={`/${post.path}`}
              className="text-primary-500 hover:text-primary-600 mt-5 inline-block text-sm font-semibold"
            >
              Read tactical analysis →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
        <Link href="/competitions" className="text-primary-500 hover:text-primary-600">
          ← Back to competitions
        </Link>
      </div>
    </div>
  )
}
