export interface Category {
  title: string
  description: string
  href: string
  icon: 'trophy' | 'shield' | 'player' | 'tactical'
}

// Discovery cards for the homepage "Explore Football" section. Each card links
// to an existing FootballMetadata taxonomy route (competitions, teams, players
// and tactical topics) derived from article frontmatter — no new taxonomy.
const categoriesData: Category[] = [
  {
    title: 'Competitions',
    description: 'Analysis organised by competition, from World Cup nights to league campaigns.',
    href: '/competitions',
    icon: 'trophy',
  },
  {
    title: 'Teams',
    description: 'How teams are built, how they play and what their matches reveal.',
    href: '/teams',
    icon: 'shield',
  },
  {
    title: 'Players',
    description: 'Individual performances, roles and the details behind key moments.',
    href: '/players',
    icon: 'player',
  },
  {
    title: 'Tactical Topics',
    description: 'The concepts that shape the modern game, from pressing to rest defence.',
    href: '/tactical-topics',
    icon: 'tactical',
  },
]

export default categoriesData
