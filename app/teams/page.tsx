import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'

export default function TeamsPage() {
  const teams = Array.from(
    new Set(
      allBlogs
        .flatMap((post) => [post.homeTeam, post.awayTeam])
        .filter((team): team is string => Boolean(team))
    )
  ).sort()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <p className="text-primary-500 text-sm font-semibold tracking-widest uppercase">
          Football Analysis
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Teams
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          Explore tactical analysis and football articles organised by team.
        </p>
      </div>

      {teams.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No teams have been added yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Link
              key={team}
              href={`/teams/${slug(team)}`}
              className="group hover:border-primary-500 rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700"
            >
              <h2 className="group-hover:text-primary-500 text-xl font-bold text-gray-900 dark:text-white">
                {team}
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Explore analysis →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
