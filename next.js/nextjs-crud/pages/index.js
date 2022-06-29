import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import App from './App'
import HomePage from './HomePage'

export default function Home() {
  return (
    <App >
      <HomePage></HomePage>
    </App>
  )
}
