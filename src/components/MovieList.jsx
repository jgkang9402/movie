import React from "react";
import { useEffect } from "react";

const MovieList = ({ movieData, ls }) => {
  useEffect(() => {
    console.log(movieData);
    console.log(ls);
  }, [ls]);
  // https://image.tmdb.org/t/p/w500${item.poster_path}
  return (
    <div>
      <ul className="item-box">
        {movieData.map((item,idx) => {
          return (
            <li key={idx}>
              <img src={item.poster_path} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
