import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { getLocalStorageValue } from "../../helpers/localStorage";
import { baseUrl } from "../../constants/baseUrl";
import TableComponent from "../Table/Table";

function Favourites() {
  const [pokemonData, setPokemonData] = useState<number[] | null>([]);
  const [favs, setFavs] = useState<number[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFavs(getLocalStorageValue());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (favs != null) {
        const promises = favs.map(async (id) => {
          const response = await axios.get(`${baseUrl}${id}/`);
          return response.data;
        });
        Promise.all(promises)
          .then((data) => {
            setPokemonData(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    };
    fetchData();
  }, [favs]);

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

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedData = pokemonData?.slice(startIndex, endIndex);

  return (
    <Navbar>
      <TableComponent
        heading={"Favourites"}
        data={paginatedData}
        favs={favs}
        setFavs={setFavs}
        previousPage={handlePreviousPage}
        nextPage={handleNextPage}
      />
    </Navbar>
  );
}

export default Favourites;
