import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeaderCom = () => {
  return (
    <header className="header">
      <div className="header_left_box">
        <h1 className="main_logo">
          <Link to={"/"}>GUFLIX</Link>
        </h1>
        <div className="header_movie_contents">
          <Link to={"/navi/now_playing"}>Now Playing</Link>
        </div>
        <div className="header_movie_contents">
          <Link to={"/navi/upcoming"}>Upcomig</Link>
        </div>
        <div className="header_movie_contents">
          <Link to={"/navi/popular"}>Hottest</Link>
        </div>
      </div>
      <div className="header_right_box">
        <div className="search_icon_box">
          <Link to={"/search"} className="search_link">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search_icon"
            ></FontAwesomeIcon>
          </Link>
        </div>
        <div className="user_box">
          <div className="user"></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderCom;
