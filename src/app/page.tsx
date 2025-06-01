'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonById, usePokemonList } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Box, Button, Grid, IconButton, Skeleton, Typography } from '@mui/material';
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
  border: 1px solid red;
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
  border: 1px solid blue;
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
  const [ offsetPage, setOffsetPage ] = useState(0)
  const { data, isLoading, isError, count } = usePokemonList(offsetPage);
  const [ pokemonList, setPokemonList ] = useState<{ name: string; url: string }[]>()
  const [ selectedPokemon, setSelectedPokemon ] = useState<Pokemon | null>(null);
  const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null);
  const [ page, setPage ] = useState(1)
  const lastPage = count && Math.floor(count / 20) + 1

  useEffect(() => {
    if(data){
      setPokemonList(data)

    }
  }, [data])

  const handleNextPage = () => {
    if (lastPage && page < lastPage) {
      setPage(prev => prev + 1);
      setOffsetPage((page + 1 - 1) * 20); // equivalente a (page) * 20
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      setOffsetPage((page - 1 - 1) * 20);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
    setOffsetPage(0);
  };

  const handleLastPage = () => {
    if (lastPage) {
      setPage(lastPage);
      setOffsetPage((lastPage - 1) * 20);
    }
  };

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
          {pokemonList?.map((pokemon, index) => (
            <StyledCardGrid key={pokemon?.name} 
              $isHovered={hoveredIndex === null || hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <PokemonCard
                url={pokemon?.url}
                pokemon={pokemon}
                onClick={() => {setOpen(true); setSelectedPokemon(pokemon)}}
              />
            </StyledCardGrid>
          ))}
        </Grid>
      </StyledCardContainer>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={2}>
        <IconButton onClick={handleFirstPage} disabled={page <= 1}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handlePreviousPage} disabled={page <= 1}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography>{page < 10 ? `0${page}` : page} / {lastPage}</Typography>
        <IconButton onClick={handleNextPage} disabled={page === lastPage}>
          <NavigateNextIcon />
        </IconButton>
        <IconButton onClick={handleLastPage} disabled={page === lastPage}>
          <LastPageIcon />
        </IconButton>
      </Box>

    </StyledContainer>
  );
}
