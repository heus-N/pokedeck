'use client';

import styled from "styled-components";
import { Pokemon } from "../types/pokemon";
import { Typography } from "@mui/material";
import { usePokemonById, usePokemonType } from "@/hooks/usePokemonList";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

interface WrapperProps {
  $flipped: boolean
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
`;


const Card = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  transform-style: preserve-3d;
  border-radius: 12px;
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
  background-color: #fff;
`;

interface TypeProps {
  $type: string
}

const FrontFace = styled(Face)<TypeProps>`
  z-index: 2;
  cursor: pointer;
  border: 10px solid ${({ $type }) =>
    $type === 'normal'     ? '#A8A77A' : // Bege claro
    $type === 'fire'       ? '#F5AC78' : // Vermelho pastel
    $type === 'water'      ? '#9DB7F5' : // Azul pastel
    $type === 'electric'   ? '#FAE078' : // Amarelo claro
    $type === 'grass'      ? '#A7DB8D' : // Verde claro
    $type === 'ice'        ? '#BCE6E6' : // Ciano claro
    $type === 'fighting'   ? '#D67873' : // Vermelho queimado
    $type === 'poison'     ? '#C183C1' : // Roxo claro
    $type === 'ground'     ? '#EBD69D' : // Areia
    $type === 'flying'     ? '#C6B7F5' : // Lilás suave
    $type === 'psychic'    ? '#FA92B2' : // Rosa suave
    $type === 'bug'        ? '#C6D16E' : // Verde oliva claro
    $type === 'rock'       ? '#D1C17D' : // Marrom claro
    $type === 'ghost'      ? '#A292BC' : // Lavanda
    $type === 'dragon'     ? '#A27DFA' : // Roxo suave
    $type === 'dark'       ? '#A29288' : // Cinza escuro
    $type === 'steel'      ? '#D1D1E0' : // Cinza claro azulado
    $type === 'fairy'      ? '#F4BDC9' : // Rosa bebê
    $type === 'stellar'    ? '#D6C6F0' : // Roxo azulado claro (tipo especial)
    $type === 'unknown'    ? '#CCCCCC' : // Neutro claro
    '#A0A0A0'               // fallback cinza suave
  };
`;


const BackFace = styled(Face)`
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 10px solid #222285;
  overflow: hidden;
  background-image: url('/utils/back-card.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;


interface Props {
  pokemon: Pokemon;
  onClick: () => void;
  className?: string;
  url: string;
  flipped: boolean; // controle externo da rotação
  flipDirection: string;
}

export default function PokemonCard({ pokemon, onClick, className, url, flipped, flipDirection }: Props) {
  const pokemonId = url.split("pokemon/")[1];
  const { data, isLoading } = usePokemonById(pokemonId);
  const { data: pokemonType } = usePokemonType();
  const rotation = flipped ? (flipDirection === 'forward' ? 180 : -180) : 0

  const primaryType = data?.types?.find(t => t.slot === 1)?.type?.name ?? 'normal';


  return (
    <CardWrapper className={className} onClick={onClick} $flipped={flipped}>
      <Card
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.25 }}
      >
        {!flipped &&
        <FrontFace $type={primaryType}>
          {data?.sprites?.front_default && !isLoading && (
            <img src={data.sprites.front_default} alt={`image_${pokemon.name}`} width="100%" />
          )}
          <Typography variant="h6" color="text.secondary" align="center">
            {pokemon.name}
          </Typography>
        </FrontFace> }
        <BackFace />
      </Card>
    </CardWrapper>
  );
}
