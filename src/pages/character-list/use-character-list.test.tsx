import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DEBOUNCED_SEARCH_MS, useCharacterList } from './use-character-list'

vi.useFakeTimers()

describe('useCharacterList', () => {
    const renderUseCharacterList = (initialEntries: string[] = ['/']) =>
        renderHook(() => useCharacterList(), {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
            ),
        })

    test('should initialize with default values', () => {
        const { result } = renderUseCharacterList()
        expect(result.current.search).toBe('')
        expect(result.current.debouncedSearch).toBe('')
        expect(result.current.page).toBe(1)
    })

    test('should update search query and debounce correctly', () => {
        const { result } = renderUseCharacterList()

        act(() => {
            result.current.setSearch('Luke')
        })

        expect(result.current.search).toBe('Luke')
        expect(result.current.debouncedSearch).toBe('')

        act(() => {
            vi.advanceTimersByTime(DEBOUNCED_SEARCH_MS)
        })

        expect(result.current.debouncedSearch).toBe('Luke')
    })

    test('should reset page when search changes', () => {
        const { result } = renderUseCharacterList(['/characters?page=5'])

        act(() => {
            result.current.setSearch('Vader')
        })

        act(() => {
            vi.advanceTimersByTime(DEBOUNCED_SEARCH_MS)
        })

        expect(result.current.page).toBe(1)
    })
})
