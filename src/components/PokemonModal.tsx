import { Pokemon } from '@/types/pokemon';
import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


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
      fullWidth
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent id="alert-dialog-slide-description">
        <Typography variant="h1">{pokemon.name}</Typography>
        <Typography>Tipo: {pokemon.type}</Typography>
        <img src={pokemon.image} alt={pokemon.name} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
