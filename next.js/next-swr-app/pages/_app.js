import '../styles/globals.css'
import useSWR, { SWRConfig } from 'swr'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
function MyApp({ Component, pageProps }) {
  return <SWRConfig
    value={{
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 3000,
      fetcher: (url) => fetch(url).then(res => res.json())
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>

}

export default MyApp
