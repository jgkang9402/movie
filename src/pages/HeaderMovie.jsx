import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";

const API_KEY = process.env.REACT_APP_API_KEY;
const HeaderMovie = () => {
  const { ls } = useParams();
  let [movieData, setMovieData] = useState([]);

  const api = async () => {
    const res = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${ls}?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        // console.log(response);
        // console.log(response.data.results);
        const apiData = response.data.results;
        for(let i=0;i<apiData.length;i++){
          apiData[i].poster_path=`https://image.tmdb.org/t/p/w500${response.data.results[i].poster_path}`
        }
        // console.log(apiData);
        setMovieData(apiData);
        return apiData
      });
  };
  useEffect(() => {
    // console.log(ls);
    api();
  }, [ls]);
  return (
    <div>
      <h2>{ls}</h2>
      <MovieList movieData={movieData} ls={ls} />
    </div>
  );
};

export default HeaderMovie;
/* 
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`

  `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1` // popular페이지

  `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1` // upcoming페이지
*/
