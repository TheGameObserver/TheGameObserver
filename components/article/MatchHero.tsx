interface MatchHeroProps {
  data: {
    competition?: string
    season?: string
    stage?: string
    homeTeam?: string
    awayTeam?: string
    score?: string
    analysisType?: string
  }
}

const MatchHero = ({ data }: MatchHeroProps) => {
  if (!data.homeTeam && !data.awayTeam) return null

  return (
    <section className="mx-auto mb-10 max-w-5xl rounded-3xl border border-gray-200 bg-white px-8 py-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {data.competition && (
        <p className="text-sm font-semibold tracking-[0.3em] text-blue-600 uppercase">
          {data.competition}
        </p>
      )}

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
        {data.homeTeam} {data.score && <span className="mx-3 text-blue-600">{data.score}</span>}
        {data.awayTeam}
      </h1>

      {(data.season || data.stage) && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {[data.season, data.stage].filter(Boolean).join(' • ')}
        </p>
      )}

      {data.analysisType && (
        <div className="mt-6">
          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {data.analysisType}
          </span>
        </div>
      )}
    </section>
  )
}

export default MatchHero
