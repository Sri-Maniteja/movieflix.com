import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleToAddWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  const isInWatchlist = watchlist.some((movie) => movie.id === movieObj.id);

  return (
    <div
      className="relative h-[40vh] w-[150px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 cursor-pointer flex flex-col justify-end items-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`,
      }}
    >
      {/* Heart or Cross Icon */}
      {isInWatchlist ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-red-600 text-xl flex items-center justify-center rounded cursor-pointer"
        >
          ❌
        </div>
      ) : (
        <div
          onClick={() => handleToAddWatchlist(movieObj)}
          className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-red-600 text-xl flex items-center justify-center rounded cursor-pointer"
        >
          ❤️
        </div>
      )}

      {/* Movie Title */}
      <div className="bg-black/70 w-full text-white text-center py-1 rounded-b-xl text-sm">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
