import { Pokemon } from '@/types/pokemon';
import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';

const StyledDialogContent = styled(DialogContent)`
  width: 300px;
  height: 500px;
  border-radius: 10px;

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


interface PropsModal {
  open: boolean;
  handleClose: () => void;
  pokemon: Pokemon | null;
}

export default function PokemonModal({ open, handleClose, pokemon }: PropsModal) {
  
  if (!pokemon) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledDialogContent id="alert-dialog-slide-description">
        <Typography variant="h1">{pokemon.name}</Typography>
        <img alt={pokemon.name} />
      </StyledDialogContent>
    </Dialog>
  );
}
