import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'

interface TeamPageProps {
  params: Promise<{
    team: string
  }>
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { team } = await params

  const posts = allBlogs.filter(
    (post) =>
      (post.homeTeam && slug(post.homeTeam) === team) ||
      (post.awayTeam && slug(post.awayTeam) === team)
  )

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-primary-500 text-sm font-semibold tracking-widest uppercase">Team</p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">Team Not Found</h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          We could not find any articles for this team.
        </p>

        <Link href="/teams" className="text-primary-500 hover:text-primary-600 mt-6 inline-block">
          ← Back to teams
        </Link>
      </div>
    )
  }

  const teamName =
    posts[0].homeTeam && slug(posts[0].homeTeam) === team ? posts[0].homeTeam : posts[0].awayTeam

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <p className="text-primary-500 text-sm font-semibold tracking-widest uppercase">Team</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
          {teamName}
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Tactical analysis and football articles involving {teamName}.
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
        <Link href="/teams" className="text-primary-500 hover:text-primary-600">
          ← Back to teams
        </Link>
      </div>
    </div>
  )
}
