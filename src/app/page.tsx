'use client'

import PokemonCard from '@/components/PokemonCard';
import { Pokemon } from '@/types/pokemon';
import { Box, Grid } from '@mui/material';
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

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Pikachu',
  type: 'Elétrico',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
};


const mockPokemons: Pokemon[] = Array.from({ length: 11 }, (_, index) => ({
  ...mockPokemon,
  id: index,
  name: `Pokemon ${index + 1}`,
}));



export default function Home() {
  return (
    <StyledContainer>
      <StyledCardContainer>
        {/* <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{
            maxHeight: '100%',
            overflowY: 'auto',
            p: 2,
            border: '1px solid red',
          }}
        >
          {mockPokemons.map((pokemon) => (
            <Grid size={3} key={pokemon.id}>
              <PokemonCard
                pokemon={pokemon}
                onClick={() => console.log('Clicou em:', pokemon.name)}
              />
            </Grid>
          ))}
        </Grid> */}
        <Grid container spacing={2}
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
          {mockPokemons.map((pokemon) => (
            <Grid size={3} key={pokemon.id}>
              <PokemonCard
                pokemon={pokemon}
                onClick={() => console.log('Clicou em:', pokemon.name)}
              />
            </Grid>
          ))}
        </Grid>
      </StyledCardContainer>
    </StyledContainer>
  );
}
