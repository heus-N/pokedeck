'use client';

import styled from "styled-components"
import { Pokemon } from "../types/pokemon"
import { Typography } from "@mui/material";
import { useState } from "react";

const Card = styled.div`
  width: 300px;
  height: 350px;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
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
          {/* {pokemon.name} */}
        </Typography>
      </div>
    </Card>
  )

}