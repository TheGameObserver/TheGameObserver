import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl leading-normal font-bold md:text-2xl">
          Sorry, we couldn&apos;t find this page.
        </p>
        <p className="mb-8">
          The page you are looking for doesn&apos;t exist or may have moved. Head back to the
          homepage to explore our latest football analysis.
        </p>
        <Link
          href="/"
          className="bg-primary-600 hover:bg-primary-700 inline rounded-lg border border-transparent px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 focus:outline-hidden"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
