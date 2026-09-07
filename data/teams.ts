// TGO Team Identity Registry
//
// Centralised football team identity used by the Match Visual system
// (components/football/MatchVisual.tsx). Articles supply raw team strings
// (e.g. "Spain", "ESP"); this registry resolves them to a canonical identity
// with display data and visual values.
//
// Scope: intentionally NOT a database of world football. Add teams as content
// requires — the shape below is designed to grow (aliases, team types for
// nations/clubs/youth/women's teams, and future flag/crest keys).
//
// There are no flag/crest assets in public/ yet, so visuals render monograms.
// `flagKey` reserves the hook for local/inline flag assets later without
// requiring any change to MatchVisual.

export type TeamType = 'nation' | 'club' | 'youth' | 'womens' | 'unknown'

export interface TeamIdentity {
  /** Canonical display name, e.g. "Spain" */
  name: string
  /** Alternative names that resolve to this identity (codes, nicknames) */
  aliases: string[]
  /** Team classification — drives future flag (nation) vs crest (club) rendering */
  type: TeamType
  /** Short monogram rendered until a real flag/crest asset exists */
  monogram: string
  /** Primary identity colour (flag/club colour) used for badges and accents */
  accent: string
  /** Text colour with sufficient contrast when placed on `accent` */
  accentOn: string
  /** Reserved key for a future LOCAL flag/crest asset (see file header) */
  flagKey?: string
}

/** Neutral grey used for unknown teams and placeholders. */
const NEUTRAL_ACCENT = '#4B5563'

/**
 * Generate a two-letter monogram from an arbitrary team name (initials of the
 * first two words, diacritics stripped) so unknown teams still look
 * intentional.
 */
export function monogramFor(name: string): string {
  const words = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) return '??'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return `${words[0][0]}${words[1][0]}`.toUpperCase()
}

/** Locale/diacritic-insensitive key used for registry matching. */
const normalizeKey = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

const registry: TeamIdentity[] = [
  {
    name: 'Spain',
    aliases: ['ESP', 'La Roja'],
    type: 'nation',
    monogram: 'ES',
    accent: '#C60B1E',
    accentOn: '#FFFFFF',
    flagKey: 'es',
  },
  {
    name: 'France',
    aliases: ['FRA', 'Les Bleus'],
    type: 'nation',
    monogram: 'FR',
    accent: '#0055A4',
    accentOn: '#FFFFFF',
    flagKey: 'fr',
  },
]

const lookup = new Map<string, TeamIdentity>()
for (const team of registry) {
  lookup.set(normalizeKey(team.name), team)
  for (const alias of team.aliases) lookup.set(normalizeKey(alias), team)
}

/** Placeholder identity used when a side of the matchup is missing entirely. */
export const TBD_TEAM: TeamIdentity = {
  name: 'TBD',
  aliases: [],
  type: 'unknown',
  monogram: '?',
  accent: NEUTRAL_ACCENT,
  accentOn: '#FFFFFF',
}

/**
 * Resolve an article team string into a canonical identity.
 *
 * Never throws and never returns undefined: unknown teams receive a neutral
 * fallback identity (generated monogram, original display name preserved), so
 * content is never blocked on registry coverage.
 */
export function resolveTeam(name?: string): TeamIdentity {
  const trimmed = name?.trim()
  if (!trimmed) return { ...TBD_TEAM, name: '' }

  const match = lookup.get(normalizeKey(trimmed))
  if (match) return match

  return {
    name: trimmed,
    aliases: [],
    type: 'unknown',
    monogram: monogramFor(trimmed),
    accent: NEUTRAL_ACCENT,
    accentOn: '#FFFFFF',
  }
}
