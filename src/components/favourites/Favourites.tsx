import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { getLocalStorageValue } from "../../helpers/localStorage";
import { baseUrl } from "../../constants/baseUrl";
import TableComponent from "../table/Table";
import { PokemonData } from "../../constants/pokemonType";
import LoadingScreen from "../../helpers/LoadingScreen/LoadingScreen";

function Favourites() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [savedPokemonID, setsavedPokemonID] = useState<number[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex: number = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedData = pokemonData?.slice(startIndex, endIndex);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (pokemonData != null) {
      const totalPages = Math.ceil(pokemonData.length / 10);
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };
  useEffect(() => {
    setsavedPokemonID(getLocalStorageValue());
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (savedPokemonID != null) {
        const promises = savedPokemonID.map(async (id) => {
          const response = await axios.get(`${baseUrl}${id}/`);
          return response.data;
        });
        Promise.all(promises)
          .then((data) => {
            setPokemonData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    };
    fetchData();
  }, [savedPokemonID]);
  return (
    <Navbar>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          {pokemonData && (
            <TableComponent
              heading={"Favourites"}
              data={paginatedData}
              savedPokemonID={savedPokemonID}
              setsavedPokemonID={setsavedPokemonID}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              showAddButton={false}
              startIndex={startIndex}
            />
          )}
        </>
      )}
    </Navbar>
  );
}

export default Favourites;
