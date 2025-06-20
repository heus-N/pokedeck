export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Stats {
  name: string;
  url: string
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stats; 
}

export interface Pokemon {
  url?: string;
  id?: number;
  name: string;
  sprites?: {
    front_default: string;
    [key: string]: any;
  };
  types?: PokemonType[];
  stats?: PokemonStats[];
}
