import { EvolutionChain } from "./usePokemonEvolLevel";

export default function isLastEvolution(chain: EvolutionChain | undefined, pokemonName: string): boolean {
  if (!chain) return false;

  const simplifiedName = pokemonName.split('-')[0];

  function checkIsLast(node: EvolutionChain): boolean {
    if (node.species.name === simplifiedName) {
      return node.evolves_to.length === 0;
    }

    return node.evolves_to.some(evolution => checkIsLast(evolution));
  }

  return checkIsLast(chain);
}
