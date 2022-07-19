import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ListSlide = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    accessibility: true,
    arrows: true,
    lazyLoad: true,
    initialSlide:7,
    autoplay: true,
    autoplaySpeed: 5000,
    // centerMode: true,
  };

  useEffect(()=>{
    console.log(props);
  },[])
  

  return (
    <div>
      <Slider {...settings} className="slider_box">
        {props.List.map((item, idx) => {
          return (
            <Banner key={idx}>
              <Link to={`/detail/${item.id}`}>
                <ItemImg src={item.poster_path} />
                <MoveBtn>더보기</MoveBtn>
              </Link>
              {/* <h1>{item.title}</h1> */}
              {/* <h3>평점 : {item.vote_average}</h3> */}
              {/* <h2>{item.overview}</h2> */}
            </Banner>
          );
        })}
      </Slider>
    </div>
  );
};

const Banner = styled.div`
  /* margin: 5% auto;
  position: relative;
  width: 100%; */
  /* .slick-prev {
    opacity: 1; 
    color: black; 
    z-index: 2;
    left: 0;
  }
  .slick-next {
    z-index: 2;
    opacity: 1;
    right: 0;
    color: black;
  } */
  margin: 0 1rem;
`;

const MoveBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 5vw;
  height: 5vh;
  background-color: red;
`;
const ItemImg = styled.img`
  /* width: ; */
`;

export default ListSlide;
