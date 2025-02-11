import { useGetCharacters } from '@/api/swapi'
import { CenteredCircularProgress } from '@/components/centered-circular-progress'
import {
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  Pagination,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useCharacterList } from './use-character-list'

export function CharacterListPage() {
  const { page, setPage, setSearch, debouncedSearch, search } =
    useCharacterList()

  const { data, isLoading, isError } = useGetCharacters(page, debouncedSearch)

  if (isLoading) {
    return <CenteredCircularProgress>Fetching List</CenteredCircularProgress>
  }

  if (isError || !data) {
    return (
      <Typography
        variant='h5'
        gutterBottom
        textAlign='center'
        marginTop='6rem'
      >
        Error fetching character list
      </Typography>
    )
  }

  return (
    <>
      <TextField
        label='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        data-testid='search'
      />
      <Box
        display='grid'
        gridTemplateColumns='repeat(auto-fill, minmax(12.5rem, 1fr))'
        gap={2}
        width={'100%'}
      >
        {data?.results.length > 0 ? (
          data?.results.map((char) => (
            <Card
              key={char.url}
              sx={{ p: 2 }}
            >
              <CardContent>
                <Typography variant='h6'>{char.name}</Typography>
                <Link to={`/character/${char.url.split('/').slice(-2, -1)[0]}`}>
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            variant='h5'
            gutterBottom
            position={'absolute'}
            left='50%'
            top='50%'
            sx={{ transform: 'translate(-50%, -50%)' }}
          >
            No results found
          </Typography>
        )}
      </Box>
      {data?.results.length > 0 && (
        <Pagination
          count={Math.ceil((data?.count || 0) / 10)}
          page={page}
          onChange={(_, val) => setPage(val)}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </>
  )
}
