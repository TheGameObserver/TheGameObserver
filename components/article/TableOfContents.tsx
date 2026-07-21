'use client'

import { useEffect, useState } from 'react'

interface TocHeading {
  value: string
  url: string
  depth: number
}

interface TableOfContentsProps {
  toc: TocHeading[]
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!toc || toc.length === 0) return

    const headingElements = toc
      .map((heading) => document.getElementById(heading.url.replace('#', '')))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-96px 0px -70% 0px' }
    )

    headingElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [toc])

  if (!toc || toc.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
        On this page
      </h2>
      <ul className="space-y-2 border-l border-gray-200 text-sm dark:border-gray-700">
        {toc
          .filter((heading) => heading.depth <= 3)
          .map((heading) => {
            const id = heading.url.replace('#', '')
            const isActive = activeId === id
            return (
              <li key={heading.url} style={{ paddingLeft: `${(heading.depth - 1) * 0.75}rem` }}>
                <a
                  href={heading.url}
                  className={`-ml-px block border-l-2 py-0.5 pl-3 transition-colors ${
                    isActive
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  {heading.value}
                </a>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

export default TableOfContents
