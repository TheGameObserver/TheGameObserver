import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Instagram, Linkedin, Mail } from '@/components/social-icons/icons'

// Official TGO contact details (see README / site contact requirements).
const contacts = [
  {
    href: 'https://www.instagram.com/thegameobserver/',
    label: 'Instagram — The Game Observer',
    text: '@thegameobserver',
    external: true,
    Icon: Instagram,
  },
  {
    href: 'https://www.linkedin.com/in/styrish-paul-09729-101999',
    label: 'LinkedIn — Styrish Paul',
    text: 'LinkedIn',
    external: true,
    Icon: Linkedin,
  },
  {
    href: 'mailto:styris.paul0729@gmail.com',
    label: 'Email — styris.paul0729@gmail.com',
    text: 'styris.paul0729@gmail.com',
    external: false,
    Icon: Mail,
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {siteMetadata.email && (
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          )}
          {siteMetadata.github && <SocialIcon kind="github" href={siteMetadata.github} size={6} />}
          {siteMetadata.facebook && (
            <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          )}
          {siteMetadata.youtube && (
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          )}
          {siteMetadata.linkedin && (
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          )}
          {siteMetadata.twitter && (
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          )}
          {siteMetadata.bluesky && (
            <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} />
          )}
          {siteMetadata.x && <SocialIcon kind="x" href={siteMetadata.x} size={6} />}
          {siteMetadata.instagram && (
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          )}
          {siteMetadata.threads && (
            <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          )}
          {siteMetadata.medium && <SocialIcon kind="medium" href={siteMetadata.medium} size={6} />}
        </div>
        <div className="mb-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSej0GnivhOk5sXtY5hNtvmnFiCltyqKLoEQceXAWLOBE1qbXQ/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact The Game Observer"
            className="bg-primary-600 hover:bg-primary-700 inline-flex w-full items-center justify-center rounded-full px-5 py-2 text-center text-sm font-semibold text-white transition-colors sm:w-auto"
          >
            Contact TGO
          </a>
        </div>
        <div className="mb-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          {contacts.map(({ href, label, text, external, Icon }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={label}
              className="inline-flex items-center gap-x-2 transition hover:text-gray-600"
            >
              <Icon aria-hidden="true" className="h-4 w-4 fill-current" />
              <span>{text}</span>
            </a>
          ))}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()} ${siteMetadata.title}`}</div>
          <div>{` · `}</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
