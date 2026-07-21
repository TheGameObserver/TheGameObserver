import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'

interface AuthorBioProps {
  authorDetails: CoreContent<Authors>[]
}

const socialLinks = (author: CoreContent<Authors>) =>
  [
    author.twitter && { label: 'X', href: author.twitter },
    author.bluesky && { label: 'Bluesky', href: author.bluesky },
    author.linkedin && { label: 'LinkedIn', href: author.linkedin },
    author.github && { label: 'GitHub', href: author.github },
  ].filter(Boolean) as { label: string; href: string }[]

const AuthorBio = ({ authorDetails }: AuthorBioProps) => {
  if (!authorDetails || authorDetails.length === 0) return null

  return (
    <div className="mt-10 space-y-6 border-t border-gray-200 pt-8 dark:border-gray-700">
      {authorDetails.map((author) => (
        <div
          key={author.name}
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-6 sm:flex-row sm:items-start dark:border-gray-700"
        >
          {author.avatar && (
            <Image
              src={author.avatar}
              width={64}
              height={64}
              alt={author.name}
              className="h-16 w-16 shrink-0 rounded-full"
            />
          )}
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              Written by
            </p>
            <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
              {author.name}
            </h3>
            {(author.occupation || author.company) && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {author.occupation}
                {author.occupation && author.company ? ' · ' : ''}
                {author.company}
              </p>
            )}
            {author.bio && (
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {author.bio}
              </p>
            )}
            {socialLinks(author).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4">
                {socialLinks(author).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AuthorBio
