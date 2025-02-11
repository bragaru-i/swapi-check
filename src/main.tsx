import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { fetchCharacters } from '@/api/swapi.ts'

// cache SWAPI for performance(anyway we get always same calls)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})
queryClient.prefetchQuery('characters', () => fetchCharacters(1, ''))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
)
