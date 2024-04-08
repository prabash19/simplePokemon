import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { getLocalStorageValue } from "../../helpers/localStorage";
import { baseUrl } from "../../helpers/baseUrl";
import TableComponent from "../Table/Table";
function Favourites() {
  const [pokemonData, setPokemonData] = useState<number[] | null>([]);
  const [favs, setFavs] = useState<number[] | null>([]);
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
  console.log("pokemon favs data is", pokemonData);
  return (
    <Navbar>
      <>Favourites data is</>
      <TableComponent heading={"Favourites"} />
    </Navbar>
  );
}

export default Favourites;
