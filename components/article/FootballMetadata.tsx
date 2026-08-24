// Server Component — no interactivity, so no 'use client' directive.
// Deliberately decoupled from the Blog contentlayer type: it accepts a plain
// data object so it can be reused later by Competition, Team, Player and
// Match pages, which may assemble this data from sources other than a blog
// post (e.g. a future CMS collection).

import Link from 'next/link'
import { slug } from 'github-slugger'

export interface FootballMetadataFields {
  competition?: string
  season?: string
  stage?: string
  homeTeam?: string
  awayTeam?: string
  score?: string
  formations?: string
  managerHome?: string
  managerAway?: string
  players?: string[]
  tacticalTopics?: string[]
  analysisType?: string
}

interface FootballMetadataProps {
  data: FootballMetadataFields
}

interface MetadataCard {
  label: string
  content: React.ReactNode
}

const linkClass =
  'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'

const PillList = ({ items, hrefPrefix }: { items: string[]; hrefPrefix: string }) => (
  <div className="mt-1 flex flex-wrap gap-1.5">
    {items.map((item) => (
      <Link
        key={item}
        href={`${hrefPrefix}/${slug(item)}`}
        className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {item}
      </Link>
    ))}
  </div>
)

const MatchTeams = ({ homeTeam, awayTeam }: { homeTeam?: string; awayTeam?: string }) => (
  <span>
    {homeTeam && (
      <Link href={`/teams/${slug(homeTeam)}`} className={linkClass}>
        {homeTeam}
      </Link>
    )}

    {homeTeam && awayTeam && ' vs '}

    {awayTeam && (
      <Link href={`/teams/${slug(awayTeam)}`} className={linkClass}>
        {awayTeam}
      </Link>
    )}
  </span>
)

const buildCards = (data: FootballMetadataFields): MetadataCard[] => {
  const cards: MetadataCard[] = []

  if (data.competition) {
    cards.push({
      label: 'Competition',
      content: (
        <Link href={`/competitions/${slug(data.competition)}`} className={linkClass}>
          {data.competition}
        </Link>
      ),
    })
  }

  if (data.season) {
    cards.push({ label: 'Season', content: data.season })
  }

  if (data.stage) {
    cards.push({ label: 'Stage', content: data.stage })
  }

  if (data.homeTeam || data.awayTeam) {
    cards.push({
      label: 'Match',
      content: <MatchTeams homeTeam={data.homeTeam} awayTeam={data.awayTeam} />,
    })
  }

  if (data.score) {
    cards.push({ label: 'Score', content: data.score })
  }

  if (data.formations) {
    cards.push({ label: 'Formations', content: data.formations })
  }

  if (data.managerHome || data.managerAway) {
    cards.push({
      label: 'Managers',
      content: [data.managerHome, data.managerAway].filter(Boolean).join(' vs '),
    })
  }

  if (data.players && data.players.length > 0) {
    cards.push({
      label: 'Players',
      content: <PillList items={data.players} hrefPrefix="/players" />,
    })
  }

  if (data.tacticalTopics && data.tacticalTopics.length > 0) {
    cards.push({
      label: 'Tactical Topics',
      content: <PillList items={data.tacticalTopics} hrefPrefix="/tactical-topics" />,
    })
  }

  if (data.analysisType) {
    cards.push({ label: 'Analysis Type', content: data.analysisType })
  }

  return cards
}

const FootballMetadata = ({ data }: FootballMetadataProps) => {
  const cards = buildCards(data)

  if (cards.length === 0) return null

  return (
    <div className="mx-auto max-w-3xl xl:max-w-none">
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 p-6 sm:grid-cols-2 dark:border-gray-700">
        {cards.map((card) => (
          <div key={card.label}>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              {card.label}
            </p>
            <div className="mt-1 text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">
              {card.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FootballMetadata
