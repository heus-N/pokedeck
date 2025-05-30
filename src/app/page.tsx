'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonList } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  margin: 0;
  height: 100%;
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;

  @media (min-width: 960px){
    padding: 1rem 2rem;
  }
`

const StyledCardContainer = styled(Box)`
  border: 1px solid blue;
  width: 95%;
  height: 100%;
  max-height: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`

export default function Home() {
  
  const [open, setOpen] = useState(false)
  const { pokemonList, isLoading, isError, nextPage, previousPage } = usePokemonList();
  const [ selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  console.log(pokemonList)

  return (
    <StyledContainer>
      <PokemonModal open={open} handleClose={() => setOpen(false)} pokemon={selectedPokemon} />
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
          {pokemonList?.map((pokemon) => (
            <Grid key={pokemon.name}>
              <PokemonCard
                pokemon={pokemon}
                onClick={() => {setOpen(true); setSelectedPokemon(pokemon)}}
              />
            </Grid>
          ))}
        </Grid>
      </StyledCardContainer>
    </StyledContainer>
  );
}
