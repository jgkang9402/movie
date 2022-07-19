import React, { useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

const API_KEY = process.env.REACT_APP_API_KEY;
const override = css`
  text-align: center;
`;

const SearchPage = () => {
  let [searchData, setSearchData] = useState([]);
  let [queryPage, setQueryPage] = useState(1);
  let [searchKeyword, setSearchKeyword] = useState("");
  let [totalValue, setTotalValue] = useState(0);
  let keyValue = useRef();
  const navi = useNavigate();
  const { keyword } = useParams();

  const api = async () => {
    console.log(totalValue);
    if (totalValue < queryPage && totalValue > 0) {
      return;
    }
    await axios
      .get(
        keyword == undefined
          ? `https://api.themoviedb.org/3/movie/259316/recommendations?api_key=${API_KEY}&page=${queryPage}`
          : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&page=${queryPage}`
      )
      .then((response) => {
        // if (response.data.total_pages == queryPage) {
        //   setSearchData(response.data.results);
        //   return;
        // }
        // if (response.data.results.length == 0) {
        //   navi(-1);
        //   return;
        // } else {
        console.log(keyword);
        console.log(response);
        // console.log(response.data.results);
        console.log(queryPage);
        console.log(response.data.total_pages);
        setTotalValue(response.data.total_pages);

        const apiData = response.data.results;
        console.log(apiData);
        for (let i = 0; i < apiData.length; i++) {
          apiData[
            i
          ].poster_path = `https://image.tmdb.org/t/p/w500${response.data.results[i].poster_path}`;
        }
        setQueryPage(queryPage + 1);
        if (searchData.length > 0) {
          let copyData = searchData;
          let result = copyData.concat(apiData);
          setSearchData(result);
        } else {
          setSearchData(apiData);
        }
        // }
      });
  };
  const getKeyword = (e) => {
    if (e.keyCode === 13 || e.type == "click") {
      if (keyValue.current.value == "") {
        keyValue.current.focus();
        // console.log(keyValue.current.value);
      } else {
        setSearchKeyword(keyValue.current.value);
        navi(`/search/${keyValue.current.value}`);
        setSearchData([]);
        setQueryPage(1);
      }
    }
  };
  useEffect(() => {
    // console.log(keyword);
    // console.log(queryPage);
    if (keyword != "") {
      setSearchKeyword(keyword);
    }
    api();
  }, [searchKeyword]);
  return (
    <SearchPageWrap className="search-page-wrap">
      <SearchBox className="search-box">
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요."
          ref={keyValue}
          onKeyUp={getKeyword}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="fa-solid fa-magnifying-glass search_icon"
          onClick={getKeyword}
        ></FontAwesomeIcon>
      </SearchBox>
      {keyword == undefined ? (
        <ShowKeyword>오늘 이런영화 어때요? #해리포터</ShowKeyword>
      ) : (
        <ShowKeyword>검색어 : "{searchKeyword}"</ShowKeyword>
      )}{" "}
      {searchData.length == 0 ? (
        <h1>데이터가 없습니다.</h1>
      ) : (
        <InfiniteScroll
          // pageStart={1}
          pageStart={queryPage}
          loadMore={api}
          hasMore={true}
          loader={
            totalValue == queryPage - 1 ? (
              <h2 className="loader">Sorry, No More Data!</h2>
            ) : (
              <BeatLoader
                className="loader"
                css={override}
                size={100}
                color="red"
              />
            )
          }
        >
          <ItemUl>
            {searchData.map((item, idx) => {
              return (
                <ItemLi key={idx}>
                  <Link to={`/detail/${item.id}`}>
                    <img src={item.poster_path} />
                  </Link>
                  <div>{item.original_title}</div>
                </ItemLi>
              );
            })}
          </ItemUl>
        </InfiniteScroll>
      )}{" "}
    </SearchPageWrap>
  );
};

const SearchPageWrap = styled.div`
  position: relative;
  margin-top: 3rem;
  /* left: 1%;
  top: 1%; */
  /* transform: translate(-50%, 0%); */
  /* width: 99%; */
`;
const SearchBox = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
const SearchInput = styled.input`
  width: 30vw;
  height: 7vh;
  /* border: 3px solid green; */
  background-color: #000;
  font-size: 1.5rem;
  padding: 0 0.8rem;
  margin-right: 0.5rem;
  color: #fff;
`;
const ItemUl = styled.ul`
  width: 90vw;
  /* overflow: auto; */
  /* height: 100%; */
  /*
  border: 1px solid #fff; */
  margin: 0 auto;
  padding-bottom: 5rem;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(6, 1fr);
`;
const ItemLi = styled.li`
  width: 12vw;
  height: 35vh;
  /* border: 1px solid #fff; */
  /* margin: 0 0.8rem 0.8rem 0.8rem; */
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 5rem;
  &:hover {
    position: relative;
    transform: scale(130%);
    transition: ease-out 0.3s;
  }
`;
const ShowKeyword = styled.h2`
  text-align: center;
  margin: 1rem 0;
`;

export default SearchPage;
