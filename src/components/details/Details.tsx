import { useParams } from "react-router";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { PokemonData } from "../../constants/pokemonType";
import LoadingScreen from "../../helpers/LoadingScreen/LoadingScreen";
function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonData | null>();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${baseUrl}${id}/`)
        .then((res) => {
          const {
            abilities,
            base_experience,
            name,
            id,
            weight,
            height,
            sprites,
            types,
          } = res.data;
          setPokemonData({
            abilities,
            base_experience,
            name,
            id,
            weight,
            height,
            sprites,
            types,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("error is", err);
        });
    };
    fetchData();
  }, []);
  console.log("data is", pokemonData);
  return (
    <Navbar>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>{pokemonData?.name}</>
      )}
    </Navbar>
  );
}

export default Details;
