export function getMinLevelToEvolve(chain: any, currentName: string): number | null {
    if (!chain) return null;

    for (const evo of chain.evolves_to) {
      if (chain.species.name === currentName) {
        return evo.evolution_details?.[0]?.min_level ?? 0;
      }

      // Busca recursivamente nas evoluções
      const level = getMinLevelToEvolve(evo, currentName);
      if (level !== null) return level;
    }

    return null;
  }