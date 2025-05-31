// usePokemonList.ts
import useSWR from 'swr';
import { axiosFetcher } from '@/services/swrFetch';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
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
