import React, { useRef } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

const API_KEY = process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  let [detailData, setDetailData] = useState([]);
  let [actorData, setActorData] = useState([]);
  let [similarData, setSimilarData] = useState([]);
  let [trailarData, setTrailarData] = useState([]);
  let [nowOn, setNowOn] = useState("actor");
  let [like, setLike] = useState(false);
  const refActor = useRef();
  const refSimilar = useRef();
  const refTrailar = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const reduxMyList = useSelector((state) => state.myList);
  const dispatch = useDispatch();
  const goBack = () => {
    navigate(-1);
  };
  const addMyList = () => {
    setLike(!like);
    dispatch({ type: "ADD_MOVIE", payload: { movieDetail: detailData } });
  };
  const removeMyList = () => {
    setLike(!like);
    dispatch({ type: "REMOVE_MOVIE", payload: { movieDetail: detailData } });
  };

  const toTheTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const chooseSection = (e) => {
    // console.log(e);
    // console.log(e.target.innerText);
    // console.log(refActor.current.classList.contains('on'));
    refActor.current.classList.remove("on");
    refSimilar.current.classList.remove("on");
    refTrailar.current.classList.remove("on");
    e.target.classList.add("on");

    if (e.target.innerText == "관련영상") {
      setNowOn("trailar");
      console.log(1);
    } else if (e.target.innerText == "관련영화") {
      setNowOn("similar");
      console.log(2);
    } else {
      setNowOn("actor");
      console.log(3);
    }
  };

  const findDirector = (person) => {
    if (person.known_for_department === "Directing") {
      return person;
    }
  };

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
          // console.log(detail.data);
          // console.log(similar.data.results);
          // console.log(actor.data);
          // console.log(review.data.results);
          console.log(trailar.data.results);
          const apiData = detail.data;
          apiData.poster_path = `https://image.tmdb.org/t/p/w500${detail.data.poster_path}`;
          apiData.backdrop_path = `https://image.tmdb.org/t/p/w500${detail.data.backdrop_path}`;
          setDetailData(apiData);
          for (let i = 0; i < similar.data.results.length; i++) {
            similar.data.results[
              i
            ].poster_path = `https://image.tmdb.org/t/p/w500${similar.data.results[i].poster_path}`;
          }
          setSimilarData(similar.data.results);
          let casts = actor.data.cast.splice(0, 9);
          let crews = actor.data.crew.find(findDirector);
          if (crews != undefined) {
            casts.unshift(crews);
          } else {
            console.log("언디파이인드임");
          }
          console.log(casts);
          setActorData(casts);
          setTrailarData(trailar.data.results);
        })
      );
  };
  useEffect(() => {
    setLike(false);
    for (let i = 0; i < reduxMyList.length; i++) {
      if (reduxMyList[i].id == id) {
        setLike(true);
        return;
      }
    }
  }, [id]);

  useEffect(() => {
    setNowOn("actor");
    refSimilar.current.classList.remove("on");
    refTrailar.current.classList.remove("on");
    refActor.current.classList.add("on");

    api();
    toTheTop();
  }, [id]);
  return (
    <DetailParent
      className="detail_parent_box"
      style={{
        backgroundImage: "url(" + `${detailData.backdrop_path}` + ")",
      }}
    >
      <BackBtn onClick={goBack}>🔙</BackBtn>
      {id == undefined ? (
        <div></div>
      ) : (
        <LikeBtn>
          {like == false ? (
            <span onClick={addMyList}>+</span>
          ) : (
            // <span onClick={addMyList}>➕</span>
            <span onClick={removeMyList}>✔</span>
          )}
        </LikeBtn>
      )}
      <BlurBox className="detail_blur_box">
        <BannerBox className="detail_banner_box">
          <div className="detail_img_box">
            {detailData.poster_path == "https://image.tmdb.org/t/p/w500null" ? (
              <PosterImg src="https://blog.yellowoctopus.com.au/wp-content/uploads/2020/08/yellow-octopus-no-meme-9.jpg" />
            ) : (
              <PosterImg src={detailData.poster_path} />
            )}{" "}
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
            <DetailSection onClick={chooseSection} ref={refActor}>
              감독/배우
            </DetailSection>
            <DetailSection onClick={chooseSection} ref={refSimilar}>
              관련영화
            </DetailSection>
            <DetailSection onClick={chooseSection} ref={refTrailar}>
              관련영상
            </DetailSection>
          </SectionBox>

          {nowOn == "actor" ? (
            // {refActor.current.classList.contains("on") ? (
            <SectionGridBox>
              {actorData.map((item, idx) => {
                return (
                  <SectionGridItem key={idx}>
                    <Link to={`/person/${item.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      />
                    </Link>
                    <h3>{item.name}</h3>
                  </SectionGridItem>
                );
              })}
            </SectionGridBox>
          ) : (
            <div></div>
          )}

          {nowOn == "similar" ? (
            // {refSimilar.current.classList.contains("on") ? (
            <SectionGridBox>
              {similarData.map((item, idx) => {
                return (
                  <Link to={`/detail/${item.id}`} key={idx}>
                    <SectionGridItem>
                      <img src={item.poster_path} />
                    </SectionGridItem>
                  </Link>
                );
              })}
            </SectionGridBox>
          ) : (
            <div></div>
          )}

          {nowOn == "trailar" ? (
            // {refTrailar.current.classList.contains("on") ? (
            <div>
              {trailarData.map((item, idx) => {
                return (
                  <div key={idx}>
                    <h2>{item.name}</h2>
                    <ReactPlayer
                      className="player"
                      // url={item.key}
                      url={`https://www.youtube.com/watch?v=${item.key}`}
                      width="700px"
                      heigth="700px"
                      playing={false}
                      muted={false}
                      controls={true}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
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
const LikeBtn = styled.div`
  cursor: pointer;
  font-size: 5rem;
  position: absolute;
  right: 5%;
  color: red;
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
  display: flex;
  background-color: #1111;
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  justify-content: space-evenly;
  /* padding-bottom: 3rem; */
  /* border-bottom: 1px solid #fff; */
`;
const DetailSection = styled.span`
  margin-left: 5%;
  cursor: pointer;
`;

const SectionGridBox = styled.ul`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid #fff;
  padding-top: 2rem;
`;
const SectionGridItem = styled.li`
  cursor: pointer;
  margin: 0 1rem 1rem 1rem;
`;
export default MovieDetail;
