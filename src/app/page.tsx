'use client'

import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { usePokemonList } from '@/hooks/usePokemonList';
import { Box, Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from '@mui/material';
import PokeballAnimation from '@/components/PokeballAnimation';
import PokeballSvg from '../../public/utils/pokeballSvg';
import { usePokemonNavigation } from '@/hooks/usePokemonNavigation';
import FilterTable from '@/components/FilterTable';
import { motion } from 'framer-motion';

const jewelColors = [
  '#ee102eff', // Rubi
  '#50C878', // Esmeralda
  '#9966CC', // Ametista
  '#0F52BA', // Safira
  '#FFC87C'  // Topázio
];

interface StyledFilterProps {
  $shadowColor: string;
}

const StyledContainer = styled.section<StyledFilterProps>`
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;

  .buttonContainer{
    z-index: 4;
    position: absolute;
    width: 100%;
    height: 100%;
    // filter: drop-shadow(0px 3px 6px ${({ $shadowColor }) => $shadowColor});
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
    top: 0;
  }

  .shadowContainer{
    z-index: 5;
    position: absolute;
    width: 100%;
    height: 100%;
    // filter: drop-shadow(0px 3px 6px ${({ $shadowColor }) => $shadowColor});
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
    top: 0;
  }
`
interface StyledCardContainerProps{
  $openFilter?: boolean
}

const ClipPathButton1 = styled.span`
  position: absolute;
  right: -27px;
  top: 50%;
  transform: translateY(-50%);
  height: 170px;
  transition: all 1s ease;

  border: 27px solid;
  border-image: linear-gradient(180deg, #7f7f7f, #cfcfcf, #ffffff, #cfcfcf, #7f7f7f) 1;

  clip-path: polygon(
    50% 0%,
    calc(100% - 15px) calc(0% + 35px),
    calc(100% - 15px) calc(50% - 15px),
    calc(100% - 10px) 50%,
    calc(100% - 15px) calc(50% + 15px),
    calc(100% - 15px) calc(100% - 35px),
    50% 100%,
    50% calc(50% + 15px),
    calc(50% - 5px) 50%,
    50% calc(50% - 15px)
  );
`

const ClipPathButton2 = styled(ClipPathButton1)`
  border-image: linear-gradient(180deg, #b8860b , #ffd700  , #fff8dc , #ffd700  , #b8860b ) 1;

  clip-path: polygon(
    calc(50% + 3px) calc(0% + 15px),
    calc(100% - 18px) calc(0% + 35px),
    calc(100% - 18px) calc(50% - 15px),
    calc(100% - 13px) 50%,
    calc(100% - 18px) calc(50% + 15px),
    calc(100% - 18px) calc(100% - 35px),
    calc(50% + 3px) calc(100% - 15px),
    calc(50% + 3px) calc(50% + 15px),
    calc(50% - 2px) 50%,
    calc(50% + 3px) calc(50% - 15px)
  );
`

const Jewel = styled.span<StyledFilterProps>`
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 100%;
  width: 12px;
  height: 20px;
  z-index: 2;
  background: radial-gradient(
    white,
    ${({ $shadowColor }) => $shadowColor} 70%,
    black 200%
  );
   
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
`

const StyledCardContainer = styled(Box)<StyledCardContainerProps>`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;

  opacity: ${({$openFilter}) => $openFilter ? 0.75 : 1};
  scale: ${({$openFilter}) => $openFilter ? 0.99 : 1}
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
  const {
    currentPage,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    pokemonQuery
  } = usePokemonNavigation();

  const offset = (currentPage - 1) * 20;

  const { data: pokemonList, isLoading, isError, count } = usePokemonList(offset);
  const selectedPokemon = pokemonList?.find(p => p.name === pokemonQuery) || null;
  const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null);
  const lastPage = count && Math.floor(count / 20) + 1
  const [ flipped, setFlipped ] = useState(false);
  const [ flipDirection, setFlipDirection ] = useState<'forward' | 'backward'>('forward');
  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  const isModalOpen = !!pokemonQuery;
  const [ openFilter, setOpenFilter ] = useState(false)
  
const jewelColor = openFilter 
  ? jewelColors[Math.floor(Math.random() * jewelColors.length)] 
  : 'rgba(128, 128, 128, 0.5)';

  
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

  return (
    <StyledContainer $shadowColor={jewelColor}>
      {shouldDisplay &&
        <FilterTable onMouseEnter={() => setOpenFilter(true)} onMouseLeave={() => setOpenFilter(false)}>
          <div className='buttonContainer' >
            <ClipPathButton1/>
            <div className='shadowContainer'>
              {/* <Jewel $shadowColor={jewelColor}/> */}
              <ClipPathButton2 />
            </div>
          </div>
      </FilterTable>}
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
      <PokemonModal open={shouldDisplay && isModalOpen} handleClose={handleCloseModal} pokemon={selectedPokemon} />
        <StyledCardContainer $openFilter={openFilter}>
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
                  page={currentPage}
                  index={index}
                  flipped={flipped}
                  url={pokemon?.url}
                  pokemon={pokemon}
                  onClick={() => handleOpenModal(pokemon)}
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
              page={currentPage}
              siblingCount={0}
              boundaryCount={1} 
              onChange={(event, value) => {
                if (value === currentPage) return;
                setFlipDirection(value > currentPage ? 'forward' : 'backward');
                // setFlipped(true);
                handlePageChange(value);
              }}
            />
          </StyledFooter>
        </Fade>}
    </StyledContainer>
  );
}
