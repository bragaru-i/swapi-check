import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CharacterPage } from './character.page'
import { Mock, vi } from 'vitest'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { useGetCharacterById } from '@/api/swapi'

// Mock API hook
vi.mock('@/api/swapi', () => ({
  useGetCharacterById: vi.fn(),
}))

// Mock react-router hooks
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: () => ({ id: '1' }),
  }
})

describe('CharacterPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state while fetching data', () => {
    ;(useGetCharacterById as Mock).mockReturnValue({
      isLoading: true,
    })

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Fetching List')).toBeInTheDocument()
  })

  it('shows error message when fetch fails', () => {
    ;(useGetCharacterById as Mock).mockReturnValue({
      isError: true,
    })

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Error fetching character 1/i)).toBeInTheDocument()
  })

  it('shows no data message when no character is found', () => {
    ;(useGetCharacterById as Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: null,
    })

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/No character found with id 1/i)
    ).toBeInTheDocument()
  })

  it('renders character data correctly when data is fetched', async () => {
    ;(useGetCharacterById as Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
      },
    })

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    )
    expect(screen.getByText('172')).toBeInTheDocument()
    expect(screen.getByText('77')).toBeInTheDocument()
    expect(screen.getByText('19BBY')).toBeInTheDocument()
  })

  it('navigates back to the previous page when "Back" button is clicked', () => {
    const navigate = vi.fn()
    ;(useNavigate as Mock).mockReturnValue(navigate)
    ;(useGetCharacterById as Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
      },
    })

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>
    )

    const backButton = screen.getByRole('button', { name: /back/i })
    fireEvent.click(backButton)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(-1)
  })
})
