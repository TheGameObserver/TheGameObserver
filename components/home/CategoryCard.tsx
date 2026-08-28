import Link from '@/components/Link'
import type { Category } from '@/data/categoriesData'

const icons: Record<Category['icon'], React.ReactNode> = {
  trophy: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path d="M8 4.5h8V9a4 4 0 0 1-8 0V4.5Z" />
      <path d="M8 6H5.5c0 2.2 1.1 3.9 2.8 4.4M16 6h2.5c0 2.2-1.1 3.9-2.8 4.4" />
      <path d="M12 13v3.5M8.5 20h7M9.5 16.5h5l-.5 3.5h-4l-.5-3.5Z" />
    </svg>
  ),
  player: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
    </svg>
  ),
  tactical: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M7 20h10M9 8.5l3 3 5-5M8 16.5h8" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path d="M12 3.5 19 6v5.5c0 4.3-2.9 7.4-7 9-4.1-1.6-7-4.7-7-9V6l7-2.5Z" />
      <circle cx="12" cy="11" r="2.5" />
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
