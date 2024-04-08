import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import TableComponent from "../table/Table";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { getLocalStorageValue } from "../../helpers/localStorage";
import { PokemonData } from "../../constants/pokemonType";
import LoadingScreen from "../../helpers/LoadingScreen/LoadingScreen";
function Home() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [currentPage, setCurrentPage] = useState(baseUrl);
  const [previousPage, setPreviousPage] = useState<null | string>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [savedPokemonID, setsavedPokemonID] = useState<number[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(currentPage);
        const data = response.data;
        const results = data.results;
        const promises = results.map(async (pokemon: any) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const pokemonData = pokemonResponse.data;
          return {
            ...pokemon,
            ...pokemonData,
          };
        });
        const mergedPokemonData: any = await Promise.all(promises);
        setPokemonData(mergedPokemonData);
        setPreviousPage(data.previous);
        setNextPage(data.next);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    setsavedPokemonID(getLocalStorageValue());
  }, []);
  return (
    <Navbar>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <TableComponent
            heading="Pokédex"
            data={pokemonData}
            setCurrentPage={setCurrentPage}
            previousPage={previousPage}
            nextPage={nextPage}
            showAddButton={true}
            savedPokemonID={savedPokemonID}
            setsavedPokemonID={setsavedPokemonID}
          />
        </>
      )}
    </Navbar>
  );
}

export default Home;
