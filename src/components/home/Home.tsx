import Navbar from "../navbar/Navbar";
import { saveAsFavourites } from "../../helpers/localStorage";
function Home({ data, previousPage, nextPage, setCurrentPage }: any) {
  console.log("pokemon data is", data);
  return (
    <Navbar>
      <>
        <ul style={{ listStyleType: "none" }}>
          {data.map((item: any) => (
            <div style={{ display: "flex" }} key={item.name}>
              name: <li>{item.name}</li>
              weight: <li>{item.weight}</li>
              <button onClick={() => saveAsFavourites(item.id)}>add</button>
            </div>
          ))}
        </ul>
        <button
          onClick={() => {
            setCurrentPage(previousPage);
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
      </>
    </Navbar>
  );
}

export default Home;
