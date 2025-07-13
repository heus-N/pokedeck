'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonList, usePokemonType, usePokemonTypeById } from '@/hooks/usePokemonList';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from '@mui/material';
import PokeballAnimation from '@/components/PokeballAnimation';
import PokeballSvg from '../../public/utils/pokeballSvg';
import { usePokemonNavigation } from '@/hooks/usePokemonNavigation';
import FilterTable from '@/components/FilterTable';
import { motion } from 'framer-motion';
import AutoCompleteInput from '@/components/AutoCompleteInput';


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

  opacity: ${({$openFilter}) => $openFilter ? 0.75 : 1};
  scale: ${({$openFilter}) => $openFilter ? 0.99 : 1}
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


export default function Home() {
  const {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    pokemonQuery
  } = usePokemonNavigation();

  const offset = (currentPage - 1) * 20;

  const { pokemonList, pokemonListLoading, pokemonListCount } = usePokemonList(offset);
  const { types } = usePokemonType();
  const selectedPokemon = pokemonList?.find(p => p.name === pokemonQuery) || null;
  const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null);
  const lastPage = pokemonListCount && Math.floor(pokemonListCount / 20) + 1
  const [ flipped, setFlipped ] = useState(false);
  const [ flipDirection, setFlipDirection ] = useState<'forward' | 'backward'>('forward');
  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  const isModalOpen = !!pokemonQuery;
  const [ openFilter, setOpenFilter ] = useState(false)
  const [ selectedType, setSelectedType ] = useState<{ name: string; id: number } | null>(null);
  const { pokemonTypeFilteredList } = usePokemonTypeById(selectedType?.id ?? null);
  
  const filteredPokemonList = selectedType?.id 
    ? pokemonTypeFilteredList?.pokemon?.map(p => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      }))
    : pokemonList;

  // console.log('pokemonList', pokemonList)
  console.log('pokemonTypeFilteredList', pokemonTypeFilteredList)

  useEffect(() => {
    if (pokemonList) {
      const timer = setTimeout(() => {
        setFlipped(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pokemonList]);

  useEffect(() => {
    const timer = setTimeout(() => setShouldDisplay(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledContainer >
      {shouldDisplay &&
        <FilterTable>
          <Typography py={2} variant="h2" color="#fff">Buscar:</Typography>
          <AutoCompleteInput
            label="Tipo"
            options={types}
            onChange={(newValue) => setSelectedType(newValue)}
            value={selectedType}
          />
          <AutoCompleteInput
            label="Nivel de evolução"
            options={[]}
          />
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
        <StyledCardContainer $openFilter={openFilter}>
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
          {shouldDisplay && filteredPokemonList?.map((pokemon, index) => (
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
          ))}
          </Grid>
        </StyledCardContainer>
      {shouldDisplay && 
        <Fade in={!pokemonListLoading}>
          <StyledFooter>
            <Pagination
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#111',
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
