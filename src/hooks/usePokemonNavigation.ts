'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pokemon } from '@/types/pokemon';

export function usePokemonNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams?.get('page') ?? '1';
  const pokemonQuery = searchParams?.get('pokemon');
  const currentPage = parseInt(pageParam, 10) || 1;

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(newPage));
    router.push(`?${params?.toString()}`, { scroll: false });
  }

  function handleOpenModal(pokemon: Pokemon) {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('pokemon', pokemon.name);
    router.push(`?${params?.toString()}`, { scroll: false });
  }

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('pokemon');
    router.push(`?${params?.toString()}`, { scroll: false });
  }

  function handleFilterChange(type: string | null, resetPage = true) {
    const params = new URLSearchParams(searchParams?.toString());
    if (resetPage) params.set('page', '1');
    type ? params.set('type', type) : params.delete('type')
    router.push(`?${params?.toString()}`, { scroll: false });
  }



  return {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    handleFilterChange,
    pokemonQuery
  };
}
