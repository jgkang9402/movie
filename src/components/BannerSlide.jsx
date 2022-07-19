import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BannerSlide = ({ popularData }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    initialSlide: 4,
    // autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...settings}>
        {popularData.map((item, idx) => {
          return (
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path})`,
              }}
              key={idx}
            >
              <div
                className="banner"
                key={idx}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path})`,
                  height: "90vh",
                  width: "100vw",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  position: "relative",
                }}
              >
                <Banner>
                  <h1>{item.title}</h1>
                  <h3>평점 : {item.vote_average}</h3>
                  <h2>{item.overview}</h2>
                  <Link to={`/detail/${item.id}`}>
                    <MoveBtn>더보기</MoveBtn>
                  </Link>
                </Banner>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

const Banner = styled.div`
  position: absolute;
  width: 70%;
  max-width: 50%;
  max-height: 20%;
  bottom: 2%;
  left: 5%;
  overflow: hidden;
`;

const MoveBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 5vw;
  height: 5vh;
  background-color: red;
`;

export default BannerSlide;
