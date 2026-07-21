import TableOfContents from '@/components/article/TableOfContents'
import ReadingProgress from '@/components/article/ReadingProgress'
import ShareButtons from '@/components/article/ShareButtons'

interface TocHeading {
  value: string
  url: string
  depth: number
}

interface ArticleSidebarProps {
  toc: TocHeading[]
  shareUrl: string
  shareTitle: string
}

const ArticleSidebar = ({ toc, shareUrl, shareTitle }: ArticleSidebarProps) => {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 space-y-8">
        <ReadingProgress />
        <TableOfContents toc={toc} />
        <ShareButtons url={shareUrl} title={shareTitle} />
      </div>
    </aside>
  )
}

export default ArticleSidebar
