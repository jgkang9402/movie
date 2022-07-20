import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import BannerSlide from "../components/BannerSlide";
import ListSlide from "../components/ListSlide";
import { css } from "@emotion/react";

const API_KEY = process.env.REACT_APP_API_KEY;
const override = css`
  text-align: center;
`;
const Home = () => {
  let [popularData, setPopularData] = useState([]);
  let [nowList, setNowList] = useState([]);
  let [upcomingList, setUpcomingList] = useState([]);
  const api = async () => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
        ),
      ])
      .then(
        axios.spread((popular, now, upcoming) => {
          // axios.spread((...res) => {
          //   console.log(res);
          for (let i = 0; i < popular.data.results.length; i++) {
            popular.data.results[
              i
            ].poster_path = `https://image.tmdb.org/t/p/w500${popular.data.results[i].poster_path}`;
            now.data.results[
              i
            ].poster_path = `https://image.tmdb.org/t/p/w500${now.data.results[i].poster_path}`;
            upcoming.data.results[
              i
            ].poster_path = `https://image.tmdb.org/t/p/w500${upcoming.data.results[i].poster_path}`;
          }
          // console.log(popular.data.results);
          // console.log(now.data.results);
          setPopularData(popular.data.results.splice(0, 10));
          setNowList(now.data.results.splice(0, 18));
          setUpcomingList(upcoming.data.results.splice(0, 18));
        })
      )
      .catch((err) => {
        console.log(err);
        // this.$router.push("/404page");
      }); // axios여러개 끝
  };
  useEffect(() => {
    api();
  }, []);
  return (
    <div>
      {popularData.length == 0 ? (
        <BeatLoader className="loader" css={override} size={100} color="red" />
      ) : (
        <div>
          <BannerSlide popularData={popularData} />
          <h1>현재상영작</h1>
          <ListSlide List={nowList} />
          <h1>개봉예정작</h1>
          <ListSlide List={upcomingList} />
        </div>
      )}
    </div>
  );
};

export default Home;
