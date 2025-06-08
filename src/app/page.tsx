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
}

const StyledCardGrid = styled(Grid)<StyledCardGridProps>`
  transition: all 0.5s ease;
  transform: scale(${({ $isHovered }) => ($isHovered ? 1 : 0.975)});
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0.75)};
`;

const StyledFooter = styled(Box)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 16px;
  background-color: rgba(34, 34, 133, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
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

    //VOLTAR DELAY PARA 4500 MS
  }, 100)

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
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            padding: '4rem 3rem',
          }}
        >
        {/* <PokeballAnimation /> */}
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
      {shouldDisplay && 
        <Fade in={!isLoading}>
          <StyledFooter>
            <Pagination
              sx={{
                color: '#111',
                '& .MuiPaginationItem-root': {
                  color: '#111',
                },
              }}
              count={lastPage}
              page={page}
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
