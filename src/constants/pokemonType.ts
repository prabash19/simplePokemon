export interface PokemonData {
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  name: string;
  id: number;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}
