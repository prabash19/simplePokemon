import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Favourites from "./components/favourites/Favourites";
import NotFound from "./helpers/notFound/NotFound";
import Details from "./components/details/Details";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
