'use client'

import PokemonCard from '@/components/PokemonCard';
import { Pokemon } from '@/types/pokemon';
import { Typography, Container } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  display: flex;
  border: '1px solid red';
`

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Pikachu',
  type: 'Elétrico',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
};

export default function Home() {
  return (
    <StyledContainer >
      <PokemonCard pokemon={mockPokemon} onClick={() => console.log('Clicou em: pokemon')}/>
    </StyledContainer>
  );
}
