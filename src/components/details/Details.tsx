import { useParams } from "react-router";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { PokemonData } from "../../constants/pokemonType";
import LoadingScreen from "../../helpers/LoadingScreen/LoadingScreen";
import "./DetailsStyles.css";
import {
  saveAsFavourites,
  getLocalStorageValue,
  removeFromFavourites,
} from "../../helpers/localStorage";
function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonData | null>();
  const [favs, setFavs] = useState<number[] | null>([]);
  useEffect(() => {
    setFavs(getLocalStorageValue());
  }, []);
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
  const updateStorageValues = () => {
    setFavs(getLocalStorageValue());
  };
  console.log("data is", pokemonData);
  return (
    <Navbar>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          {pokemonData && (
            <div className="detailsMain">
              <div className="detailsLeft">
                <img
                  src={pokemonData?.sprites?.front_default}
                  className="detailImage"
                  height={370}
                  width={270}
                />
              </div>
              <div className="detailsRight">
                <h2>Pokemon Name: &nbsp;&nbsp;{pokemonData?.name}</h2>
                <h2>Pokemon Weight: &nbsp;&nbsp;{pokemonData?.weight}</h2>
                <h2>Pokemon height: &nbsp;&nbsp;{pokemonData?.height}</h2>
                <h2>
                  Pokemon Experience: &nbsp;&nbsp;{pokemonData?.base_experience}
                </h2>
                <h2>
                  Pokemon Ability: &nbsp;&nbsp;
                  {pokemonData?.abilities[0].ability?.name}
                </h2>
                <h2>
                  Pokemon Type: &nbsp;&nbsp;{pokemonData?.types[0].type?.name}
                </h2>

                {favs?.includes(pokemonData.id) ? (
                  <button
                    className="deleteButton"
                    onClick={() => {
                      removeFromFavourites(pokemonData.id);
                      updateStorageValues();
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <>
                    <button
                      className="addButton"
                      onClick={() => {
                        saveAsFavourites(pokemonData.id);
                        updateStorageValues();
                      }}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Navbar>
  );
}

export default Details;
