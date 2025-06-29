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

interface PokemonTypeResponse {
  count: number;
  results: { name: string; url: string }[];
}

export function usePokemonType() {
  const { data, error, isLoading } = useSWR<PokemonTypeResponse>(`/type`, axiosFetcher);

  return {
    data: data?.results || [],
    isLoading,
    isError: error,
    count: data?.count,
  };
}


interface EvolutionChain {
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface PokemonSpecieResponse {
  id: number;
  evolution_chain: EvolutionChain;
  evolves_from_species: { name: string; url: string } | null;
  flavor_text_entries: FlavorTextEntry[];
  habitat: { name: string } | null;
}

export function usePokemonSpecie(id: string | undefined) {
  const shouldFetch = !!id && isNaN(Number(id));

  console.log('shouldFetch', shouldFetch)
  console.log('id', id)

  const { data, error, isLoading } = useSWR<PokemonSpecieResponse>(shouldFetch ? `/pokemon-species/${id}` : null, axiosFetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

interface EvolutionDetail {}

interface EvolutionChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[]; // Recursão
}

export interface PokemonEvolutionChainResponse {
  id: string;
  chain: EvolutionChainLink;
}

export function usePokemonEvolutionChain(id: string) {
  const { data, error, isLoading } = useSWR<PokemonEvolutionChainResponse>(`/evolution-chain/${id}`, axiosFetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}