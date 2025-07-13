// usePokemonList.ts
import useSWR from 'swr';
import { axiosFetcher } from '@/services/swrFetch';
import { Pokemon, PokemonAbilities } from '@/types/pokemon';
import api from '@/services/api';
import { getEvolutions } from '../../public/utils/helpers/getEvolutions';
import { getAbilitiesIds } from '../../public/utils/helpers/getAbilities';

interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

export function usePokemonList(offset : number) {
  const { data, error, isLoading } = useSWR<PokemonListResponse>(`/pokemon/?offset=${offset}&limit=20`, axiosFetcher);

  return {
    pokemonList: data?.results || [],
    pokemonListLoading: isLoading,
    pokemonListError: error,
    pokemonListCount: data?.count,
  };
}

export function usePokemonById(id : string) {
  const { data, error, isLoading } = useSWR<Pokemon>(`/pokemon/${id}`, axiosFetcher);

  const primaryType = data?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';
  const abilityIds = getAbilitiesIds(data?.abilities)

  return {
    findPokemonById: data,
    isLoadingPokemon: isLoading,
    isError: error,
    primaryType,
    abilityIds
  };
}

export function useMultiplePokemonByIds(ids: string[]) {
  const shouldFetch = ids && ids.length > 0;

  const { data, error, isLoading } = useSWR<Pokemon[]>(
    shouldFetch ? ['multiple-pokemon', ...ids] : null,
    async () => {
      const responses = await Promise.all(
        ids.map(id => api.get(`/pokemon/${id}`)) // reaproveita sua instância `api`
      );
      return responses.map(res => res.data);
    }
  );

  return {
    evolutionPokemons: data,
    evolutionisLoading: isLoading,
    isError: error,
  };
}

interface PokemonTypeResponse {
  count: number;
  next: string;
  results: { name: string; url: string }[];
}

export function usePokemonType() {
  const { data, error, isLoading } = useSWR<PokemonTypeResponse>(`/type`, axiosFetcher);

  const mappedTypes = data?.results?.map((t) => {
    const id = parseInt(t.url.split('/').filter(Boolean).pop() || '0');
    return {
      name: t.name,
      id,
    };
  }) ?? [];

  return {
    pokemonTypeList: data,
    types: mappedTypes, 
    isTypeLoading: isLoading,
    isError: error,
    count: data?.count,
  };
}


interface PokemonEntry {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

interface PokemonTypeByIdResponse {
  id: number;
  name: string;
  pokemon: PokemonEntry[];
}


export function usePokemonTypeById(id: number | null) {
  const shouldFetch = id !== null;

  const { data, error, isLoading } = useSWR<PokemonTypeByIdResponse>(
    shouldFetch ? `/type/${id}` : null,
    axiosFetcher
  );

  return {
    pokemonTypeFilteredList: data,
    isLoading,
    isError: error,
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

export function usePokemonSpecie(species: any | undefined) {
  const rawId = species?.url?.split('/pokemon-species')[1]
  const cleanId = rawId?.replace('/', '')
  const shouldFetch = !!cleanId;

  const { data, error, isLoading } = useSWR<PokemonSpecieResponse>(shouldFetch ? `/pokemon-species/${cleanId}` : null, axiosFetcher);

  const evolutionChainUrl = data?.evolution_chain?.url;
  const evolutionChainId = evolutionChainUrl?.split('evolution-chain/')[1];

  return {
    pokemonSpecie: data,
    isLoading,
    isError: error,
    evolutionChainId
  };
}

interface EvolutionDetail {
  min_level?: number;
}

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

  const evolutionIds = getEvolutions(data?.chain)
  
  return {
    pokemonEvolutionChain: data,
    isLoading,
    isError: error,
    evolutionIds
  };
}

export function usePokemonAbility(ids: string[]) {
  const shouldFetch = ids && ids.length > 0;

  const { data, error, isLoading } = useSWR<PokemonAbilities[]>(
    shouldFetch ? ['multiple-pokemon', ...ids] : null,
    async () => {
      const responses = await Promise.all(
        ids.map(id => api.get(`/ability/${id}`)) // reaproveita sua instância `api`
      );
      return responses.map(res => res.data);
    }
  );

  return {
    pokemonAbility: data,
    loadingPokemonAbility: isLoading,
    isError: error,
  };
}