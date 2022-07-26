import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useGetPosts } from "../lib/useRequest"
import Post from "../components/Post"

export default function home() {
  const { posts, error } = useGetPosts("/posts")

  if (error) return <h1>Something went wrong!</h1>
  if (!posts) return <h1>Loading...</h1>

  return (
    <div className="container">
      <h1>My Posts</h1>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}
