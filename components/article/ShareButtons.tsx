'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — fail silently, no crash for the user.
    }
  }

  const links = [
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
        Share
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={`Share on ${link.label}`}
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy article link"
          className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}

export default ShareButtons
