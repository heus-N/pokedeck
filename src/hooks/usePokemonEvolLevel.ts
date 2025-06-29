interface EvolutionChain {
  species: { name: string };
  evolves_to: EvolutionChain[];
}

export default function getEvolutionLevel(chain: EvolutionChain | undefined, currentPokemonName: string, level = 1): number {
    if (!chain || !currentPokemonName) return 0;

    // Caso especial: Pokémon não possui evoluções e é o único da cadeia
    if (chain.species.name === currentPokemonName && chain.evolves_to.length === 0 && level === 1) {
        return 0;
    }

    if (chain.species.name === currentPokemonName) {
        return level;
    }

    for (const evolution of chain.evolves_to) {
        const result = getEvolutionLevel(evolution, currentPokemonName, level + 1);
        if (result !== 0) {
            return result;
        }
    }

    return 0;
}
