import getEvolutionLevel from '@/hooks/usePokemonEvolLevel';
import { usePokemonById, usePokemonEvolutionChain, usePokemonSpecie } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Dialog, DialogContent, IconButton, Tooltip, Typography } from '@mui/material';
import styled from 'styled-components';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { kgToLb } from '../../public/utils/unitConverter';

interface DialogProps{
  $type: string
}

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
  z-index: 10;

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
  flex-direction: column;

  @media(min-width: 960px){
    flex-direction: row;
  }
`

const LeftModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media(min-width: 960px){
    width: 50%;
  }
`

const RightModalContainer = styled.div`
  border: 1px solid blue;
  width: 100%;
  padding: 0 10px;

  @media(min-width: 960px){
    width: 50%;
  }
`

const PokemonInfo = styled.div`
  // border: 1px solid green;
  height: calc(20% + 8px);
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  img{
    margin-left: 3px;
    width: 1.25rem;
    height: 1.25rem;
    transition: all 0.5s ease;
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));

    &:hover{
      scale: 1.1;
      filter: drop-shadow(0 0 3px rgba(252, 177, 3, 0.9));
    }
  }

  .evolution_rating{
    height: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .redirect{
    transition: scale 0.5s ease;
    color: #000;
    &:hover{
      scale: 1.1;
      // cursor: pointer
    }
  }

  .question_mark{
    position: absolute;
    width: 35px;
    height: 35px;
    
    img{
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
  }
  
  span{
    margin-left: 5px;
  }
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
  box-shadow: 1px 1px 3px rgba(0, 0 , 0, 0.5);
  background-color: ${({$type}) => typeColors[$type] || typeColors.default};
  transition: 0.3s ease;
  &:hover{
    scale: 1.05;
  }
`

interface ImageProps {
  $type: string;
}

const ImageContainer = styled.div<ImageProps>`
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));


  .container{
    width: 350px;
    height: 350px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .pokemon{
      position: relative;
      top: 20px;
      width: 100%;

      @media(min-width: 600px){
        left: 50px;
        width: 70%;
      }

      @media(min-width: 960px){
        left: 50px;
        width: 70%;
      }

    }

  .notFound{
    position: relative;
    cursor: pointer;
  }

  .pokemon, .notFound{
    transition: all 0.5s ease;
    &:hover {
      filter: drop-shadow(0px 0px 10px ${({ $type }) => typeColors[$type] || typeColors.default});
    };
  }
  
  .background{
    bottom: 0;
    position: absolute;
    left: 50%;
    width: 200%;
    transform: translate(-50%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  @media (min-width: 600px){
    .background{
      width: 100%;
    }
  }

  // @media (min-width: 960px){
  //   .background{
  //     width: 100%;
  //   }
  // }
  
`

const StatsContainer = styled.div`
  // border: 1px solid purple;
  height: calc(20% + 8px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  hr{
    border: none;
    width: 1px;
    height: calc(100% - 2rem);
    background-color: rgba(255, 255, 255, 0.5);
    margin: 10px 10px;
  }

  .stats1, .stats2{
    width: 50%;
  }
`

interface PropsModal {
  open: boolean;
  handleClose: () => void;
  pokemon: Pokemon | null;
}

export default function PokemonModal({ open, handleClose, pokemon }: PropsModal) {
  const url = pokemon?.url
  const pokemonId = url?.split("pokemon/")[1] ?? '';
  const { data, isLoading } = usePokemonById(pokemonId);

  const { data: pokemonSpecie } = usePokemonSpecie(pokemonId);
  const primaryType = data?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';
  const evolutionChainUrl = pokemonSpecie?.evolution_chain?.url;
  const evolutionChainId = evolutionChainUrl?.split('evolution-chain/')[1];
  const { data: pokemonEvolutionChain } = usePokemonEvolutionChain(evolutionChainId ?? '');
  const evolutionLevel = getEvolutionLevel(pokemonEvolutionChain?.chain, data?.name ?? '') || 0;

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
                  <div style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                    <Typography variant='h2'>
                        {pokemon.name} 
                    </Typography>
                    <Tooltip title={evolutionLevel > 0 ? "evolution level" : "Este pokemon não possui cadeia evolutiva."}>
                      <span className='evolution_rating'>
                        {evolutionLevel > 0 
                          ? Array.from({ length: evolutionLevel }, (_, i) => <img key={i} alt="evolution star" src={`/utils/evolution_level/evolution_star.png`}/>)
                          : <span className='question_mark'> <img key={0} alt="evolution level" src={`/utils/evolution_level/question_mark.png`} /> </span>
                        }
                      </span>
                    </Tooltip>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>
                      {data?.types?.map(t => (
                        <TypeContainer $type={t.type.name} key={t.type.name}>{t.type.name}</TypeContainer>
                      ))}
                    </div>
                    <Typography>weight: <span className='stat'>{`${kgToLb(data?.weight ? (data?.weight) / 10 : 0)} lbs`}</span></Typography>
                  </div>
                </PokemonInfo>
                <ImageContainer $type={primaryType}>
                  <div className='container'>
                    <img className="background" src={`/utils/backgrounds/${primaryType}.png/`} />
                    {data?.sprites?.front_default 
                      ? <img className="pokemon" src={data?.sprites?.front_default} alt={`image_${pokemon.name}`} width="100%" />
                      : <IconButton
                          component="a"
                          href={`https://www.google.com/search?tbm=isch&q=pokemon+${pokemon.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            width: '100%', 
                            height: '100%', 
                            cursor: 'default',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            }}}>
                          <Tooltip title="Oops! Parece que esse pokemon não está disponível, mas se você clicar aqui, será redirecionado para uma página web onde poderá vê-lo!">
                            <img className="notFound" alt={`image_${pokemon.name}`} width="50%" src={'/utils/backgrounds/notFound.png'}/>
                          </Tooltip>
                        </IconButton>
                      }
                  </div>
                </ImageContainer>
                <StatsContainer>
                  <div className='stats1'>
                    <Typography>hp: <span className='stat'>{data?.stats?.find(s => s.stat.name === 'hp')?.base_stat}</span></Typography>
                    <Typography>attack: <span className='stat'></span> {data?.stats?.find(s => s.stat.name === 'attack')?.base_stat} </Typography>
                    <Typography>defense: <span className='stat'></span> {data?.stats?.find(s => s.stat.name === 'defense')?.base_stat} </Typography>
                  </div>
                  <hr/>
                  <div className='stats2'>
                    <Typography>special-attack: <span className='stat'> {data?.stats?.find(s => s.stat.name === 'special-attack')?.base_stat} </span> </Typography>
                    <Typography>special-defense: <span className='stat'> {data?.stats?.find(s => s.stat.name === 'special-defense')?.base_stat} </span> </Typography>
                    <Typography>speed: <span className='stat'></span> {data?.stats?.find(s => s.stat.name === 'speed')?.base_stat} </Typography>
                  </div>
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
