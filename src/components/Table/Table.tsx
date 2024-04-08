import "./TableComponent.css";
import {
  saveAsFavourites,
  getLocalStorageValue,
  removeFromFavourites,
} from "../../helpers/localStorage";
import { useNavigate } from "react-router-dom";
const TableComponent = ({
  heading,
  data,
  setCurrentPage,
  previousPage,
  nextPage,
  showAddButton,
  favs,
  setFavs,
}: any) => {
  const navigate = useNavigate();
  const updateStorageValues = () => {
    setFavs(getLocalStorageValue());
  };

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
            {data?.map((item: any) => (
              <tr className="row-color" key={item.name}>
                <td>{item?.id}</td>
                <td>
                  <img
                    src={item?.sprites?.other?.home?.front_default}
                    height={50}
                    width={50}
                    alt="Pokemon image"
                  ></img>
                </td>
                <td>{item?.name}</td>
                <td>{item?.weight}</td>
                <td>{item?.height}</td>
                <td>
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
                      {showAddButton == true ? (
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
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                  <button
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
        {showAddButton == true ? (
          <div className="custom-pagination">
            <ol className="custom-pagination-list">
              <li>
                <button
                  className="custom-pagination-link"
                  onClick={() => {
                    setCurrentPage(previousPage);
                  }}
                >
                  &lt;&nbsp; <span className="sr-only">Prev Page</span>
                </button>
              </li>

              <li>
                <button
                  className="custom-pagination-link"
                  onClick={() => {
                    setCurrentPage(nextPage);
                  }}
                >
                  <span className="sr-only">Next Page</span>
                  &nbsp; &gt;
                </button>
              </li>
            </ol>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
