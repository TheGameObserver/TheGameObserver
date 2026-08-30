import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  // CMS-ready: the featured article is selected by `featured: true` in the
  // article's frontmatter, falling back to the most recent article when no
  // article is marked featured. Main/FeaturedArticle renders nothing while no
  // published content exists.
  const featuredPost = posts.find((post) => post.featured) ?? posts[0] ?? null

  return <Main posts={posts} featuredPost={featuredPost} />
}
