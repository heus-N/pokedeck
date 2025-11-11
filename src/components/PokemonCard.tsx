'use client';

import styled, { keyframes } from "styled-components";
import { Pokemon } from "../types/pokemon";
import { Skeleton, Typography } from "@mui/material";
import { usePokemonById, usePokemonEvolutionChain, usePokemonSpecie } from "@/hooks/usePokemonList";
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import getEvolutionLevel from "../../public/utils/helpers/usePokemonEvolLevel";
import { useTranslation } from "react-i18next";

const fadeInFromRight = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

interface WrapperProps {
  $flipped: boolean,
  $delay?: number,
  $page: number
}

const CardWrapper = styled.div<WrapperProps>`
  width: 270px;
  height: 350px;
  perspective: 1000px;
  position: relative;

  @media (min-width: 600px){
    width: 240px;
    height: 320px;
  }

  @media (min-width: 960px){
    width: 320px;
    height: 420px;
  }
  pointer-events: ${({$flipped}) => $flipped ? 'none' : null};

  transition: all 0.3s ease;
  // animation: ${fadeInFromRight} ${({$delay, $page}) => ($page === 1) && $delay ? `${$delay * 0.15}s` : '0.2s ease forwards'};
  animation: ${fadeInFromRight} ${({$delay, $page}) => $delay ? `${$delay * 0.15}s` : '0.2s ease forwards'};
`;


const Card = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  transform-style: preserve-3d;
  background-image: url('/utils/back-card.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

`;

const Face = styled.div`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

interface TypeProps {
  $type: string,
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

const FrontFace = styled(Face)<TypeProps>`
  transition: all 0.5s ease;
  background-image: ${({ $type }) => $type ? `url(/utils/card_colors/${$type}.jpg)` : `url(/utils/default.jpg)`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  img {
    transition: all 0.5s ease;
  }

  &:hover img {
    filter: drop-shadow(0px 0px 10px ${({ $type }) => typeColors[$type] || typeColors.default});
  };

  &:hover {
    box-shadow: 0px 0px 10px ${({ $type }) => typeColors[$type] || typeColors.default};
  };

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 12px;
`;


const BackFace = styled(Face)`
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 12px solid #222285;
  overflow: hidden;
  background-image: url('/utils/back-card.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TypeContainer = styled.span`
  position: absolute;
  right: 0px;
  top: 0px;
  img{
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));
    padding: 2px;
    width: 25px;
    position: relative;
    z-index: 5;
  }
`

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .pokemonName{
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5));
    font-size: 2rem;

    @media(min-width: 600px){
      font-size: 1.5rem;
    };
  }
`

const PokemonBgContainer = styled.div`
  width: 100%;
  height: 60%;
  // background: linear-gradient(180deg, hsla(197, 71%, 73%, 1) 17%, hsla(0, 0%, 100%, 1) 100%);
  background-color: transparent;
  transition: 0.5s ease;
  overflow: hidden;
  position: relative;
  box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 1);
  position: relative;

  border: 3px solid;
  border-top: 10px solid;
  border-bottom: 10px solid;
  border-image: linear-gradient(135deg, #7f7f7f, #cfcfcf, #ffffff, #cfcfcf, #7f7f7f) 1;
  clip-path: polygon(
    10px 0%,
    100% 0%,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0% 100%,
    0% 10px
  );

  &:hover {
    height: 70%;
  };

  .pokemon{
    position: relative;
    top: -10px;
    width: 100%;
    box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.5);
  }

  .notFound{
    position: relative;
    left: 50%;
    top: 120px;
    transform: translate(-50%, -50%);
  }

  .background{
    position: absolute;
    top: -140px;
    left: 50%;
    width: 350px;
    height: auto;
    transform: translate(-50%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media(min-width: 960px){
      width: 400px;
    }
  }
`

const EvolutionLevelContainer = styled.div`
  position: absolute;
  z-index: 10;
  left: 1.5rem;
  top: 9px;
  left: 25px;

  img{
    width: 30px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5));
  }
`

const PokemonInfoContainer = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const HpContainer = styled.span`
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  padding: 0px 10px;
  height: 28px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.25);
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F7F7F7;
  gap: 5px;
  white-space: nowrap;
  

  .hp{
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5));
    font-size: 1.5rem;

    @media(min-width: 600px){
      font-size: 1rem;
    };
  };

  .favoriteIcon:hover{
    scale: 1.2;
  }
  .favoriteIcon {
    transition: all 1s ease;
  }
`

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;

  img{
    padding: 2px;
    width: 25px;
    height: 25px;
    position: relative;
    z-index: 5;
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))
  }
`

const BorderContainer = styled.div`
  border-bottom: 1px solid #F7F7F7;
  border-left: 1px solid #F7F7F7;
  border-radius: 100px;
  padding: 0 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.25);
`


interface Props {
  pokemon: Pokemon;
  onClick: () => void;
  className?: string;
  url: string;
  flipped: boolean; // controle externo da rotação
  flipDirection: string;
  index: number;
  page: number;
}


export default function PokemonCard({ pokemon, onClick, className, url, flipped, flipDirection, index, page }: Props) {
  const { t } = useTranslation('common');
  const pokemonId = url.split("pokemon/")[1];
  const { findPokemonById, isLoadingPokemon } = usePokemonById(pokemonId);
  const { evolutionChainId, isLoadingPokemonSpecie } = usePokemonSpecie(findPokemonById?.species);
  const { pokemonEvolutionChain, isLoadingPokemonEvolutionChain } = usePokemonEvolutionChain(evolutionChainId ?? '');
  const rotation = flipped ? (flipDirection === 'forward' ? 180 : -180) : 0

  const primaryType = findPokemonById?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';
  const hpStat = findPokemonById?.stats?.find(stat => stat.stat.name === 'hp');

  const evolutionLevel = getEvolutionLevel(pokemonEvolutionChain?.chain, findPokemonById?.name ?? '') || 0;

  const isCardLoading = isLoadingPokemon || isLoadingPokemonSpecie || isLoadingPokemonEvolutionChain;

  console.log(pokemon)

  return (
    <CardWrapper className={className} onClick={onClick} $flipped={flipped} $delay={index} $page={page}>
      <Card
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.25 }}
      >
        {!flipped &&
          <FrontFace $type={primaryType} className="card">
            {!isCardLoading ? (
              <>
                <Tooltip title={t('pokemonCard.evolutionLevel')}>
                  <EvolutionLevelContainer>
                    <img src={`/utils/evolution_level/evolution_level_${evolutionLevel}.png`} alt="evolution level"/>
                  </EvolutionLevelContainer>
                </Tooltip>
                <PokemonBgContainer>
                  <TypeContainer key={findPokemonById?.id}>
                    <Tooltip title={primaryType}>
                      <img src={`/utils/types/${primaryType}.png`} alt="pokemon_type" />
                    </Tooltip>
                  </TypeContainer>
                    <img className="background" src={`/utils/backgrounds/${primaryType}.png/`} />
                    {findPokemonById?.sprites?.front_default 
                      ? <img className="pokemon" src={findPokemonById?.sprites?.front_default} alt={`image_${pokemon.name}`} />
                      : <Tooltip title={t('pokemonCard.imageNotFound')}>
                          <img className="notFound" alt={`image_${pokemon.name}`} width="50%" src={'/utils/backgrounds/notFound.png'}/>
                        </Tooltip> 
                    }
                </PokemonBgContainer>
                <PokemonInfoContainer>
                  <NameContainer>
                    <Typography color="text.secondary" className="pokemonName" flexGrow="nowrap">
                      {findPokemonById?.name}
                    </Typography>
                  </NameContainer>
                  <FooterContainer >
                    <BorderContainer style={{display: 'flex', alignItems: 'center'}}>
                      {findPokemonById?.types?.map(t => (
                        <Tooltip title={t.type?.name} key={t.type?.name}>
                          <img src={`/utils/types/${t.type?.name}.png`} alt="pokemon_type" />
                        </Tooltip>
                      ))}
                    </BorderContainer>
                    <hr style={{width: '100%', border: 'none', height: '1px', backgroundColor: '#ffffff', opacity: '0.5', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'}}/>
                    <HpContainer>
                      <Tooltip title={t('pokemonCard.hp')}>
                        <Typography className="hp">
                          <FavoriteIcon className="favoriteIcon" sx={{fontSize: '16px', marginBottom: '-2px'}}/> {hpStat?.base_stat}
                        </Typography>
                      </Tooltip>
                    </HpContainer>
                  </FooterContainer>
                </PokemonInfoContainer>
              </>
            ):
            <>
              <Skeleton animation="wave" variant="rectangular" width="100%" height="60%" />
              <Skeleton animation="wave" variant="text" width="100%" height="8%" />
              <Skeleton animation="wave" variant="rounded" width="100%" height="8%" />
            </>}
          </FrontFace>}
        <BackFace />
      </Card>
    </CardWrapper>
  );
}
