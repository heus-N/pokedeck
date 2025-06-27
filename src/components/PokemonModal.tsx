import { usePokemonById, usePokemonType } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Dialog, DialogContent, Typography } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

interface DialogProps{
  $type: string
}

const StyledDialogContent = styled(DialogContent)<DialogProps>`
  width: 300px;
  height: 500px;
  background-image: ${({ $type }) => $type ? `url(/utils/card_colors/modal/${$type}.jpg)` : `url(/utils/card_colors/modal/default.jpg)`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;

  @media (min-width: 600px){
    padding: 1rem 2rem;
    width: 450px;
  };

  @media (min-width: 960px){
    padding: 1rem 2rem;
    width: 900px;
    height: 600px;
  };
`

const ClipPath = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 16px solid;
  border-image: linear-gradient(135deg, #7f7f7f, #cfcfcf, #ffffff, #cfcfcf, #7f7f7f) 1;
  transition: all 0.3s ease;

  clip-path: polygon(
    0px 0px,
    100% 0px,
    100% 100%,
    0 100%,
    0 50%,
    8px calc(50% + 8px),
    8px calc(100% - 16px),
    calc(100% - 8px) calc(100% - 16px),
    calc(100% - 8px) calc(50% + 8px),
    100% calc(50%),
    calc(100% - 8px) calc(50% - 8px),
    calc(100% - 8px) 16px,
    8px 16px,
    8px calc(50% - 8px),
    0px 50%
  );

  @media (min-width: 600px){
    clip-path: polygon(
      0px 0px,
      100% 0px,
      100% 100%,
      50% 100%,
      calc(50% - -8px) calc(100% - 8px),
      calc(100% - 16px) calc(100% - 8px),
      calc(100% - 16px) 8px,
      calc(50% + 8px) 8px,
      calc(50%) 0px,
      calc(50% - 8px) 8px,
      16px 8px,
      16px calc(100% - 8px),
      calc(50% - 8px) calc(100% - 8px),
      50% 100%,
      0 100%
    );
  }

`

const ClipPathLine1 = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  
  // border: 16px solid;
  // border-image: linear-gradient(135deg, #7f7f7f, #cfcfcf, #ffffff, #cfcfcf, #7f7f7f) 1;
  transition: all 0.3s ease;
  background-color: #fff;
  opacity: 0.5;

  clip-path: polygon(
    0 20%,
    30% 20%,
    70% 80%,
    100% 80%,
    100% calc(80% + 1px),
    calc(70% - 1px) calc(80% + 1px),
    calc(30% - 1px) calc(20% + 1px),
    0 calc(20% + 1px)
  )
`

const ClipPathLine2 = styled(ClipPathLine1)`
  clip-path: polygon(
    0 80%,
    30% 80%,
    70% 20%,
    100% 20%,
    100% calc(20% + 1px),
    calc(70% + 1px) calc(20% + 1px),
    calc(30% + 1px) calc(80% + 1px),
    0 calc(80% + 1px)
  )
`

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  display: flex;
`

const LeftModalContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 10px;
`

const RightModalContainer = styled.div`
  border: 1px solid blue;
  width: 50%;
  padding: 10px;
`

const PokemonInfo = styled.div`
  // border: 1px solid green;
  height: calc(20% - 16px);
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

interface TypeContainerProps{
  $type: string
}

const TypeContainer = styled.div<TypeContainerProps>`
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  padding: 2px 10px;
  border-radius: 20px;
  & + & {
    margin-left: 10px;
  };
  box-shadow: 0px 0px 3px rgba(0, 0 , 0, 0.5);
  background-color: ${({$type}) => typeColors[$type] || typeColors.default};
  transition: 0.3s ease;
  &:hover{
    scale: 1.05;
  }
`

const ImageContainer = styled.div`
  // border: 1px solid yellow;
  height: calc(60% + 32px);
`

const StatsContainer = styled.div`
  // border: 1px solid purple;
  height: calc(20% - 16px);
`

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#F5AC78',
  water: '#9DB7F5',
  electric: '#FAE078',
  grass: '#A7DB8D',
  ice: '#BCE6E6',
  fighting: '#D67873',
  poison: '#C183C1',
  ground: '#EBD69D',
  flying: '#C6B7F5',
  psychic: '#FA92B2',
  bug: '#C6D16E',
  rock: '#D1C17D',
  ghost: '#A292BC',
  dragon: '#A27DFA',
  dark: '#A29288',
  steel: '#D1D1E0',
  fairy: '#F4BDC9',
  stellar: '#D6C6F0',
  unknown: '#CCCCCC',
  default: '#A0A0A0',
};

interface PropsModal {
  open: boolean;
  handleClose: () => void;
  pokemon: Pokemon | null;
}

export default function PokemonModal({ open, handleClose, pokemon }: PropsModal) {
  const url = pokemon?.url
  const pokemonId = url?.split("pokemon/")[1] ?? '';
  const { data, isLoading } = usePokemonById(pokemonId);
  const primaryType = data?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';

  console.log('data', data)
  console.log('pokemon', pokemon)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .MuiDialogContent-root':{
          padding: 0
        }
      }}
    >
      <StyledDialogContent $type={primaryType} id="alert-dialog-slide-description">
        <ClipPathLine1 />
        <ClipPathLine2 />
        <ClipPath />
        <ModalContainer>
          {(!pokemon || !pokemonId) ? (
            <Typography variant='h2'>
              Nenhum Pokémon selecionado.
            </Typography>
          ) : isLoading ? (
            <Typography variant='h2'>
              Carregando...
            </Typography>
          ) : (
            <>
              <LeftModalContainer>
                <PokemonInfo>
                  <Typography variant='h2'>
                    {pokemon.name}
                  </Typography>
                  <div style={{display: 'flex'}}>
                    {data?.types?.map(t => (
                      <TypeContainer $type={t.type.name} key={t.type.name}>{t.type.name}</TypeContainer>
                    ))}
                  </div>
                </PokemonInfo>
                <ImageContainer>
                  imagem
                </ImageContainer>
                <StatsContainer>
                  stats
                </StatsContainer>
              </LeftModalContainer>

              <RightModalContainer>
                <Typography>evoluções</Typography>
                <div>evol 1</div>
                <div>evol 2</div>
                <div>evol 3</div>
              </RightModalContainer>
            </>
          )}
        </ModalContainer>
      </StyledDialogContent>
    </Dialog>
  );
}
