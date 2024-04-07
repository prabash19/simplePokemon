import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Favourites from "./components/favourites/Favourites";
import NotFound from "./helpers/NotFound";
import { baseUrl } from "./helpers/baseUrl";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState();
  const [currentPage, setCurrentPage] = useState(baseUrl);
  const [previousPage, setPreviousPage] = useState<null | string>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
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

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  data={pokemonData}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  setCurrentPage={setCurrentPage}
                />
              }
            />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
