'use client';

import styled, { keyframes } from "styled-components";
import { Pokemon } from "../types/pokemon";
import { Typography } from "@mui/material";
import { usePokemonById, usePokemonType } from "@/hooks/usePokemonList";
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';

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
  $delay: number,
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
  animation: ${fadeInFromRight} ${({$delay, $page}) => ($page === 1) && $delay ? `${$delay * 0.15}s` : '0.2s ease forwards'};
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
`

const PokemonBgContainer = styled.div`
  width: 100%;
  height: 60%;
  // background-color: #ffffff;
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
    top: -20px;
    box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.5);
  }

  .background{
    position: absolute;
    top: -140px;
    left: 50%;
    width: 420px;
    height: auto;
    transform: translate(-50%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
  padding: 2px 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.25);
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
  }
`

const BorderContainer = styled.div`
  border-bottom: 1px solid #F7F7F7;
  border-left: 1px solid #F7F7F7;
  // border-radius: 100px 0 100px 0;
  border-radius: 100px;
  // border-radius: 0px 100px 100px 100px;
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
  const pokemonId = url.split("pokemon/")[1];
  const { data, isLoading } = usePokemonById(pokemonId);
  const { data: pokemonType } = usePokemonType();
  const rotation = flipped ? (flipDirection === 'forward' ? 180 : -180) : 0

  const primaryType = data?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';
  const hpStat = data?.stats?.find(stat => stat.stat.name === 'hp');

  return (
    <CardWrapper className={className} onClick={onClick} $flipped={flipped} $delay={index} $page={page}>
      <Card
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.25 }}
      >
        {!flipped &&
          <FrontFace $type={primaryType} className="card">
            {data?.sprites?.front_default && !isLoading && (
              <>
                <PokemonBgContainer>
                  <TypeContainer key={data?.id}>
                    <Tooltip title={primaryType}>
                      <img src={`/utils/types/${primaryType}.png`} alt="pokemon_type" />
                    </Tooltip>
                  </TypeContainer>
                    <img className="background" src={`/utils/backgrounds/${primaryType}.png/`} />
                    <img className="pokemon" src={data.sprites.front_default} alt={`image_${pokemon.name}`} width="100%" />
                </PokemonBgContainer>
                <PokemonInfoContainer>
                  <NameContainer>
                    <Typography variant="h3" color="text.secondary" className="pokemonName" flexGrow="nowrap">
                      {data?.name}
                    </Typography>
                  </NameContainer>
                  {/* <span style={{borderRight: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '1px solid rgba(255, 255, 255, 0.5)', height: '100%'}}/> */}
                  <FooterContainer >
                    <BorderContainer style={{display: 'flex', alignItems: 'center'}}>
                      {data?.types?.map(t => (
                        <Tooltip title={t.type?.name} key={t.type?.name}>
                          <img src={`/utils/types/${t.type?.name}.png`} alt="pokemon_type" />
                        </Tooltip>
                      ))}
                    </BorderContainer>
                    <hr style={{width: '100%', border: 'none', height: '1px', backgroundColor: '#ffffff', opacity: '0.5', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'}}/>
                    <HpContainer>
                      <Typography variant="h4" color="#e53935">
                        hp{hpStat?.base_stat}
                      </Typography>
                    </HpContainer>
                  </FooterContainer>
                </PokemonInfoContainer>
              </>
            )}
          </FrontFace>}
        <BackFace />
      </Card>
    </CardWrapper>
  );
}
