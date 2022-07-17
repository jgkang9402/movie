import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MovieList = ({ movieData, ls }) => {
  useEffect(() => {
    console.log(movieData);
    console.log(ls);
  }, [ls]);
  // https://image.tmdb.org/t/p/w500${item.poster_path}
  return (
    <div>
      <ItemUl className="item-box">
        {movieData.map((item, idx) => {
          return (
            <ItemLi key={idx}>
              <Link to={`/detail/${item.id}`}>
                <ItemImg src={item.poster_path} />
              </Link>
              <SubBox>i</SubBox>
            </ItemLi>
          );
        })}
      </ItemUl>
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
  margin: 0 auto;
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

export default MovieList;
