import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CharacterListPage } from '@/pages/character-list/character-list.page'
import { CharacterPage } from '@/pages/character/character.page'
import { Box } from '@mui/material'
import { MainLayout } from '@/components/main-layout'
export const BASE_URL = import.meta.env.VITE_BASE_URL

export function App() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      mt={6}
    >
      <MainLayout>
        <Router basename={BASE_URL}>
          <Routes>
            <Route
              path='/'
              element={<CharacterListPage />}
            />
            <Route
              path='/character/:id'
              element={<CharacterPage />}
            />
          </Routes>
        </Router>
      </MainLayout>
    </Box>
  )
}
