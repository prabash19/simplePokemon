import "./TableComponent.css";
const TableComponent = ({ heading }: { heading: string }) => {
  return (
    <div className="main">
      <div className="table-heading">
        <h2>{heading}</h2>
      </div>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr className="row-color">
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
            </tr>
          </tbody>
        </table>
        <div className="custom-pagination">
          <ol className="custom-pagination-list">
            <li>
              <a href="#" className="custom-pagination-link">
                &lt;&nbsp; <span className="sr-only">Prev Page</span>
              </a>
            </li>

            <li>
              <a href="#" className="custom-pagination-link">
                <span className="sr-only">Next Page</span>
                &nbsp; &gt;
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
