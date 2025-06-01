'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonById, usePokemonList } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Box, Button, Grid, IconButton, Pagination, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const StyledContainer = styled.section`
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  flex-direction: column;

  @media (min-width: 960px){
    padding: 1rem 2rem;
  }
`

const StyledCardContainer = styled(Box)`
  width: 95%;
  height: 100%;
  max-height: 90%;
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

  useEffect(() => {
    if (pokemonList) {
      const timer = setTimeout(() => {
        setFlipped(false); // gira de volta para frente com o novo conteúdo
      }, 500); // depois que os novos dados chegaram
      return () => clearTimeout(timer);
    }
  }, [page]);

  return (
    <StyledContainer>
      <PokemonModal open={open} handleClose={() => setOpen(false)} pokemon={selectedPokemon} />
      <StyledCardContainer>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            flexGrow: 1,
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '3.5rem 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {pokemonList?.map((pokemon, index) => (
            <StyledCardGrid key={pokemon?.name} 
              $isHovered={hoveredIndex === null || hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
                <PokemonCard
                  flipped={flipped}
                  url={pokemon?.url}
                  pokemon={pokemon}
                  onClick={() => {setOpen(true); setSelectedPokemon(pokemon)}}
                />
            </StyledCardGrid>
          ))}
        </Grid>
      </StyledCardContainer>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={2}>
        <Pagination 
          count={lastPage}
          page={page}
          onChange={(event, value) => {
            setFlipped(true)
            setPage(value)
          }}
        />
      </Box>

    </StyledContainer>
  );
}
