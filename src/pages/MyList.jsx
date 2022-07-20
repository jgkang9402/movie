import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MovieList from "../components/MovieList";

const MyList = () => {
  let reduxMyList = useSelector((state) => state.myList);
  useEffect(() => {
    console.log(reduxMyList);
  }, []);
  return (
    <div>
      {reduxMyList.length==0?<NoListH1>아직 찜한 영화가 없습니다.</NoListH1>:<MovieList movieData={reduxMyList} />}
    </div>
  );
};
const NoListH1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`

export default MyList;
