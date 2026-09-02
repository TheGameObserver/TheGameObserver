import Link from '@/components/Link'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

// Simple breadcrumb trail for article and taxonomy detail pages. Earlier levels
// link back up the hierarchy; the current page renders as plain text with
// aria-current="page".
const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-x-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
