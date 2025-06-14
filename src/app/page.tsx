'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonList } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Box, Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from '@mui/material';
import PokeballAnimation from '@/components/PokeballAnimation';
import PokeballSvg from '../../public/utils/pokeballSvg';

const StyledContainer = styled.section`
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 10px 20px;
  flex-direction: column;
`

const StyledCardContainer = styled(Box)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
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
  const [ open, setOpen ] = useState(false)
  const [ page, setPage ] = useState(1)
  const offset = (page - 1) * 20;
  const { data: pokemonList, isLoading, isError, count } = usePokemonList(offset);
  const [ selectedPokemon, setSelectedPokemon ] = useState<Pokemon | null>(null);
  const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null);
  const lastPage = count && Math.floor(count / 20) + 1
  const [flipped, setFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [shouldDisplay, setShouldDisplay] = useState(false)

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

  console.log('pokemonList', pokemonList)

  return (
    <StyledContainer>
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
      <PokemonModal open={open} handleClose={() => setOpen(false)} pokemon={selectedPokemon} />
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
          {shouldDisplay && pokemonList?.map((pokemon, index) => (
            <StyledCardGrid 
              $shouldDisplay={shouldDisplay}
              key={pokemon?.name}
              className="poke-card"
              $isHovered={hoveredIndex === null || hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
                <PokemonCard
                  page={page}
                  index={index}
                  flipped={flipped}
                  url={pokemon?.url}
                  pokemon={pokemon}
                  onClick={() => {setOpen(true); setSelectedPokemon(pokemon)}}
                  flipDirection={flipDirection}
                />
            </StyledCardGrid>
          ))}
          </Grid>
        </StyledCardContainer>
      {shouldDisplay && 
        <Fade in={!isLoading}>
          <StyledFooter>
            <Pagination
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#111',
                },
              }}
              count={lastPage}
              page={page}
              siblingCount={0}
              boundaryCount={1} 
              onChange={(event, value) => {
                if (value === page) return;
                setFlipDirection(value > page ? 'forward' : 'backward');
                setFlipped(true);
                setPage(value);
              }}
            />
          </StyledFooter>
        </Fade>}
    </StyledContainer>
  );
}
