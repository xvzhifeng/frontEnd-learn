import { usePaginatePosts } from "../lib/useRequestPage"

import Post from "../components/Post"

export default function IndexPage() {
  const {
    posts,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  } = usePaginatePosts("/posts")

  if (error) return <h1>Something went wrong!</h1>
  if (!posts) return <h1>Loading...</h1>

  return (
    <div className="container">
      <h1>My Posts with useSWRInfinite</h1>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? "Loading..."
          : isReachingEnd
          ? "No more posts"
          : "Load more"}
      </button>
    </div>
  )
}