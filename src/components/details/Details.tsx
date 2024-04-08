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
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<PokemonData | null>();
  const [savedPokemonID, setsavedPokemonID] = useState<number[] | null>([]);
  useEffect(() => {
    setsavedPokemonID(getLocalStorageValue());
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
    setsavedPokemonID(getLocalStorageValue());
  };
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
                <h2>Pokémon Name: &nbsp;&nbsp;{pokemonData?.name}</h2>
                <h2>Pokémon Weight: &nbsp;&nbsp;{pokemonData?.weight}</h2>
                <h2>Pokémon height: &nbsp;&nbsp;{pokemonData?.height}</h2>
                <h2>
                  Pokémon Experience: &nbsp;&nbsp;{pokemonData?.base_experience}
                </h2>
                <h2>
                  Pokémon Ability: &nbsp;&nbsp;
                  {pokemonData?.abilities[0].ability?.name}
                </h2>
                <h2>
                  Pokémon Type: &nbsp;&nbsp;{pokemonData?.types[0].type?.name}
                </h2>

                {savedPokemonID?.includes(pokemonData.id) ? (
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
