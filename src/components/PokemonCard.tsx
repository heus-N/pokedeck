'use client';

import styled from "styled-components";
import { Pokemon } from "../types/pokemon";
import { Typography } from "@mui/material";
import { usePokemonById } from "@/hooks/usePokemonList";
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
  background-color: #fff;
  border-radius: 12px;
`;

const Face = styled.div`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const FrontFace = styled(Face)`
  z-index: 2;
  cursor: pointer;
`;



const BackFace = styled(Face)`
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 10px solid #222285;
  overflow: hidden;
`;


interface Props {
  pokemon: Pokemon;
  onClick: () => void;
  className?: string;
  url: string;
  flipped: boolean; // controle externo da rotação
}

export default function PokemonCard({ pokemon, onClick, className, url, flipped }: Props) {
  const pokemonId = url.split("pokemon/")[1];
  const { data, isLoading } = usePokemonById(pokemonId);

  return (
    <CardWrapper className={className} onClick={onClick} $flipped={flipped}>
      <Card
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {!flipped &&
        <FrontFace>
          {data?.sprites?.front_default && !isLoading && (
            <img src={data.sprites.front_default} alt={`image_${pokemon.name}`} width="100%" />
          )}
          <Typography variant="h6" color="text.secondary" align="center">
            {pokemon.name}
          </Typography>
        </FrontFace> }
        <BackFace>
          <img src="/utils/back-card.jpg" alt="image_back_card" width="100%" />
        </BackFace>
      </Card>
    </CardWrapper>
  );
}
