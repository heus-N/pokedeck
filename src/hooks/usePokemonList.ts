// usePokemonList.ts
import useSWR from 'swr';
import { axiosFetcher } from '@/services/swrFetch';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export function usePokemonList() {
  const { data, error, isLoading } = useSWR<PokemonListResponse>(`/pokemon`, axiosFetcher);

  return {
    pokemonList: data?.results || [],
    isLoading,
    isError: error,
    nextPage: data?.next,
    previousPage: data?.previous,
  };
}
