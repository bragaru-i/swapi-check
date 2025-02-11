import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CharacterListPage } from '@/pages/character-list/character-list.page'
import { CharacterPage } from '@/pages/character/character.page'
import { Box } from '@mui/material'
import { MainLayout } from '@/components/main-layout'

export function App() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      mt={6}
    >
      <MainLayout>
        <Router>
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
