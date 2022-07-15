import useSWRInfinite from 'swr/infinite'

const fetcher = url => fetch(url).then(res => res.json())
const baseUrl = "https://jsonplaceholder.typicode.com"

export const usePaginatePosts = path => {
    if (!path) {
        throw new Error("Path is required")
    }

    const url = baseUrl + path
    const PAGE_LIMIT = 5

    const { data, error, size, setSize } = useSWRInfinite(
        index => `${url}?_page=${index + 1}&_limit=${PAGE_LIMIT}`
    )

    const posts = data ? [].concat(...data) : []
    const isLoadingInitialData = !data && !error
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined")
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT)

    return { posts, error, isLoadingMore, size, setSize, isReachingEnd }
}