import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { slug } from 'github-slugger'

const normalizePlayer = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

interface PlayerPageProps {
  params: Promise<{
    player: string
  }>
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { player } = await params

  const decodedPlayer = decodeURIComponent(player)

  const posts = allCoreContent(sortPosts(allBlogs)).filter((post) =>
    (post.players || []).some(
      (name) =>
        slug(name) === slug(decodedPlayer) ||
        normalizePlayer(name) === normalizePlayer(decodedPlayer)
    )
  )

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-primary-500 text-sm font-semibold tracking-widest uppercase">Player</p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">Player Not Found</h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          We could not find any articles for this player.
        </p>

        <Link href="/players" className="text-primary-500 hover:text-primary-600 mt-6 inline-block">
          ← Back to players
        </Link>
      </div>
    )
  }

  const playerName =
    posts[0].players?.find(
      (name) =>
        slug(name) === slug(decodedPlayer) ||
        normalizePlayer(name) === normalizePlayer(decodedPlayer)
    ) || decodedPlayer

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Players', href: '/players' },
            { label: playerName },
          ]}
          className="mb-6"
        />
        <p className="text-primary-500 text-sm font-semibold tracking-widest uppercase">Player</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
          {playerName}
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Tactical analysis and football articles featuring {playerName}.
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
        <Link href="/players" className="text-primary-500 hover:text-primary-600">
          ← Back to players
        </Link>
      </div>
    </div>
  )
}
