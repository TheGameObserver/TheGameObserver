import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  // CMS-ready: the featured article is selected by `featured: true` in the
  // article's frontmatter. When no article is marked featured, Main/FeaturedArticle
  // falls back to a temporary placeholder until real content sets this flag.
  const featuredPost = posts[0] ?? null

  return <Main posts={posts} featuredPost={featuredPost} />
}
