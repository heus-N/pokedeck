// usePokemonList.ts
import useSWR from 'swr';
import { axiosFetcher } from '@/services/swrFetch';
import { Pokemon } from '@/types/pokemon';

interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

export function usePokemonList(offset : number) {
  const { data, error, isLoading } = useSWR<PokemonListResponse>(`/pokemon/?offset=${offset}&limit=20`, axiosFetcher);

  return {
    data: data?.results || [],
    isLoading,
    isError: error,
    count: data?.count,
  };
}

export function usePokemonById(id : string) {
  const { data, error, isLoading } = useSWR<Pokemon>(`/pokemon/${id}`, axiosFetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
}
