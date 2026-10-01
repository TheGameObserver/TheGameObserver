import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allAnalytics } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AnalyticsReportLayout from '@/layouts/AnalyticsReportLayout'
import { genPageMetadata } from 'app/seo'

export function generateStaticParams() {
  return allAnalytics
    .filter((report) => !report.draft)
    .map((report) => ({ slug: report.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const report = allAnalytics.find((item) => item.slug === slug && !item.draft)
  if (!report) return {}
  return genPageMetadata({
    title: report.title,
    description: report.summary,
  })
}

export default async function AnalyticsReportPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const report = allAnalytics.find((item) => item.slug === slug && !item.draft)
  if (!report) notFound()

  return (
    <AnalyticsReportLayout content={report}>
      <MDXLayoutRenderer code={report.body.code} components={components} toc={report.toc} />
    </AnalyticsReportLayout>
  )
}
