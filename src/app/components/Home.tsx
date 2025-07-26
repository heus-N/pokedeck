
import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/PokemonModal';
import { Box, Grid, Pagination, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from '@mui/material';
import FilterTable from '@/components/FilterTable';
import AutoCompleteInput, { OptionType } from '@/components/AutoCompleteInput';
import { useTranslation } from 'next-i18next';
import SelectLanguage from '@/components/SelectLanguage';
import SocialMedias from '@/components/SocialMedias';
import ApiError from '../ApiError';
import PokeballSvg from '../../../public/utils/pokeballSvg';

const StyledContainer = styled.section`
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
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
    top: 0;
  }

  .shadowContainer{
    z-index: 5;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5));
    top: 0;
  }
`
interface StyledCardContainerProps{
  $openFilter?: boolean
}

const StyledCardContainer = styled(Box)<StyledCardContainerProps>`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  padding-left: 30px;

  @media(max-width: 600px){
    padding-bottom: 8rem;
  }

  .pokemonNotFound{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img{
      width: 200px;
      filter: drop-shadow(0px 0px 100px rgba(76, 175, 80, 1));

      @media (min-width: 600px){
        padding: 1rem 2rem;
        width: 300px;
      };

      @media (min-width: 960px){
        width: 400px;
      };
    }
  }
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
  bottom: 10%;
  left: calc(50% + 15px);
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

  @media (min-width: 960px){
    bottom: 20px;
    left: calc(50% - 7px);
  }
`;

export default function Home({
  pokemonList,
  pokemonListLoading,
  pokemonListError,
  types,
  selectedType,
  isLoadingPokemonTypeFilteredList,
  pokemonSearch,
  setPokemonSearch,
  handlePageChange,
  handleFilterChange,
  isModalOpen,
  handleCloseModal,
  selectedPokemon,
  paginatedList,
  currentPage,
  handleOpenModal,
  lastPage
}: any) {
    const { t } = useTranslation('common');
    const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null);
    const [ flipped, setFlipped ] = useState(false);
    const [ flipDirection, setFlipDirection ] = useState<'forward' | 'backward'>('forward');
    const [ mounted, setMounted ] = useState(false);
    const [ shouldDisplay, setShouldDisplay ] = useState(false)

    useEffect(() => {
        if (pokemonList) {
          const timer = setTimeout(() => {
          setFlipped(false);
          }, 500);
          return () => clearTimeout(timer);
        }
    }, [pokemonList]);

    useEffect(() => {
      setMounted(true);
      const timer = setTimeout(() => {
        setShouldDisplay(true)
        }, 4500);
      return () => clearTimeout(timer);
    }, []);
      
    if (!mounted) return null;

    if(pokemonListError){
      return shouldDisplay && <ApiError />
    }

    return (
      <>
        <StyledContainer >
          {shouldDisplay &&
            <>
              <FilterTable>
                <SelectLanguage />
                <Typography py={2} variant="h2" color="#f7f7f7">{t('filter.search')}</Typography>
                <TextField 
                    value={pokemonSearch} 
                    onChange={(e) => setPokemonSearch(e.target.value)}
                    sx={{marginBottom: '1rem'}} 
                    id="outlined-basic" 
                    label={t('filter.name')}
                    variant="outlined" 
                    fullWidth
                    autoComplete='off'
                    slotProps={{ htmlInput: { maxLength: 25 } }}
                />
                <AutoCompleteInput
                  iconPath="types"
                  label={t('filter.type')}
                  options={types.filter((type: OptionType) => type.name !== 'stellar' && type.name !== 'unknown')}
                  onChange={(newValue) => {
                  handlePageChange(1); // reseta a página
                  handleFilterChange(newValue?.name ?? null); // atualiza a URL
                  }}
                  value={selectedType}
                />
                <SocialMedias />
              </FilterTable>
            </> }
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
            </div>
          }
          <div style={{position: 'absolute', overflow: 'hidden'}}>
            {shouldDisplay && <PokeballSvg />}
          </div>
          <PokemonModal open={shouldDisplay && isModalOpen} handleClose={handleCloseModal} pokemon={selectedPokemon} />
            <StyledCardContainer>
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
            {shouldDisplay && paginatedList?.length 
              ? paginatedList?.map((pokemon: any, index: number) => (
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
                )) :
                (shouldDisplay && !pokemonListLoading && !isLoadingPokemonTypeFilteredList &&
                  <Fade in={mounted}>
                    <div className='pokemonNotFound'>
                    <Typography color='#f7f7f7' variant='h1'>{t('page.pokemonNotFound')}</Typography>
                    <img src="/utils/backgrounds/pokemonNotFound.png/" alt='pokemon not found'/>
                    </div>
                  </Fade>)}
            </Grid>
            </StyledCardContainer>
          {shouldDisplay && 
            <Fade in={!pokemonListLoading}>
              <StyledFooter>
                <Pagination
                  sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#f7f7f7',
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
    </>
  );
}
