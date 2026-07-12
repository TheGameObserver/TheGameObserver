import Link from '@/components/Link'
import type { Category } from '@/data/categoriesData'

const icons: Record<Category['icon'], React.ReactNode> = {
  match: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5l3 2.2-1.15 3.55h-3.7L9 9.7 12 7.5Z" />
      <path d="M12 3v4.5M4.5 9.5l2.4 1M19.5 9.5l-2.4 1M8.8 20l1-3.25M15.2 20l-1-3.25" />
    </svg>
  ),
  player: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
    </svg>
  ),
  tactical: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M7 20h10M9 8.5l3 3 5-5M8 16.5h8" />
    </svg>
  ),
  coaching: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path d="M4.5 5.5h11a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2H9l-4 3v-3H4.5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
      <path d="M8 9.5h6M8 12.5h4" />
    </svg>
  ),
}

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { title, description, href, icon } = category

  return (
    <Link
      href={href}
      aria-label={`Browse ${title}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700"
    >
      <div className="bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 flex h-11 w-11 items-center justify-center rounded-full">
        {icons[icon]}
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{description}</p>
      <span className="text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-auto pt-4 text-sm font-semibold">
        Explore &rarr;
      </span>
    </Link>
  )
}

export default CategoryCard
