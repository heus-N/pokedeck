'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonList } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Box, Grid, Pagination } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Fade } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PokeballAnimation from '@/components/PokeballAnimation';

const StyledContainer = styled.section`
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 10px 20px;
  flex-direction: column;

  @media (min-width: 960px){
    padding: 2rem 3rem;
  }
`

const StyledCardContainer = styled(Box)`
  width: 95%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`

interface StyledCardGridProps {
  $isHovered: boolean;
}

const StyledCardGrid = styled(Grid)<StyledCardGridProps>`
  transition: all 0.5s ease;
  transform: scale(${({ $isHovered }) => ($isHovered ? 1 : 0.975)});
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0.75)};
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
  const pokeballRef = useRef<HTMLImageElement | null>(null);
  const [shouldDisplay, setShouldDisplay] = useState(false)

  gsap.registerPlugin(ScrollTrigger)
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pokemonList) {
      const timer = setTimeout(() => {
        setFlipped(false); // gira de volta para frente com o novo conteúdo
      }, 500); // depois que os novos dados chegaram
      return () => clearTimeout(timer);
    }
  }, [pokemonList]);

  setTimeout(() => {
    setShouldDisplay(true)
  }, 4500)

  console.log('isLoading',isLoading)

  return (
    <StyledContainer>
      <PokemonModal open={open} handleClose={() => setOpen(false)} pokemon={selectedPokemon} />
      <StyledCardContainer>
        <Grid 
          ref={gridRef}
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            flexGrow: 1,
            maxHeight: '100%',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            paddingBottom: '40px'
          }}
        >
        {/* <div style={{height: 'calc(100% + 40px)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> */}
          <PokeballAnimation />
        {/* </div> */}
        {shouldDisplay && pokemonList?.map((pokemon, index) => (
          <StyledCardGrid key={pokemon?.name} 
            $isHovered={hoveredIndex === null || hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
              <PokemonCard
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
      {shouldDisplay && <Fade in={!isLoading}>
        <Box position='absolute' bottom='0' pb='20px' gap={2} >
          <Pagination 
            count={lastPage}
            page={page}
            onChange={(event, value) => {
              setFlipDirection(value > page ? 'forward' : 'backward');
              setFlipped(true);
              setPage(value);
            }}
          />
        </Box>
      </Fade>}
    </StyledContainer>
  );
}
