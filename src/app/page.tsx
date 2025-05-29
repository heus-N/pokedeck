'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemon } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  padding: 1rem 2rem;
  margin: 0;
  height: 100%;
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCardContainer = styled(Box)`
  border: 1px solid blue;
  width: 80%;
  height: 100%;
  max-height: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`

export default function Home() {
  
  const [open, setOpen] = useState(false)
  const [ pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const [ currentPage, setCurrentPage ] = useState();
  const [ nextPage, setNextPage ] = useState();
  const [ previousPage, setPreviousPage ] = useState();


  return (
    <StyledContainer>
      <PokemonModal open={open} handleClose={() => setOpen(false)} />
      <StyledCardContainer>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            flexGrow: 1,
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {pokemon?.map((pokemon) => (
            <Grid key={pokemon.name}>
              <PokemonCard
                pokemon={pokemon}
                onClick={() => {setOpen(true)}}
              />
            </Grid>
          ))}
        </Grid>
      </StyledCardContainer>
    </StyledContainer>
  );
}
