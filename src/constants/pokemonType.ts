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
export interface CommonTableComponentProps {
  heading: string;
  data: PokemonData[] | null;
  savedPokemonID: number[];
  showAddButton: boolean;
  setsavedPokemonID: (ids: number[] | []) => void;
}
export interface HomeTableProps {
  previousPage?: string | null;
  nextPage?: string | null;
  setCurrentPage?: (nextPage: string) => void;
}
export interface FavouritesTableProps {
  startIndex?: number;
  handlePreviousPage?: () => void;
  handleNextPage?: () => void;
}
export interface TableComponentProps
  extends CommonTableComponentProps,
    HomeTableProps,
    FavouritesTableProps {}
