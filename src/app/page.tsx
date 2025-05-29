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
  max-height: 90%;
`

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Pikachu',
  type: 'Elétrico',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
};


const mockPokemons: Pokemon[] = Array.from({ length: 10 }, (_, index) => ({
  ...mockPokemon,
  id: index,
  name: `Pokemon ${index + 1}`,
}));



export default function Home() {
  return (
    <StyledContainer>
      <StyledCardContainer>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            display: 'flex',
            overflowY: 'auto',
            p: 2,
          }}
        >
          {mockPokemons.map((pokemon) => (
            <Grid item xs={6} key={pokemon.id}>
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
