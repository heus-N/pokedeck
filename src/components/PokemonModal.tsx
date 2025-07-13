import getEvolutionLevel from '../../public/utils/helpers/usePokemonEvolLevel';
import { useMultiplePokemonByIds, usePokemonAbility, usePokemonById, usePokemonEvolutionChain, usePokemonList, usePokemonSpecie } from '@/hooks/usePokemonList';
import { Pokemon } from '@/types/pokemon';
import { Dialog, DialogContent, IconButton, Tooltip, Typography } from '@mui/material';
import styled from 'styled-components';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { kgToLb } from '../../public/utils/helpers/unitConverter';
import { getEvolutions } from '../../public/utils/helpers/getEvolutions';
import { useEffect, useRef, useState } from 'react';
import { usePokemonNavigation } from '@/hooks/usePokemonNavigation';
import { getMinLevelToEvolve } from '../../public/utils/helpers/getLevelToEvolve';
import ArrowDown from './ArrowDown';
import { getAbilitiesIds } from '../../public/utils/helpers/getAbilities';
import { gsap } from 'gsap';

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
  pointer-events: none;

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
  // margin-left: 8px;


  @media(min-width: 960px){
    flex-direction: row;
  }
`

const LeftModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  // justify-content: space-between;

  @media(min-width: 600px){
    width: 100%;
    height: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media(min-width: 960px){
    width: 50%;
    height: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const RightModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  // overflow: hidden;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;

  @media(min-width: 960px){
    width: 50%;
    padding: 10px;
  }
`

interface abilitiesProps{
  $isAbilitieHover?: boolean;
  $isEvolutionHover?: boolean;
  $isHabitatHover?: boolean;
}

const AbilitiesContainer = styled.div<abilitiesProps>`
  height: ${({$isAbilitieHover}) => $isAbilitieHover ? '100%' : '17%'};
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 0.5rem;
  margin: 0 5px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
  @media(min-width: 960px){
    margin-bottom: 0px;
  }

  .ability{
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding: 5px 0;
  }
  
  .abilities{
    opacity: ${({$isHabitatHover}) => $isHabitatHover ? 0 : 1};
    transition: all 0.3s ease;
  }

  .divisor{
    margin: 5px 0;
    height: 1px;
    border: none;
    background-color:rgba(255, 255, 255, 0.5);
  }

  &:hover{
    transition: all 0.3s ease;
    overflow-y: auto;
    margin-bottom: 0;
  }
`
const EvolutionContainer = styled.div`
  height: 55%;
  position: relative;
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s ease;

  .chainTitle{
    opacity: 0;
    position: absolute;
    top: -14px;
    z-index: 10;
    text-align: center;
    width: 100%;
    transition: all 0.3s ease;
  }

  .mainContainer{
    height: 100%;
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    
    &:hover {
      .chainTitle{
        opacity: 1;
      }
      overflow-y: auto;
    }
  }

  .evolContainer{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
  }

  @media(min-width: 600px){
    height: 65%;
  }
`;

interface EvolutionProps {
  $level?: number
}

const evolutionColors: Record<string, string> = {
  1: 'rgba(76, 175, 80, 0.25)',
  2: 'rgba(33, 150, 243, 0.25)',
  3: 'rgba(244, 67, 54, 0.25)',  
};

const EvolutionsEl = styled.div<EvolutionProps>`
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  // filter: drop-shadow(10px 0px 1px rgba(0, 0, 0, 0.5));
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  background-color: ${({ $level }) => $level !== undefined && evolutionColors[$level] || 'transparent'};
  transition: scale 0.5s ease;
  z-index: 10;
  overflow: visible;

  &:hover{
    scale: 1.01
  }
  
  .img_container{
    min-height: 40px;
    min-width: 40px;
    position: relative;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 7px;

    &:not(:first-child) {
      margin-left: 10px;
    }

    @media(min-width: 600px){
      min-height: 60px;
      min-width: 60px;
    }

    @media(min-width: 960px){
      min-height: 80px;
      min-width: 80px;
    }

    img{
      filter: drop-shadow(5px 0px 0px rgba(0, 0, 0, 0.25));
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .evolStar{
    width: 10px;
    
    @media(min-width: 600px){
      width: 15px;
    }
  }

  .nameStarContainer{
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    width: 100%;
    text-align: center;
    height: fit-content;

    @media(min-width: 600px){
      width: 100%;
    }
  }

  .starContent{
    position: relative;

    @media(min-width: 600px){
      position: absolute;
      width: auto;
      right: 0;
      top: 0;
    }
  }

  .nameStarContent{
    position: relative;
  }

  .evolTxtContainer{
    display: none;

    @media(min-width: 600px){
      display: block;
    }
  }
`

const PokemonInfo = styled.div`
  height: 20%;
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
  };

  .evolution_rating{
    position: relative;
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
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
    bottom: -10px;
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
      width: 110%;
    }
  }
`

const StatsContainer = styled.div`
  height: 20%;
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
    white-space: nowrap;
  }
`

const HabitatContainer = styled.div<abilitiesProps>`
  height: ${({$isHabitatHover}) => $isHabitatHover ? '100%' : '17%'};
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 0.5rem;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin: 10px 5px;

  @media (min-width: 600px){
    margin: 10px 5px;
  }

  @media (min-width: 960px){
    margin: 0 5px;
  }

  &:hover{
    transition: all 0.3s ease;
    overflow-y: auto;
  }

  .flavorTextContainer{
    opacity: ${({$isAbilitieHover}) => $isAbilitieHover ? 0 : 1};
    transition: all 0.3s ease;
  }

  .flavorText{
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding: 5px 0;
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
  const cleanPokemonId = pokemonId.replace('/', '')
  const { findPokemonById, isLoadingPokemon, primaryType, abilityIds } = usePokemonById(cleanPokemonId);

  const { pokemonSpecie, evolutionChainId } = usePokemonSpecie(findPokemonById?.species);
  const { pokemonEvolutionChain, evolutionIds } = usePokemonEvolutionChain(evolutionChainId ?? '');
  const evolutionLevel = getEvolutionLevel(pokemonEvolutionChain?.chain, findPokemonById?.name ?? '') || 0;
  const { evolutionPokemons, evolutionisLoading } = useMultiplePokemonByIds(evolutionIds);
  const { pokemonAbility, loadingPokemonAbility} = usePokemonAbility(abilityIds)

  const [ abilitiesHover, setAbilitiesHover ] = useState(false)
  const [ evolutionHover, setEvolutionHover ] = useState(false)
  const [ habitatHover, setHabitatHover ] = useState(false)

  const bgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const percentX = (relX / rect.width - 0.5) * 2;
    const percentY = (relY / rect.height - 0.5) * 2;

    const moveX = percentX * 2;
    const moveY = percentY * 2; 
    const rotateX = -percentY * 3;
    const rotateY = percentX * 3;

    gsap.to(bgRef.current, {
      x: moveX,
      y: moveY,
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 800,
      transformOrigin: "center",
      ease: "power2.out",
      duration: 0.3,
    });
  };


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
      onMouseMove={handleMouseMove}
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
          ) : isLoadingPokemon ? (
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
                    <Tooltip 
                      slotProps={{
                        popper:{
                          modifiers: [
                            {
                              name: 'disablePointerEvents',
                              enabled: true,
                              phase: 'afterWrite',
                              fn: ({ state }) => {
                                if (state.elements.popper) {
                                  state.elements.popper.style.pointerEvents = 'none';
                                }
                              },
                            },
                          ]},
                        }} 
                        title={evolutionLevel > 0 ? "evolution level" : "Este pokemon não possui cadeia evolutiva."}>
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
                      {findPokemonById?.types?.map(t => (
                        <TypeContainer $type={t.type.name} key={t.type.name}>{t.type.name}</TypeContainer>
                      ))}
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <Typography>weight:<span className='stat'>{`${kgToLb(findPokemonById?.weight ? (findPokemonById?.weight) / 10 : 0)} lbs`}</span></Typography>
                      {pokemonSpecie?.habitat?.name && 
                        <Typography>
                          {`habitat: ${pokemonSpecie?.habitat?.name}`}
                        </Typography>
                      }
                    </div>
                  </div>
                </PokemonInfo>
                <ImageContainer $type={primaryType}>
                  <div className='container'>
                    <img ref={bgRef} className="background" src={`/utils/backgrounds/${primaryType}.png/`}/>
                    {findPokemonById?.sprites?.front_default 
                      ? <img className="pokemon" src={findPokemonById?.sprites?.front_default} alt={`image_${pokemon.name}`} width="100%" />
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
                    <Typography>hp: <span className='stat'>{findPokemonById?.stats?.find(s => s.stat.name === 'hp')?.base_stat}</span></Typography>
                    <Typography>attack: <span className='stat'></span> {findPokemonById?.stats?.find(s => s.stat.name === 'attack')?.base_stat} </Typography>
                    <Typography>defense: <span className='stat'></span> {findPokemonById?.stats?.find(s => s.stat.name === 'defense')?.base_stat} </Typography>
                  </div>
                  <hr/>
                  <div className='stats2'>
                    <Typography>special-attack: <span className='stat'> {findPokemonById?.stats?.find(s => s.stat.name === 'special-attack')?.base_stat} </span> </Typography>
                    <Typography>special-defense: <span className='stat'> {findPokemonById?.stats?.find(s => s.stat.name === 'special-defense')?.base_stat} </span> </Typography>
                    <Typography>speed: <span className='stat'></span> {findPokemonById?.stats?.find(s => s.stat.name === 'speed')?.base_stat} </Typography>
                  </div>
                </StatsContainer>
              </LeftModalContainer>
              <RightModalContainer>
                <AbilitiesContainer 
                  onMouseEnter={() => setAbilitiesHover(true)} 
                  onMouseLeave={() => setAbilitiesHover(false)}
                  $isAbilitieHover={abilitiesHover}
                  $isEvolutionHover={evolutionHover}
                  $isHabitatHover={habitatHover}
                  >
                  <div>
                    <Typography variant='h4'>
                      Abilities:
                    </Typography>
                  </div>
                  <div className='abilities'>
                    {!loadingPokemonAbility && 
                      pokemonAbility?.map((ab, index) => (
                        <Typography className='ability' variant='h4' key={`${ab.id}` + `${ab.name}` + `${index}`}>
                          {ab.name}: {ab?.effect_entries?.length && ab?.effect_entries.find((ef : any) => ef.language.name === 'en')?.effect}
                        </Typography>
                    ))}
                  </div>
                </AbilitiesContainer>
                <EvolutionContainer>
                  <div className='mainContainer'>
                    <Typography variant='h3' className='chainTitle'>
                      Evolution Chain
                    </Typography>
                    <div className="evolContainer">
                      {!evolutionisLoading &&
                        evolutionPokemons?.map((ev, index) => (
                          <EvolutionsEl $level={index + 1} key={ev.id}>
                            <Tooltip 
                              slotProps={{
                                popper:{
                                  modifiers: [
                                    {
                                      name: 'disablePointerEvents',
                                      enabled: true,
                                      phase: 'afterWrite',
                                      fn: ({ state }) => {
                                        if (state.elements.popper) {
                                          state.elements.popper.style.pointerEvents = 'none';
                                        }
                                      },
                                    },
                                  ]},
                                }} 
                                title={`default ${ev.name}`}>
                              <div className="img_container">
                                <img src={ev?.sprites?.front_default}/>
                              </div>
                            </Tooltip>
                            <Tooltip 
                              slotProps={{
                                popper:{
                                  modifiers: [
                                    {
                                      name: 'disablePointerEvents',
                                      enabled: true,
                                      phase: 'afterWrite',
                                      fn: ({ state }) => {
                                        if (state.elements.popper) {
                                          state.elements.popper.style.pointerEvents = 'none';
                                        }
                                      },
                                    },
                                  ]},
                                }} 
                              title={`shiny ${ev.name}`}>
                              <div className="img_container">
                                <img src={ev?.sprites?.front_shiny}/>
                              </div>
                            </Tooltip>
                            <div className='nameStarContainer'>
                              <div className='nameStarContent'>
                                <Typography>
                                  {ev.name}
                                </Typography>
                                <div className='starContent'>
                                  {Array.from({ length: getEvolutionLevel(pokemonEvolutionChain?.chain, ev.name) }, (_, i) => <img className='evolStar' key={i} alt="evolution star" src={`/utils/evolution_level/evolution_star.png`}/>)}
                                </div>
                              </div>
                              <div className='evolTxtContainer'>
                                <Typography>
                                  {(getEvolutionLevel(pokemonEvolutionChain?.chain, ev.name) < evolutionPokemons?.length) ? 'level to evolve: ' + (getMinLevelToEvolve(pokemonEvolutionChain?.chain, ev.name)) : "max evolution"}
                                </Typography>
                                <Typography>
                                  {getEvolutionLevel(pokemonEvolutionChain?.chain, ev.name) < evolutionPokemons?.length && 'evolves to:'}
                                </Typography>
                                  {getEvolutionLevel(pokemonEvolutionChain?.chain, ev.name) < evolutionPokemons?.length && <ArrowDown />}
                              </div>
                            </div>
                          </EvolutionsEl>
                        ))}
                      </div>
                  </div>
                </EvolutionContainer>
                <HabitatContainer 
                  onMouseEnter={() => setHabitatHover(true)} 
                  onMouseLeave={() => setHabitatHover(false)}
                  $isAbilitieHover={abilitiesHover}
                  $isEvolutionHover={evolutionHover}
                  $isHabitatHover={habitatHover}
                >
                  <Typography variant='h4'>
                    Flavor Entries:
                  </Typography>
                  {pokemonSpecie?.flavor_text_entries?.length && 
                    <div className='flavorTextContainer'>
                      {pokemonSpecie?.flavor_text_entries
                        .filter(entry => entry.language.name === 'en')
                        .reduce((uniqueEntries, currentEntry) => {
                          const isDuplicate = uniqueEntries.some(
                            e => e.flavor_text === currentEntry.flavor_text
                          );
                          if (!isDuplicate) uniqueEntries.push(currentEntry);
                          return uniqueEntries;
                        }, [] as typeof pokemonSpecie.flavor_text_entries)
                        .map((ft, ftIndex) => (
                          <Typography variant='h4' key={ft.flavor_text + ftIndex} className='flavorText'>
                            {ftIndex + 1 + ' - '}
                            {ft.flavor_text.replace(/\n|\f/g, ' ')}
                          </Typography>
                        ))
                      }
                    </div>
                  }
                </HabitatContainer>
              </RightModalContainer>
            </>
          )}
        </ModalContainer>
      </StyledDialogContent>
    </Dialog>
  );
}
