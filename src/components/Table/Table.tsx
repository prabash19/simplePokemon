import "./TableComponent.css";
import {
  saveAsFavourites,
  getLocalStorageValue,
  removeFromFavourites,
} from "../../helpers/localStorage";
import { useNavigate } from "react-router-dom";
import { PokemonData } from "../../constants/pokemonType";
import { TableComponentProps } from "../../constants/pokemonType";

const TableComponent = ({
  heading,
  data,
  savedPokemonID,
  showAddButton,
  startIndex,
  previousPage,
  nextPage,
  setsavedPokemonID,
  handlePreviousPage,
  handleNextPage,
  setCurrentPage,
}: TableComponentProps) => {
  const navigate = useNavigate();
  const updateStorageValues = () => {
    setsavedPokemonID(getLocalStorageValue());
  };
  const handleNextPageMutiple = () => {
    if (showAddButton == true && setCurrentPage && nextPage) {
      setCurrentPage(nextPage);
    } else if (handleNextPage) {
      handleNextPage();
    } else {
    }
  };
  const handlePreviousPageMultiple = () => {
    if (showAddButton == true && setCurrentPage && previousPage) {
      setCurrentPage(previousPage);
    } else if (handlePreviousPage) {
      handlePreviousPage();
    } else {
    }
  };
  console.log("start index is", startIndex);
  return (
    <div className="main">
      <div className="table-heading">
        <h2>{heading}</h2>
      </div>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: PokemonData, index: number) => (
              <tr className="row-color" key={item.name}>
                {showAddButton == true ? (
                  <>
                    <td>{item.id}</td>
                  </>
                ) : (
                  <>
                    {startIndex != undefined && (
                      <td>{startIndex + index + 1}</td>
                    )}
                  </>
                )}

                <td>
                  <img
                    src={item?.sprites?.front_default}
                    height={50}
                    width={50}
                    alt="Pokemon image"
                  ></img>
                </td>
                <td>{item?.name}</td>
                <td>{item?.weight}</td>
                <td>{item?.height}</td>
                <td
                  style={{
                    justifyContent: "end",
                    height: "auto",
                  }}
                >
                  {savedPokemonID.length > 0 &&
                  savedPokemonID?.includes(item.id) ? (
                    <button
                      className="deleteButton"
                      onClick={() => {
                        removeFromFavourites(item.id);
                        updateStorageValues();
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <>
                      {showAddButton == true ? (
                        <>
                          <button
                            className="addButton"
                            onClick={() => {
                              saveAsFavourites(item.id);
                              updateStorageValues();
                            }}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                  <button
                    className="detailsButton"
                    onClick={() => {
                      navigate(`/details/${item.id}`);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="custom-pagination">
          <ol className="custom-pagination-list">
            <li>
              <button
                className="custom-pagination-link"
                onClick={() => {
                  handlePreviousPageMultiple();
                }}
              >
                &lt;&nbsp; <span className="sr-only">Prev Page</span>
              </button>
            </li>

            <li>
              <button
                className="custom-pagination-link"
                onClick={() => {
                  handleNextPageMutiple();
                }}
              >
                <span className="sr-only">Next Page</span>
                &nbsp; &gt;
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
