'use client'

import { KBarSearchProvider as PlinyKBarSearchProvider } from 'pliny/search/KBar'
import type { KBarConfig } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

// pliny's default kbar mapping only indexes the article title and summary.
// TGO's discovery model treats the football taxonomy (tags, competition,
// season, stage, teams, players, tactical topics, analysis type) as first-class
// search terms, so this client provider supplies its own `onSearchDocumentsLoad`
// mapping — the extension point documented by pliny — while reusing pliny's
// fetch, state and modal logic unchanged. The mapping lives in a client
// component so the `perform` handler can use the Next.js router; a function
// defined in `siteMetadata.js` could not cross the server → client boundary.
interface SearchDocument {
  path: string
  title: string
  date: string
  summary?: string
  tags?: string[]
  competition?: string
  season?: string
  stage?: string
  homeTeam?: string
  awayTeam?: string
  players?: string[]
  tacticalTopics?: string[]
  analysisType?: string
}

const buildKeywords = (post: SearchDocument) =>
  [
    post.summary,
    post.tags?.join(' '),
    post.competition,
    post.season,
    post.stage,
    post.homeTeam,
    post.awayTeam,
    post.players?.join(' '),
    post.tacticalTopics?.join(' '),
    post.analysisType,
  ]
    .filter(Boolean)
    .join(' ')

interface KBarSearchProviderProps {
  children: ReactNode
}

const KBarSearchProvider = ({ children }: KBarSearchProviderProps) => {
  const router = useRouter()
  const kbarSearchConfig = siteMetadata.search as KBarConfig

  const searchConfig: KBarConfig = {
    provider: 'kbar',
    kbarConfig: {
      ...kbarSearchConfig.kbarConfig,
      onSearchDocumentsLoad: (json) =>
        (json as SearchDocument[]).map((post) => ({
          id: post.path,
          name: post.title,
          keywords: buildKeywords(post),
          section: 'Content',
          subtitle: formatDate(post.date, siteMetadata.locale),
          perform: () => router.push(`/${post.path}`),
        })),
    },
  }

  return (
    <PlinyKBarSearchProvider kbarConfig={searchConfig.kbarConfig}>
      {children}
    </PlinyKBarSearchProvider>
  )
}

export default KBarSearchProvider
