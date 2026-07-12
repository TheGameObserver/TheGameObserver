import Link from '@/components/Link'

const AboutPreview = () => {
  return (
    <div className="rounded-2xl border border-gray-200 p-8 text-center shadow-sm sm:p-10 dark:border-gray-700">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
        About The Game Observer
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
        Helping people understand football tactics through clear, simple analysis.
      </p>
      <div className="mt-6">
        <Link
          href="/about"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-semibold"
        >
          Learn More &rarr;
        </Link>
      </div>
    </div>
  )
}

export default AboutPreview
