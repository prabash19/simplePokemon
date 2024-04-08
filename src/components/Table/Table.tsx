import "./TableComponent.css";
import {
  saveAsFavourites,
  getLocalStorageValue,
  removeFromFavourites,
} from "../../helpers/localStorage";
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
              <th>Name</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr className="row-color" key={item.name}>
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
