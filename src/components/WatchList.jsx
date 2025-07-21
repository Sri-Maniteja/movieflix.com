import React, { useEffect, useState } from "react";
import genres from "../Utility/Genre";

function WatchList({ watchlist, setWatchList, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [genreList, setGenreList] = useState(["All Genres"]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortIncreasing = () => {
    const sorted = [...watchlist].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...watchlist].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList(sorted);
  };

  useEffect(() => {
    const genreNames = watchlist
      .map((movie) => genres[movie.genre_ids?.[0]])
      .filter((g) => g !== undefined);

    const uniqueGenres = ["All Genres", ...new Set(genreNames)];
    setGenreList(uniqueGenres);
  }, [watchlist]);

  const filteredWatchlist = watchlist
    ?.filter((movie) =>
      movie.original_title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((movie) => {
      if (selectedGenre === "All Genres") return true;
      return genres[movie.genre_ids?.[0]] === selectedGenre;
    });

  return (
    <>
      {/* Genre Buttons */}
      <div className="flex justify-center flex-wrap m-4 gap-2">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          className="h-[2rem] w-[20rem] bg-gray-200 rounded-xl outline-none px-4"
          type="text"
          placeholder="Search Movies"
        />
      </div>

      {/* Watchlist Table */}
      <div className="border border-gray-200 m-8">
        {filteredWatchlist && filteredWatchlist.length > 0 ? (
          <table className="w-full text-gray-500 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>
                  <div className="flex items-center justify-center gap-2">
                    <i
                      className="fa-solid fa-arrow-up cursor-pointer"
                      onClick={sortIncreasing}
                      title="Sort by rating ascending"
                    ></i>
                    <span>Ratings</span>
                    <i
                      className="fa-solid fa-arrow-down cursor-pointer"
                      onClick={sortDecreasing}
                      title="Sort by rating descending"
                    ></i>
                  </div>
                </th>
                <th>Popularity</th>
                <th>Genres</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredWatchlist.map((movie) => (
                <tr key={movie.id} className="border-b-2">
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="h-[6rem] w-[10rem] object-cover"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          : "https://via.placeholder.com/100x150?text=No+Image"
                      }
                      alt={movie.original_title}
                    />
                    <div className="mx-10">{movie.original_title}</div>
                  </td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>
                    {movie.genre_ids
                      ?.map((id) => genres[id] || "Unknown")
                      .join(", ")}
                  </td>
                  <td
                    className="text-red-800 cursor-pointer"
                    onClick={() => handleRemoveFromWatchlist(movie)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-8 text-gray-500 text-lg">
            No movies found in your watchlist.
          </div>
        )}
      </div>
    </>
  );
}

export default WatchList;
