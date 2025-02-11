import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CharacterListPage } from './character-list.page'
import { useGetCharacters } from '@/api/swapi'
import { BrowserRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'
import { useCharacterList } from './use-character-list'
// Mock the hooks
vi.mock('@/api/swapi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/swapi')>()
  return {
    ...actual,
    useGetCharacters: vi.fn(),
  }
})

vi.mock('./use-character-list', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./use-character-list')>()
  return {
    ...actual,
    useCharacterList: vi.fn(() => ({
      page: 1,
      setPage: vi.fn(),
      search: '',
      setSearch: vi.fn(),
      debouncedSearch: '',
    })),
  }
})

// Helper function to render with BrowserRouter
const renderWithRouter = () =>
  render(
    <BrowserRouter>
      <CharacterListPage />
    </BrowserRouter>
  )

describe('CharacterListPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state', () => {
    ;(useGetCharacters as Mock).mockReturnValue({ isLoading: true })

    renderWithRouter()

    expect(screen.getByText('Fetching List')).toBeInTheDocument()
  })

  it('shows error message when fetch fails', () => {
    ;(useGetCharacters as Mock).mockReturnValue({ isError: true })

    renderWithRouter()

    expect(
      screen.getByText('Error fetching character list')
    ).toBeInTheDocument()
  })

  it('renders character list correctly', async () => {
    ;(useGetCharacters as Mock).mockReturnValue({
      data: {
        count: 1,
        results: [
          { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        ],
      },
      isLoading: false,
      isError: false,
    })

    renderWithRouter()

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    )
    expect(screen.getByText('View Details')).toBeInTheDocument()
  })

  it('shows "No results found" when there are no characters', async () => {
    ;(useGetCharacters as Mock).mockReturnValue({
      data: { count: 0, results: [] },
      isLoading: false,
      isError: false,
    })

    renderWithRouter()

    await waitFor(() =>
      expect(screen.getByText('No results found')).toBeInTheDocument()
    )
  })

  it('updates search input correctly', () => {
    // Create a mock for setSearch function
    const setSearchMock = vi.fn()

    // Mock the return value of useCharacterList
    ;(useCharacterList as Mock).mockReturnValue({
      page: 1,
      setPage: vi.fn(),
      search: '',
      setSearch: setSearchMock,
      debouncedSearch: '',
    })

    // Render the component with router (if required, adjust renderWithRouter to fit your setup)
    render(<CharacterListPage />)

    // Simulate typing in the search input field
    const input = screen.getByLabelText(/search/i) as HTMLInputElement // Use getByLabelText instead of getByTestId
    fireEvent.change(input, { target: { value: 'Luke' } })

    // Assert that setSearchMock was called with the new value
    expect(setSearchMock).toHaveBeenCalledWith('Luke')
  })
})
