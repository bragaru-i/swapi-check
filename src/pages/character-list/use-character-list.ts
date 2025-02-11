import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const DEBOUNCED_SEARCH_MS = 500
export function useCharacterList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number(searchParams.get('page')) || 1
  const searchParam = searchParams.get('people') || ''

  const [page, setPage] = useState(pageParam)
  const [search, setSearch] = useState(searchParam)
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        if (search) {
          params.set('people', search)
        } else {
          params.delete('people')
        }
        return params
      })
    }, DEBOUNCED_SEARCH_MS)

    return () => clearTimeout(timeout)
  }, [search, setSearchParams])

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      params.set('page', page.toString())
      return params
    })
  }, [page, setSearchParams])

  // reset page to 1 when search query changes
  // this will remove bug when querying people with inexistent next pages
  useEffect(() => {
    if (debouncedSearch) {
      setPage(1)
    }
  }, [debouncedSearch])

  return { debouncedSearch, page, search, setSearch, setPage }
}
