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

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const api = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/person/${who}/movie_credits?api_key=${API_KEY}`
      )
      .then((response) => {
        console.log(response.data.cast);
        for (let i = 0; i < response.data.cast.length; i++) {
          response.data.cast[
            i
          ].poster_path = `https://image.tmdb.org/t/p/w500${response.data.cast[i].poster_path}`;
        }
        // const sortarr= response.data.cast.sort(sortList(response.data.cast.original_title));
        // const sortarr = response.data.cast.sort((a, b) =>
        //   a.original_title.sortList(b.original_title)
        // );
        const sortarr = response.data.cast.sort((a, b) => {
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
        // setPersonData(response.data.cast);
      });
  };
  useEffect(() => {
    api();
  }, []);

  return (
    <div>
      <BackBtn onClick={goBack}>🔙</BackBtn>

      <SectionGridBox>
        {personData.map((item, idx) => {
          return (
            <SectionGridItem key={idx}>
              <img
                src={item.poster_path}
                onClick={() => navigate(`/detail/${item.id}`)}
              />
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

export default ActorDetail;
