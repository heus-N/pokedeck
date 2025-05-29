import useSWR from 'swr';
import { axiosFetcher } from '@/services/swrFetch';
import { Pokemon } from '@/types/pokemon';

export function usePokemon() {
  const { data, error, isLoading } = useSWR<Pokemon>(`/pokemon`, axiosFetcher);

  return {
    pokemon: data,
    isLoading,
    isError: error,
  };
}
