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
  border: 1px solid #FFD700;
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

const StyledModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  display: flex;
`


interface PropsModal {
  open: boolean;
  handleClose: () => void;
  pokemon: Pokemon | null;
}

export default function PokemonModal({ open, handleClose, pokemon }: PropsModal) {
  if (!pokemon) return null;
  const url = pokemon.url
  const pokemonId = url?.split("pokemon/")[1];
  const { data, isLoading } = usePokemonById(pokemonId);
  const primaryType = data?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';

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
        <StyledModalContainer>
          <div style={{width: '100%', border: '1px solid red'}}>
            {/* <Typography variant="h1">{pokemon.name}</Typography> */}
          </div>

          {/* <div style={{width: '100%'}}>test</div> */}
        </StyledModalContainer>
      </StyledDialogContent>
    </Dialog>
  );
}
