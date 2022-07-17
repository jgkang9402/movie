import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  let [detailData, setDetailData] = useState([]);
  let [actorData, setActorData] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const api = async () => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko` //detail
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1` //similar
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US` // 출연진,감독,영화속이름
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1` // 평점,리뷰
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US` // 유튜브
        ),
      ])
      .then(
        axios.spread((detail, similar, actor, review, trailar) => {
          console.log(detail.data);
          console.log(similar.data.results);
          console.log(actor.data);
          console.log(review.data.results);
          console.log(trailar.data.results);
          const apiData = detail.data;
          apiData.poster_path = `https://image.tmdb.org/t/p/w500${detail.data.poster_path}`;
          apiData.backdrop_path = `https://image.tmdb.org/t/p/w500${detail.data.backdrop_path}`;
          setDetailData(apiData);
          setActorData(actor);
        })
      );
  };

  useEffect(() => {
    // console.log(id);
    api();
  }, []);
  return (
    <DetailParent
      className="detail_parent_box"
      style={{
        backgroundImage: "url(" + `${detailData.backdrop_path}` + ")",
      }}
    >
      <BackBtn onClick={goBack}>🔙</BackBtn>
      <BlurBox className="detail_blur_box">
        <BannerBox className="detail_banner_box">
          <div className="detail_img_box">
            <PosterImg src={detailData.poster_path} />
          </div>
          <h1>{detailData.title}</h1>
          <h4>개봉일 : {detailData.release_date}</h4>
          <h5>평점 : {detailData.vote_average}</h5>
          <div className="genre_box">
            {detailData.genres == undefined
              ? ""
              : detailData.genres.map((item, idx) => (
                  <Genres key={idx}>{item.name}</Genres>
                ))}
          </div>
          <p>{detailData.overview}</p>
        </BannerBox>
        <div>
          <SectionBox>
            <DetailSection>감독/배우</DetailSection>
            <DetailSection>관련영화</DetailSection>
            <DetailSection>관련영상</DetailSection>
          </SectionBox>
          <ul>
            
            <li></li>
          </ul>
          {/* <ul>
            {actorData.cast.length == 0
              ? <div></div>
              : actorData.cast.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <h3>{item.name}</h3>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      />
                    </li>
                  );
                })}
          </ul> */}
        </div>
      </BlurBox>
    </DetailParent>
  );
};

const DetailParent = styled.div`
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: 120vw;
  background-position-x: 50%;
  position: relative;
`;

const BackBtn = styled.span`
  cursor: pointer;
  font-size: 40px;
  position: absolute;
  left: 5px;
`;

const BlurBox = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  min-height: 100vh;
  text-align: center;
`;

const BannerBox = styled.div`
  text-align: center;
  padding-top: 10vh;
`;
const PosterImg = styled.img`
  display: inline-block;
  height: 60vh;
`;

const Genres = styled.span`
  display: inline-block;
  min-width: 5%;
  background-color: red;
  margin: 1rem 0.5rem;
`;

const SectionBox = styled.section`
  text-align: center;
  margin-top: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #fff;
`;
const DetailSection = styled.span`
  margin-left: 5%;
  cursor: pointer;
`;
export default MovieDetail;
