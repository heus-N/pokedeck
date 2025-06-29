interface EvolutionChain {
  species: { name: string };
  evolves_to: EvolutionChain[];
}

export default function getEvolutionLevel(
  chain: EvolutionChain | undefined,
  currentPokemonName: string,
  level = 1
): number {

  if(!currentPokemonName) return 0
  if(chain?.evolves_to === undefined) return 0

  const splitedName = currentPokemonName.split('-')[0]
  //Alguns pokemons não possuem cadeia de evolução, a condição de 'level === 3' é somente para pokemon que possuem a cadeia
  if ( splitedName === chain?.species.name && !chain?.evolves_to?.length ){
    if (level > 1) return level
  }

  if ( splitedName === chain?.species.name && chain.evolves_to.length ){
    return level
  }

  for (const evolution of chain?.evolves_to) {
    const result = getEvolutionLevel(evolution, currentPokemonName, level + 1);
    if (result !== 0) {
      return result;
    }
  }

  return 0;
}
