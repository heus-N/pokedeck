'use client';

import { useSearchParams } from 'next/navigation';
import { usePokemonFilterByName, usePokemonList, usePokemonType, usePokemonTypeById } from '@/hooks/usePokemonList';
import Home from './components/Home';
import React, { useEffect, useRef, useState } from 'react';
import { usePokemonNavigation } from '@/hooks/usePokemonNavigation';

export default function ClientHome() {
  const {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    handleFilterChange,
    pokemonQuery
  } = usePokemonNavigation();
    
  const ITEMS_PER_PAGE = 20;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get('type');
  const hasOpenedModal = useRef(false);
  const { pokemonList, pokemonListLoading, pokemonListCount, pokemonListError } = usePokemonList(offset);
  const { types } = usePokemonType();
  const isModalOpen = !!pokemonQuery;
  const selectedType = React.useMemo(() => {
    if (!typeFromUrl || types.length === 0) return null;
    return types.find(t => t.name === typeFromUrl) ?? null;
  }, [typeFromUrl, types]);

  const { pokemonTypeFilteredList, isLoadingPokemonTypeFilteredList } = usePokemonTypeById(selectedType?.id ?? null);
  const { pokemonListByName, pokemonListByNameLoading } = usePokemonFilterByName();
  const [ pokemonSearch, setPokemonSearch ] = useState('')
  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  const [ mounted, setMounted ] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShouldDisplay(true)
      }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPokemonList = selectedType?.id
    ? pokemonTypeFilteredList?.pokemon?.map(p => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      }))
    : pokemonList;

  const hasTypeFilter = !!selectedType?.id;
  const hasNameFilter = !!pokemonSearch?.length;

  const filteredListForPagination = React.useMemo(() => {
    if (!hasTypeFilter && !hasNameFilter) {
      return pokemonList;
    }

    let baseList = hasTypeFilter ? filteredPokemonList : pokemonListByName;

    if (hasNameFilter && pokemonListByName?.length && !pokemonListByNameLoading) {
      const nameFiltered = pokemonListByName.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonSearch.toLowerCase())
      );

      if (hasTypeFilter) {
        const nameSet = new Set(nameFiltered.map(p => p.name));
        return filteredPokemonList?.filter(p => nameSet.has(p.name));
      }

      return nameFiltered;
    }

    return baseList;
  }, [
    pokemonList,
    filteredPokemonList,
    pokemonListByName,
    pokemonListByNameLoading,
    selectedType,
    pokemonSearch
  ]);

  const paginatedList = React.useMemo(() => {
    // Filtro por nome com poucos resultados
    if (filteredListForPagination !== undefined && hasNameFilter && filteredListForPagination?.length <= 20) {
      return filteredListForPagination;
    }

    if (!hasNameFilter && !hasTypeFilter) {
      return filteredListForPagination;
    }

    return filteredListForPagination?.slice(offset, offset + ITEMS_PER_PAGE);
  }, [filteredListForPagination, offset, hasNameFilter, hasTypeFilter]);

  const lastPage = React.useMemo(() => {
    if (filteredListForPagination !== undefined && hasNameFilter && filteredListForPagination?.length <= 20) {
      return 1;
    }

    if (hasTypeFilter || hasNameFilter) {
      return Math.ceil((filteredListForPagination?.length ?? 0) / ITEMS_PER_PAGE);
    }

    return pokemonListCount ? Math.ceil(pokemonListCount / ITEMS_PER_PAGE) : 1;
  }, [filteredListForPagination, hasNameFilter, hasTypeFilter, pokemonListCount]);

  const selectedPokemon = paginatedList?.find(p => p.name === pokemonQuery) || null

  useEffect(() => {
    if (hasOpenedModal.current) return;
    if (!pokemonQuery || !filteredPokemonList?.length) return;

    const match = filteredPokemonList.find((p) => p.name === pokemonQuery);
    if (match) {
      handleOpenModal(match);
      hasOpenedModal.current = true;
    }
  }, [pokemonQuery, filteredPokemonList]);

  
    
  return (
    <Home
      mounted={mounted}
      shouldDisplay={shouldDisplay}
      pokemonList={pokemonList}
      pokemonListLoading={pokemonListLoading}
      pokemonListError={pokemonListError}
      types={types}
      selectedType={selectedType}
      isLoadingPokemonTypeFilteredList={isLoadingPokemonTypeFilteredList}
      pokemonSearch={pokemonSearch}
      setPokemonSearch={setPokemonSearch}
      handlePageChange={handlePageChange}
      handleFilterChange={handleFilterChange}
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      selectedPokemon={selectedPokemon}
      paginatedList={paginatedList}
      currentPage={currentPage}
      handleOpenModal={handleOpenModal}
      lastPage={lastPage}
    />
  );
}
