import type { ReactNode } from 'react'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'

interface AnalyticsContent {
  title: string
  date: string
  summary: string
  category: string
  teams?: string[]
  competition?: string
  season?: string
}

export default function AnalyticsReportLayout({
  content,
  children,
}: {
  content: AnalyticsContent
  children: ReactNode
}) {
  return (
    <SectionContainer>
      <article className="mx-auto max-w-4xl">
        <header className="border-b border-gray-200 pb-8 pt-8 dark:border-gray-700">
          <Link href="/analytics" className="text-primary-500 hover:text-primary-600">
            ← All Analytics
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-500">
            {content.category}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
            {content.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={content.date}>
              {new Date(content.date).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </time>
            {content.competition && <span>{content.competition}</span>}
            {content.season && <span>{content.season}</span>}
            {content.teams?.length ? <span>{content.teams.join(' · ')}</span> : null}
          </div>
        </header>
        <div className="prose dark:prose-invert mx-auto max-w-none py-8">{children}</div>
        <footer className="border-t border-gray-200 py-6 dark:border-gray-700">
          <Link href="/analytics" className="text-primary-500 hover:text-primary-600">
            ← Back to TGO Analytics
          </Link>
        </footer>
      </article>
    </SectionContainer>
  )
}
