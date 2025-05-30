'use client';

import styled from "styled-components"
import { Pokemon } from "../types/pokemon"
import { Typography } from "@mui/material";
import { useState } from "react";

const Card = styled.div`
  width: 270px;
  height: 350px;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;

  @media (min-width: 600px){
    padding: 1rem 2rem;
    width: 240px;
  }

  @media (min-width: 960px){
    padding: 1rem 2rem;
    width: 300px;
    height: 450px;
  }
`

interface Props {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({pokemon, onClick }: Props) {

  return (
    <Card onClick={onClick}>
      <div>
        <Typography variant="h1" color="text.secondary">
          {pokemon.name}
        </Typography>
      </div>
    </Card>
  )

}