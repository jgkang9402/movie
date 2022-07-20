import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import BeatLoader from "react-spinners/BeatLoader";
import MovieList from "../components/MovieList";

const API_KEY = process.env.REACT_APP_API_KEY;
const HeaderMovie = () => {
  const { ls } = useParams();
  let [movieData, setMovieData] = useState([]);
  let [queryPage, setQueryPage] = useState(1);

  const api = async () => {
    const res = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${ls}?api_key=${API_KEY}&language=ko&page=${queryPage}`
      )
      .then((response) => {
        // console.log(response);
        // console.log(response.data.results);
        const apiData = response.data.results;
        for (let i = 0; i < apiData.length; i++) {
          apiData[
            i
          ].poster_path = `https://image.tmdb.org/t/p/w500${response.data.results[i].poster_path}`;
        }
        setQueryPage(queryPage + 1);

        if (movieData.length > 0) {
          let copyData = movieData;
          let result = copyData.concat(apiData);
          setMovieData(result);
        } else {
          setMovieData(apiData);
        }

        // console.log(apiData);
        // setMovieData(apiData);
        return apiData;
      });
  };
  useEffect(() => {
    setMovieData([]);
    setQueryPage(1);
  }, [ls]);
  useEffect(() => {
    // console.log(ls);
    api();
  }, []);
  return (
    <div>
      {/* <h2>{ls}</h2> */}
      <InfiniteScroll
        // pageStart={1}
        pageStart={queryPage}
        loadMore={api}
        hasMore={true}
        loader={<BeatLoader className="loader" size={100} color="red" />}
      >
        <MovieList movieData={movieData}/>
        {/* <ItemUl className="item-box">
          {movieData.map((item, idx) => {
            return (
              <ItemLi key={idx}>
                <Link to={`/detail/${item.id}`}>
                  <ItemImg src={item.poster_path} />
                </Link>
                <SubBox></SubBox>
              </ItemLi>
            );
          })}
        </ItemUl> */}
      </InfiniteScroll>
    </div>
  );
};

const SubBox = styled.div`
  /* background-color: red; */
  height: 20%;
  position: relative;
  z-index: 3;
  top: 0%;
  &ItemLi:hover {
    top: -40%;
  }
`;
const ItemUl = styled.ul`
  display: grid;
  margin: 2rem auto 5rem auto;
  grid-template-columns: repeat(5, 1fr);
  width: 95%;
  max-width: 100%;
  min-height: 100%;
  margin-bottom: 5rem;
`;
let ItemLi = styled.li`
  width: 80%;
  height: 100%;
  /* border: 1px solid #fff; */
  /* border-radius: 5px; */
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 5%;
  cursor: pointer;
  &:hover {
    position: relative;
    transform: scale(130%);
    z-index: 1;
    transition: ease-out 0.3s;
  }
`;
let ItemImg = styled.img`
  max-width: 100%;
  height: 95%;
`;

export default HeaderMovie;
/* 
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`

  `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1` // popular페이지

  `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1` // upcoming페이지
*/
