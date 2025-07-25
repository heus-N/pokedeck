'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pokemon } from '@/types/pokemon';
import { useCallback } from 'react';

export function usePokemonNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page') ?? '1';
  const pokemonQuery = searchParams.get('pokemon');
  const currentPage = parseInt(pageParam, 10) || 1;

  const updateParams = useCallback((updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    updater(params);
    const queryString = params.toString()
      .replace(/\s+/g, '')
      .replace(/([^=&]+)=(&|$)/g, '$1$2');
    router.push(queryString ? `?${queryString}` : '', { scroll: false });
  }, [router, searchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    updateParams(params => params.set('page', String(newPage)));
  }, [updateParams]);

  const handleOpenModal = useCallback((pokemon: Pokemon) => {
    updateParams(params => {
      params.set('pokemon', pokemon.name);
      if (!params.has('page')) params.set('page', '1');
    });
  }, [updateParams]);

  const handleCloseModal = useCallback(() => {
    updateParams(params => params.delete('pokemon'));
  }, [updateParams]);

  const handleFilterChange = useCallback((type: string | null, resetPage = true) => {
    updateParams(params => {
      if (resetPage) params.set('page', '1');
      type ? params.set('type', type) : params.delete('type');
    });
  }, [updateParams]);

  return {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    handleFilterChange,
    pokemonQuery
  };
}