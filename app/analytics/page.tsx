import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import { genPageMetadata } from 'app/seo'
import { allAnalytics } from 'contentlayer/generated'

export const metadata = genPageMetadata({
  title: 'Analytics',
  description: 'Data-led football reports and analytical projects from The Game Observer.',
})

export default function AnalyticsPage() {
  const reports = allAnalytics
    .filter((report) => !report.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <SectionContainer>
      <div className="space-y-4 pt-8 pb-8">
        <h1 className="text-3xl tracking-tight leading-9 font-extrabold sm:text-4xl">
          TGO Analytics
        </h1>
        <p className="max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-300">
          Data-led football reports, visualisations and research projects. Each report presents its
          scope, evidence and limitations clearly.
        </p>
      </div>
      {reports.length === 0 ? (
        <p className="border-t border-gray-200 py-8 text-gray-600 dark:border-gray-700 dark:text-gray-300">
          Analytics reports will appear here as they are published.
        </p>
      ) : (
        <div className="grid gap-6 border-t border-gray-200 py-8 sm:grid-cols-2 dark:border-gray-700">
          {reports.map((report) => (
            <article
              key={report._id}
              className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
            >
              <p className="text-primary-500 text-xs font-semibold tracking-wide uppercase">
                {report.category}
              </p>
              <h2 className="mt-2 text-xl leading-snug font-bold">
                <Link href={`/analytics/${report.slug}`} className="hover:text-primary-500">
                  {report.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {report.summary}
              </p>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                {report.teams?.join(' · ')}
                {report.competition ? ` · ${report.competition}` : ''}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionContainer>
  )
}
