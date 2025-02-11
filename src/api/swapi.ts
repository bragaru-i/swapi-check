import { useQuery, UseQueryResult } from 'react-query'

const API_URL = 'https://swapi.dev/api/people/'

export type Character = {
    name: string
    height: string
    mass: string
    url: string
    id: string
    birth_year: string
}

type CharactersResponse = {
    count: number
    next: string | null
    previous: string | null
    results: Character[]
}

export const fetchCharacters = async (
    page: number,
    search: string
): Promise<CharactersResponse> => {
    const url = `${API_URL}?page=${page}&search=${search}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch characters')
    return res.json()
}

export const useGetCharacters = (
    page: number,
    search: string
): UseQueryResult<CharactersResponse> => {
    return useQuery(['characters', page, search], () =>
        fetchCharacters(page, search)
    )
}

export const fetchCharacter = async (id: string): Promise<Character> => {
    const url = `${API_URL}${id}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch character')
    return res.json()
}

export const useGetCharacterById = (
    id: string
): UseQueryResult<Character> => {
    if (!id) {
        throw new Error('Failed to fetch character without ID')
    }
    return useQuery(['characters', id], () => fetchCharacter(id))
}
