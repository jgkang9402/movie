import React, { useRef } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

const API_KEY = process.env.REACT_APP_API_KEY;
const ActorDetail = ({}) => {
  const { who } = useParams();
  let [personData, setPersonData] = useState([]);
  let [profile, setProfile] = useState({});

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const api = async () => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/person/${who}/movie_credits?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/person/${who}?api_key=${API_KEY}`
        ),
      ])
      .then(
        axios.spread((movieList, personDetail) => {
          console.log(movieList.data.cast);
          // console.log(personDetail.data);

          setProfile(personDetail.data);
          for (let i = 0; i < movieList.data.cast.length; i++) {
            movieList.data.cast[
              i
            ].poster_path = `https://image.tmdb.org/t/p/w500${movieList.data.cast[i].poster_path}`;
          }
          // const sortarr= movieList.data.cast.sort(sortList(movieList.data.cast.original_title));
          // const sortarr = movieList.data.cast.sort((a, b) =>
          //   a.original_title.sortList(b.original_title)
          // );
          const sortarr = movieList.data.cast.sort((a, b) => {
            let x = a.original_title;
            let y = b.original_title;
            // let x = a.original_title.toLowerCase;
            // let y = b.original_title.toLowerCase;
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          });
          console.log(sortarr);
          setPersonData(sortarr);
          // setPersonData(movieList.data.cast);
        })
      );
  };
  useEffect(() => {
    api();
  }, []);

  return (
    <div>
      <BackBtn onClick={goBack}>🔙</BackBtn>

      <h1 className="profile_h1">Information</h1>
      <ProfileGridBox>
        <ProfileImgBox>
          {profile.profile_path == null ? (
            <img src="https://blog.yellowoctopus.com.au/wp-content/uploads/2020/08/yellow-octopus-no-meme-9.jpg" />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${profile.profile_path}`}
            />
          )}
        </ProfileImgBox>
        <ProfileBox>
          <h1>{profile.name}</h1>
          <h3>
            {profile.birthday}, {profile.place_of_birth}
          </h3>
          <h6>{profile.biography}</h6>
        </ProfileBox>
      </ProfileGridBox>

      <h1 className="profile_h1">Films</h1>
      <SectionGridBox>
        {personData.map((item, idx) => {
          return (
            <SectionGridItem key={idx}>
              {item.poster_path == "https://image.tmdb.org/t/p/w500null" ? (
                <NoImg
                  src="https://blog.yellowoctopus.com.au/wp-content/uploads/2020/08/yellow-octopus-no-meme-9.jpg"
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
              ) : (
                <img
                  src={item.poster_path}
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
              )}{" "}
              <h2>{item.original_title}</h2>
            </SectionGridItem>
          );
        })}
      </SectionGridBox>
    </div>
  );
};
const BackBtn = styled.span`
  cursor: pointer;
  font-size: 40px;
  position: absolute;
  left: 5px;
`;

const ProfileGridBox = styled.div`
  display: flex;
  height: 60vh;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
`;
const ProfileImgBox = styled.div`
  width: 30%;
  /* height: 100%; */
`;
const ProfileBox = styled.div`
  width: 50%;
`;

const SectionGridBox = styled.ul`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  /* border-top: 1px solid #fff; */
  /* padding-top: 2rem; */
`;
const SectionGridItem = styled.li`
  cursor: pointer;
  margin: 0 1rem 1rem 1rem;
`;

const NoImg = styled.img`
  height: 80%;
`;
export default ActorDetail;
