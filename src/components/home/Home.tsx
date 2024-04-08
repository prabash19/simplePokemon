import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import TableComponent from "../Table/Table";
import axios from "axios";
import { baseUrl } from "../../helpers/baseUrl";
import { getLocalStorageValue } from "../../helpers/localStorage";
function Home() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState();
  const [currentPage, setCurrentPage] = useState(baseUrl);
  const [previousPage, setPreviousPage] = useState<null | string>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [favs, setFavs] = useState<number[] | null>([]);

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
    setFavs(getLocalStorageValue());
  }, []);
  return (
    <Navbar>
      <TableComponent
        heading="Pokédex"
        data={pokemonData}
        setCurrentPage={setCurrentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        showAddButton={true}
        favs={favs}
        setFavs={setFavs}
      />
    </Navbar>
  );
}

export default Home;
