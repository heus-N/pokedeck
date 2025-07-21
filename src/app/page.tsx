'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonFilterByName, usePokemonList, usePokemonType, usePokemonTypeById } from '@/hooks/usePokemonList';
import { Box, Grid, Pagination, Typography, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Fade } from '@mui/material';
import PokeballAnimation from '@/components/PokeballAnimation';
import PokeballSvg from './../../public/utils/pokeballSvg'
import { usePokemonNavigation } from '@/hooks/usePokemonNavigation';
import FilterTable from '@/components/FilterTable';
import AutoCompleteInput from '@/components/AutoCompleteInput';
import { useSearchParams } from 'next/navigation';
import ApiError from './ApiError';
import { useTranslation } from 'next-i18next';
import SelectLanguage from '@/components/SelectLanguage';
import SocialMedias from '@/components/SocialMedias';

const StyledContainer = styled.section`
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;

  .buttonContainer{
    z-index: 4;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
    top: 0;
  }

  .shadowContainer{
    z-index: 5;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
    top: 0;
  }
`
interface StyledCardContainerProps{
  $openFilter?: boolean
}

const StyledCardContainer = styled(Box)<StyledCardContainerProps>`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;

  .pokemonNotFound{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img{
      width: 200px;
      filter: drop-shadow(0px 0px 100px rgba(76, 175, 80, 1));

      @media (min-width: 600px){
        padding: 1rem 2rem;
        width: 300px;
      };

      @media (min-width: 960px){
        width: 400px;
      };
    }
  }
`

interface StyledCardGridProps {
  $isHovered: boolean;
  $shouldDisplay: boolean;
}

const StyledCardGrid = styled(Grid)<StyledCardGridProps>`
  transition: all 0.5s ease;
  transform: scale(${({ $isHovered }) => ($isHovered ? 1 : 0.975)});
  opacity: ${({ $isHovered, $shouldDisplay }) => !$shouldDisplay ? 0 : ($isHovered ? 1 : 0.85)};
`;

const StyledFooter = styled(Box)`
  position: absolute;
  bottom: 20px;
  left: calc(50% - 7px);
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 16px;
  background-color: rgba(34, 34, 133, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  
  @media (max-width: 960px){
    width: 300px;
    height: 50px;
  }
`;

interface OptionType {
  name: string;
  id: number;
}

export default function Home() {
  const {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    handleFilterChange,
    pokemonQuery
  } = usePokemonNavigation();
  const { t } = useTranslation('common');
  const ITEMS_PER_PAGE = 20;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get('type');
  const hasOpenedModal = useRef(false);
  const { pokemonList, pokemonListLoading, pokemonListCount, pokemonListError } = usePokemonList(offset);
  const { types } = usePokemonType();
  const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null);
  const [ flipped, setFlipped ] = useState(false);
  const [ flipDirection, setFlipDirection ] = useState<'forward' | 'backward'>('forward');
  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  const [ mounted, setMounted ] = useState(false);
  const isModalOpen = !!pokemonQuery;
  const selectedType = React.useMemo(() => {
    if (!typeFromUrl || types.length === 0) return null;
    return types.find(t => t.name === typeFromUrl) ?? null;
  }, [typeFromUrl, types]);

  const { pokemonTypeFilteredList, isLoadingPokemonTypeFilteredList } = usePokemonTypeById(selectedType?.id ?? null);
  const { pokemonListByName, pokemonListByNameLoading } = usePokemonFilterByName();
  const [ pokemonSearch, setPokemonSearch ] = useState('')

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

  useEffect(() => {
    if (pokemonList) {
      const timer = setTimeout(() => {
        setFlipped(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pokemonList]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShouldDisplay(true)
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if(pokemonListError){
    return shouldDisplay && <ApiError />
  }

  return (
    <StyledContainer >
      {shouldDisplay &&
        <FilterTable>
          <SelectLanguage />
          <Typography py={2} variant="h2" color="#fff">{t('filter.search')}</Typography>
          <TextField 
            value={pokemonSearch} 
            onChange={(e) => setPokemonSearch(e.target.value)}
            sx={{marginBottom: '1rem'}} 
            id="outlined-basic" 
            label={t('filter.name')}
            variant="outlined" 
            fullWidth
            autoComplete='off'
            slotProps={{ htmlInput: { maxLength: 25 } }}
          />
          <AutoCompleteInput
            iconPath="types"
            label={t('filter.type')}
            options={types.filter((type: OptionType) => type.name !== 'stellar' && type.name !== 'unknown')}
            onChange={(newValue) => {
              handlePageChange(1); // reseta a página
              handleFilterChange(newValue?.name ?? null); // atualiza a URL
            }}
            value={selectedType}
          />
          <SocialMedias />
        </FilterTable>}
      {shouldDisplay &&
        <div
         style={{
            position: 'absolute',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
        >
          <PokeballSvg shouldDisplay={shouldDisplay}/>
        </div>
      }
      <PokemonModal open={shouldDisplay && isModalOpen} handleClose={handleCloseModal} pokemon={selectedPokemon} />
        <StyledCardContainer>
          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100%',
              padding: '4rem 3rem',
            }}
          >
          <PokeballAnimation />
          {shouldDisplay && paginatedList?.length 
            ? paginatedList?.map((pokemon, index) => (
              <StyledCardGrid 
                $shouldDisplay={shouldDisplay}
                key={pokemon?.name}
                className="poke-card"
                $isHovered={hoveredIndex === null || hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}>
                  <PokemonCard
                    page={currentPage}
                    index={index}
                    flipped={flipped}
                    url={pokemon?.url}
                    pokemon={pokemon}
                    onClick={() => handleOpenModal(pokemon)}
                    flipDirection={flipDirection}
                  />
              </StyledCardGrid>
            )) :
            (shouldDisplay && !pokemonListLoading && !isLoadingPokemonTypeFilteredList &&
              <Fade in={mounted}>
                <div className='pokemonNotFound'>
                  <Typography color='#fff' variant='h1'>{t('page.pokemonNotFound')}</Typography>
                  <img src="/utils/backgrounds/pokemonNotFound.png/" alt='pokemon not found'/>
                </div>
              </Fade>)}
          </Grid>
        </StyledCardContainer>
      {shouldDisplay && 
        <Fade in={!pokemonListLoading}>
          <StyledFooter>
            <Pagination
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#fff',
                },
              }}
              count={lastPage}
              page={currentPage}
              siblingCount={0}
              boundaryCount={1} 
              onChange={(event, value) => {
                if (value === currentPage) return;
                setFlipDirection(value > currentPage ? 'forward' : 'backward');
                // setFlipped(true);
                handlePageChange(value);
              }}
            />
          </StyledFooter>
        </Fade>}
    </StyledContainer>
  );
}
