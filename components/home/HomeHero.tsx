import Link from '@/components/Link'

interface HomeHeroProps {
  featuredHref: string
}

const HomeHero = ({ featuredHref }: HomeHeroProps) => {
  return (
    <div className="space-y-6 pt-10 pb-12 text-center sm:pt-14 sm:pb-16">
      <h1 className="text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight dark:text-gray-100">
        The Game Observer
      </h1>
      <p className="text-lg font-medium text-gray-600 sm:text-xl dark:text-gray-300">
        Football Analysis. Tactical Insights. Coaching Perspective.
      </p>
      <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
        Helping coaches, players and football enthusiasts understand the game through clear
        tactical analysis and coaching perspectives.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
        <Link
          href={featuredHref}
          className="bg-primary-600 hover:bg-primary-700 w-full rounded-full px-6 py-3 text-center text-sm font-semibold text-white transition-colors sm:w-auto"
        >
          Read Featured Analysis
        </Link>
        <Link
          href="#categories"
          className="w-full rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-800 transition-colors hover:border-gray-400 sm:w-auto dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-500"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  )
}

export default HomeHero
