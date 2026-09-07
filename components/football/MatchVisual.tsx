// TGO Match Visual System — Phase 1
//
// Server Component: deterministic, no client JS, no external images, no
// animation. The article supplies plain football metadata (never an image);
// the website decides how to present the match. Follows the decoupled
// plain-data props pattern established by FootballMetadataFields —
// deliberately NOT tied to the Contentlayer Blog type.
//
// Style selection (approved hybrid model, in priority order):
//   1. explicit `visualStyle` override (component-level prop only; the
//      Contentlayer schema is unchanged in Phase 1)
//   2. Featured context (featured flag or featured slot) → premium
//   3. tactical analysisType → tactical
//   4. normal match → clean
//   5. compact variant contexts → compact
//
// Treatments share the primitives below (TeamBadge, TeamSide, CenterResult,
// TypeChip and the backdrops) so future treatments reuse identity, typography
// and layout instead of duplicating them. `stadium` and `premium` are one
// family: premium adds the accent hairline, floodlight cones and slightly
// stronger atmosphere.

import { resolveTeam, TBD_TEAM, type TeamIdentity } from '@/data/teams'

export type MatchVisualVariant = 'featured' | 'default' | 'compact'

export type MatchVisualStyle = 'clean' | 'stadium' | 'tactical' | 'compact' | 'premium'

export interface MatchVisualProps {
  homeTeam?: string
  awayTeam?: string
  competition?: string
  season?: string
  stage?: string
  score?: string
  analysisType?: string
  category?: string
  featured?: boolean
  /** Optional editorial override. Authors are never required to provide it. */
  visualStyle?: string
  variant?: MatchVisualVariant
}

const STYLES: MatchVisualStyle[] = ['clean', 'stadium', 'tactical', 'compact', 'premium']

const resolveStyle = (props: MatchVisualProps, hasMatchup: boolean): MatchVisualStyle => {
  const override = props.visualStyle?.trim().toLowerCase()
  if (override && (STYLES as string[]).includes(override)) return override as MatchVisualStyle

  // Physical context wins: a compact slot always gets the compact treatment.
  if (props.variant === 'compact') return 'compact'
  // Featured context (homepage Featured Analysis slot or featured flag).
  if ((props.variant === 'featured' || props.featured) && hasMatchup) return 'premium'
  // Major tactical analysis can select the tactical treatment.
  if (/tactical/i.test(props.analysisType ?? '')) return 'tactical'
  return 'clean'
}

/* ------------------------------------------------------------------ */
/* Shared primitives                                                    */
/* ------------------------------------------------------------------ */

const nameTone = (onDark: boolean) => (onDark ? 'text-white' : 'text-gray-900 dark:text-gray-100')

const TeamBadge = ({ team }: { team: TeamIdentity }) => (
  <span
    aria-hidden="true"
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1 ring-black/10 sm:h-10 sm:w-10 sm:text-sm dark:ring-white/20"
    style={{ backgroundColor: team.accent, color: team.accentOn }}
  >
    {team.monogram}
  </span>
)

// Team name is the primary identity; the monogram badge is the supporting
// marker (a stand-in for the future flag/crest rendering).
const TeamSide = ({ team, onDark }: { team: TeamIdentity; onDark: boolean }) => (
  <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 sm:gap-2">
    <span
      className={`max-w-[10rem] text-center text-base leading-tight font-extrabold tracking-wide text-balance uppercase sm:max-w-[15rem] sm:text-2xl md:max-w-[18rem] md:text-3xl ${nameTone(onDark)}`}
    >
      {team.name}
    </span>
    <TeamBadge team={team} />
    <span
      aria-hidden="true"
      className="h-0.5 w-10 rounded-full opacity-90"
      style={{ backgroundColor: team.accent }}
    />
  </div>
)

// The score is the central anchor: isolated on a subtle scoreboard plate so
// it reads instantly without overpowering the team names.
const CenterResult = ({
  score,
  onDark,
  large,
}: {
  score?: string
  onDark: boolean
  large?: boolean
}) =>
  score ? (
    <span
      className={`shrink-0 font-extrabold tracking-tight ${
        large
          ? `rounded-xl border px-3 py-1.5 text-2xl sm:px-5 sm:py-2 sm:text-3xl md:text-4xl ${
              onDark
                ? 'border-white/15 bg-white/[0.06] text-white'
                : 'border-gray-300 bg-white/70 text-gray-900 dark:border-white/15 dark:bg-white/[0.06] dark:text-white'
            }`
          : `text-lg sm:text-xl ${nameTone(onDark)}`
      }`}
    >
      {score}
    </span>
  ) : (
    <span
      aria-hidden="true"
      className={`shrink-0 text-xs font-semibold tracking-[0.3em] uppercase sm:text-sm ${
        onDark ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'
      }`}
    >
      vs
    </span>
  )

const TypeChip = ({ label, onDark }: { label: string; onDark: boolean }) => (
  <span
    className={`max-w-full truncate rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-widest uppercase sm:text-xs ${
      onDark
        ? 'border-primary-400/30 bg-primary-500/10 text-primary-300'
        : 'border-gray-300 bg-white/60 text-gray-600 dark:border-gray-600 dark:bg-gray-900/60 dark:text-gray-300'
    }`}
  >
    {label}
  </span>
)

/* ------------------------------------------------------------------ */
/* Backdrops                                                            */
/* ------------------------------------------------------------------ */

// Dark stadium environment built from CSS gradients + inline SVG geometry:
// roofline with floodlight clusters, tiered seating stands, floodlight cones,
// a striped pitch in perspective, a horizon glow and a soft vignette for
// depth. Restrained broadcast/editorial style. Fully deterministic — no
// randomness, no images.
const StadiumBackdrop = ({ premium }: { premium: boolean }) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-linear-to-b from-gray-900 via-gray-950 to-black"
  >
    {/* floodlight glare pools */}
    <div
      className={`absolute -top-12 left-0 h-56 w-80 rounded-full bg-white blur-3xl ${
        premium ? 'opacity-15' : 'opacity-10'
      }`}
    />
    <div
      className={`absolute -top-12 right-0 h-56 w-80 rounded-full bg-white blur-3xl ${
        premium ? 'opacity-15' : 'opacity-10'
      }`}
    />
    <svg
      viewBox="0 0 1200 630"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {/* roofline */}
      <path
        d="M0 185 Q600 145 1200 185"
        stroke="#FFFFFF"
        strokeOpacity="0.1"
        strokeWidth="3"
        fill="none"
      />
      {/* tiered seating stands */}
      <path
        d="M0 212 Q600 176 1200 212"
        stroke="#FFFFFF"
        strokeOpacity="0.05"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 238 Q600 205 1200 238"
        stroke="#FFFFFF"
        strokeOpacity="0.05"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 264 Q600 234 1200 264"
        stroke="#FFFFFF"
        strokeOpacity="0.05"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 290 Q600 263 1200 290"
        stroke="#FFFFFF"
        strokeOpacity="0.045"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 316 Q600 292 1200 316"
        stroke="#FFFFFF"
        strokeOpacity="0.035"
        strokeWidth="1.5"
        fill="none"
      />
      {/* stand aisles */}
      <g stroke="#FFFFFF" strokeOpacity="0.035" strokeWidth="1.5">
        <line x1="180" y1="206" x2="168" y2="332" />
        <line x1="390" y1="190" x2="384" y2="346" />
        <line x1="600" y1="184" x2="600" y2="352" />
        <line x1="810" y1="190" x2="816" y2="346" />
        <line x1="1020" y1="206" x2="1032" y2="332" />
      </g>
      {/* floodlight clusters on the roofline */}
      <g fill="#FFFFFF" fillOpacity="0.22">
        <circle cx="150" cy="172" r="2.5" />
        <circle cx="162" cy="169" r="2.5" />
        <circle cx="174" cy="166" r="2.5" />
        <circle cx="450" cy="159" r="2.5" />
        <circle cx="462" cy="157" r="2.5" />
        <circle cx="474" cy="155" r="2.5" />
        <circle cx="726" cy="155" r="2.5" />
        <circle cx="738" cy="157" r="2.5" />
        <circle cx="750" cy="159" r="2.5" />
        <circle cx="1026" cy="166" r="2.5" />
        <circle cx="1038" cy="169" r="2.5" />
        <circle cx="1050" cy="172" r="2.5" />
      </g>
      {/* floodlight cones (premium only) */}
      {premium && (
        <g fill="#FFFFFF" fillOpacity="0.012">
          <path d="M150 175 L174 175 L360 630 L30 630 Z" />
          <path d="M450 158 L474 158 L660 630 L360 630 Z" />
          <path d="M726 158 L750 158 L840 630 L540 630 Z" />
          <path d="M1026 175 L1050 175 L1170 630 L840 630 Z" />
        </g>
      )}
      {/* pitch — base + mow stripes in perspective */}
      <path d="M140 630 L320 375 H880 L1060 630 Z" fill="#FFFFFF" fillOpacity="0.02" />
      <path d="M320 375 L880 375 L910 417 L290 417 Z" fill="#FFFFFF" fillOpacity="0.035" />
      <path d="M260 460 L940 460 L970 502 L230 502 Z" fill="#FFFFFF" fillOpacity="0.035" />
      <path d="M200 545 L1000 545 L1030 587 L170 587 Z" fill="#FFFFFF" fillOpacity="0.035" />
      {/* pitch markings */}
      <path
        d="M140 630 L320 375 H880 L1060 630 Z"
        stroke="#FFFFFF"
        strokeOpacity="0.14"
        strokeWidth="2.5"
        fill="none"
      />
      <line
        x1="230"
        y1="502"
        x2="970"
        y2="502"
        stroke="#FFFFFF"
        strokeOpacity="0.09"
        strokeWidth="2"
      />
      <ellipse
        cx="600"
        cy="502"
        rx="90"
        ry="42"
        stroke="#FFFFFF"
        strokeOpacity="0.09"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="600" cy="502" r="4" fill="#FFFFFF" fillOpacity="0.18" />
      <path
        d="M430 375 L455 428 H745 L770 375"
        stroke="#FFFFFF"
        strokeOpacity="0.08"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M545 375 L553 398 H647 L655 375"
        stroke="#FFFFFF"
        strokeOpacity="0.06"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="600" cy="416" r="2.5" fill="#FFFFFF" fillOpacity="0.14" />
      <path
        d="M495 630 L487 585 H713 L705 630"
        stroke="#FFFFFF"
        strokeOpacity="0.08"
        strokeWidth="2"
        fill="none"
      />
    </svg>
    {/* pitch horizon glow */}
    <div className="absolute inset-x-0 top-[58%] h-10 bg-white/10 blur-2xl" />
    {/* vignette — focuses the matchup and gives the darkness intentional depth */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.5)_100%)]" />
  </div>
)

const CleanBackdrop = ({ home, away }: { home: TeamIdentity; away: TeamIdentity }) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black"
  >
    <span
      className="absolute inset-y-0 left-0 w-1 opacity-80"
      style={{ backgroundColor: home.accent }}
    />
    <span
      className="absolute inset-y-0 right-0 w-1 opacity-80"
      style={{ backgroundColor: away.accent }}
    />
  </div>
)

// Top-down pitch line-work for tactical/editorial contexts (architecture only
// in Phase 1 — minimal by design).
const TacticalBackdrop = () => (
  <div aria-hidden="true" className="absolute inset-0 bg-gray-50 dark:bg-gray-900">
    <svg
      viewBox="0 0 1200 630"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-gray-900/[0.06] dark:text-white/[0.08]"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="70" y="45" width="1060" height="540" rx="6" />
        <line x1="600" y1="45" x2="600" y2="585" />
        <circle cx="600" cy="315" r="80" />
        <rect x="70" y="185" width="135" height="260" />
        <rect x="995" y="185" width="135" height="260" />
      </g>
    </svg>
  </div>
)

/* ------------------------------------------------------------------ */
/* Layouts                                                              */
/* ------------------------------------------------------------------ */

interface LayoutProps {
  home: TeamIdentity
  away: TeamIdentity
  context: string
  chipLabel?: string
  score?: string
  premium?: boolean
}

const StadiumLayout = ({ home, away, context, chipLabel, score, premium }: LayoutProps) => (
  <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-4 sm:gap-6 sm:px-8 sm:py-6 md:gap-8 md:py-8">
    {premium && (
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ backgroundImage: `linear-gradient(90deg, ${home.accent}, ${away.accent})` }}
      />
    )}
    {context && (
      <p className="max-w-full text-center text-[0.65rem] font-semibold tracking-[0.25em] text-white/70 uppercase sm:text-xs">
        {context.split(' · ').map((part, index, parts) => (
          <span key={`${part}-${index}`}>
            {part}
            {index < parts.length - 1 && <span className="text-primary-400/70"> · </span>}
          </span>
        ))}
      </p>
    )}
    <div className="flex w-full items-center justify-center gap-4 sm:gap-10 md:gap-16">
      <TeamSide team={home} onDark />
      <CenterResult score={score} onDark large />
      <TeamSide team={away} onDark />
    </div>
    {chipLabel && <TypeChip label={chipLabel} onDark />}
  </div>
)

const CleanLayout = ({ home, away, context, chipLabel, score }: LayoutProps) => (
  <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-5 sm:gap-4 sm:px-8">
    {context && (
      <p className="max-w-full text-center text-[0.65rem] font-semibold tracking-[0.25em] text-gray-500 uppercase sm:text-xs dark:text-gray-400">
        {context}
      </p>
    )}
    <div className="flex w-full items-center justify-center gap-3 sm:gap-8 md:gap-12">
      <TeamSide team={home} onDark={false} />
      <CenterResult score={score} onDark={false} />
      <TeamSide team={away} onDark={false} />
    </div>
    {chipLabel && <TypeChip label={chipLabel} onDark={false} />}
  </div>
)

const CompactLayout = ({ home, away, score }: Pick<LayoutProps, 'home' | 'away' | 'score'>) => (
  <div className="flex h-full w-full items-center justify-center gap-2 px-3 py-3 sm:gap-3 sm:px-4">
    <TeamBadge team={home} />
    <span className="min-w-0 truncate text-sm font-bold text-gray-900 sm:text-base dark:text-gray-100">
      {home.name}
    </span>
    <CenterResult score={score} onDark={false} />
    <span className="min-w-0 truncate text-right text-sm font-bold text-gray-900 sm:text-base dark:text-gray-100">
      {away.name}
    </span>
    <TeamBadge team={away} />
  </div>
)

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

const MatchVisual = (props: MatchVisualProps) => {
  const homeName = props.homeTeam?.trim()
  const awayName = props.awayTeam?.trim()

  // Not a match article (no team metadata) — nothing to render, ever.
  if (!homeName && !awayName) return null

  const home = homeName ? resolveTeam(homeName) : TBD_TEAM
  const away = awayName ? resolveTeam(awayName) : TBD_TEAM
  const hasMatchup = Boolean(homeName && awayName)
  const style = resolveStyle(props, hasMatchup)
  const context = [props.competition, props.season, props.stage].filter(Boolean).join(' · ')
  const chipLabel = props.analysisType?.trim() || props.category?.trim() || undefined
  const score = props.score?.trim() || undefined

  const matchup = score ? `${home.name} ${score} ${away.name}` : `${home.name} vs ${away.name}`
  const contextParts = [props.competition, props.season, props.stage].filter(Boolean)
  const ariaLabel = `Match graphic: ${matchup}${
    contextParts.length > 0 ? ` — ${contextParts.join(', ')}` : ''
  }`

  return (
    <div role="img" aria-label={ariaLabel} className="relative h-full w-full overflow-hidden">
      {style === 'stadium' || style === 'premium' ? (
        <>
          <StadiumBackdrop premium={style === 'premium'} />
          <StadiumLayout
            home={home}
            away={away}
            context={context}
            chipLabel={chipLabel}
            score={score}
            premium={style === 'premium'}
          />
        </>
      ) : style === 'compact' ? (
        <CompactLayout home={home} away={away} score={score} />
      ) : style === 'tactical' ? (
        <>
          <TacticalBackdrop />
          <CleanLayout
            home={home}
            away={away}
            context={context}
            chipLabel={chipLabel}
            score={score}
          />
        </>
      ) : (
        <>
          <CleanBackdrop home={home} away={away} />
          <CleanLayout
            home={home}
            away={away}
            context={context}
            chipLabel={chipLabel}
            score={score}
          />
        </>
      )}
    </div>
  )
}

export default MatchVisual
