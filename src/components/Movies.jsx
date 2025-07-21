import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleToAddWatchlist, handleRemoveFromWatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setPageNo((prev) => prev + 1);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=99623147fae8f31fe2aa4817735c750c&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl font-bold text-center mb-4">Trending Movies</div>

      {loading ? (
        <div className="text-center mt-10 text-xl text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-row flex-wrap justify-around gap-4 m-10">
          {movies.map((movieObj) => (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleToAddWatchlist={handleToAddWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          ))}
        </div>
      )}

      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
}

export default Movies;
