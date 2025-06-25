'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pokemon } from '@/types/pokemon';

export function usePokemonNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page') ?? '1';
  const pokemonQuery = searchParams.get('pokemon');

  const currentPage = parseInt(pageParam, 10) || 1;

  function handlePageChange(newPage: number) {
    router.push(`?page=${newPage}`, { scroll: false });
  }

  function handleOpenModal(pokemon: Pokemon) {
    router.push(`?page=${currentPage}&pokemon=${pokemon.name}`, { scroll: false });
  }

  function handleCloseModal() {
    router.push(`?page=${currentPage}`, { scroll: false });
  }

  return {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    pokemonQuery // Precisamos disso para buscar o Pokémon da URL depois
  };
}
