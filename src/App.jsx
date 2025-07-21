import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [watchlist, setWatchList] = useState([]);

  // Add movie to watchlist and save to localStorage
  const handleToAddWatchlist = (movieObj) => {
    const newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("MovieFlix", JSON.stringify(newWatchlist));
    setWatchList(newWatchlist);
  };

  // Remove movie from watchlist and update localStorage
  const handleRemoveFromWatchlist = (movieObj) => {
    const updatedList = watchlist.filter((movie) => movie.id !== movieObj.id);
    localStorage.setItem("MovieFlix", JSON.stringify(updatedList));
    setWatchList(updatedList);
  };

  // Load watchlist from localStorage on first render
  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("MovieFlix");
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                watchlist={watchlist}
                handleToAddWatchlist={handleToAddWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              setWatchList={setWatchList}         // ✅ this was missing
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
