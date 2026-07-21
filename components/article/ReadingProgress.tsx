'use client'

import { useEffect, useState } from 'react'

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setProgress(pct)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="bg-primary-500 h-full rounded-full transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default ReadingProgress
