'use client';

import styled from "styled-components"
import { Pokemon } from "../types/pokemon"
import { Typography } from "@mui/material";

const Card = styled.div`
  width: 350px;
  height: 500px;
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
`

interface Props {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export default function PokemonCard({pokemon, onClick }: Props) {
  return (
    <Card >
      <div>
        <Typography variant="h1" color="text.secondary">
          {/* {pokemon.name} */}
        </Typography>
      </div>
    </Card>
  )

}