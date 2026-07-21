import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

// Scores every other post by how many tags it shares with the current post,
// plus a bonus for matching category, then returns the top `limit` matches.
// Pure function — does not touch existing sorting/fetching logic in the
// blog page, it only runs on the already-computed post list.
export function getRelatedPosts(
  currentPost: CoreContent<Blog>,
  allPosts: CoreContent<Blog>[],
  limit = 3
): CoreContent<Blog>[] {
  const currentTags = new Set(currentPost.tags || [])

  const scored = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTags = (post.tags || []).filter((tag) => currentTags.has(tag)).length
      const sameCategory =
        currentPost.category && post.category === currentPost.category ? 1 : 0
      return { post, score: sharedTags * 2 + sameCategory }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date))

  const related = scored.map(({ post }) => post)

  // Fall back to most recent other posts if nothing shares a tag/category,
  // so the section is never empty as long as other articles exist.
  if (related.length < limit) {
    const fallback = allPosts
      .filter((post) => post.slug !== currentPost.slug && !related.includes(post))
      .slice(0, limit - related.length)
    return [...related, ...fallback].slice(0, limit)
  }

  return related.slice(0, limit)
}
