import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import {
  saveAsFavourites,
  getLocalStorageValue,
  removeFromFavourites,
} from "../../helpers/localStorage";
import TableComponent from "../Table/Table";
function Home({ data, previousPage, nextPage, setCurrentPage }: any) {
  const [favs, setFavs] = useState<number[] | null>([]);
  const updateStorageValues = () => {
    setFavs(getLocalStorageValue());
  };
  useEffect(() => {
    setFavs(getLocalStorageValue());
  }, []);
  console.log("favs is", favs);
  return (
    <Navbar>
      <>
        <ul style={{ listStyleType: "none" }}>
          {data.map((item: any) => (
            <div style={{ display: "flex" }} key={item.name}>
              name: <li>{item.name}</li>
              weight: <li>{item.weight}</li>
              id:<li>{item.id}</li>
              {favs?.includes(item.id) ? (
                <button
                  onClick={() => {
                    removeFromFavourites(item.id);
                    updateStorageValues();
                  }}
                >
                  remove
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      saveAsFavourites(item.id);
                      updateStorageValues();
                    }}
                  >
                    add
                  </button>
                </>
              )}
            </div>
          ))}
        </ul>
        <button
          onClick={() => {
            setCurrentPage(previousPage);
            updateStorageValues();
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            setCurrentPage(nextPage);
          }}
        >
          next
        </button>
        <TableComponent heading="Pokédex" />
      </>
    </Navbar>
  );
}

export default Home;
