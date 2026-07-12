export interface Category {
  title: string
  description: string
  href: string
  icon: 'match' | 'player' | 'tactical' | 'coaching'
}

// NOTE: These link to the existing /tags/[tag] routes so no new routing is
// introduced. Once a dedicated "category" taxonomy exists in the CMS, these
// hrefs can be swapped to point at real category pages without changing the
// component that renders them.
const categoriesData: Category[] = [
  {
    title: 'Match Analysis',
    description: 'In-depth breakdowns of key matches, moments and turning points.',
    href: '/tags/match-analysis',
    icon: 'match',
  },
  {
    title: 'Player Analysis',
    description: 'Individual performance, role and technique under the microscope.',
    href: '/tags/player-analysis',
    icon: 'player',
  },
  {
    title: 'Tactical Analysis',
    description: 'Formations, systems and the ideas that shape how teams play.',
    href: '/tags/tactical-analysis',
    icon: 'tactical',
  },
  {
    title: 'Coaching Corner',
    description: 'Practical coaching perspectives for developing players and teams.',
    href: '/tags/coaching-corner',
    icon: 'coaching',
  },
]

export default categoriesData
