import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";

const HeaderCom = () => {
  let addOn1 = useRef();
  let addOn2 = useRef();
  let addOn3 = useRef();
  let addOn4 = useRef();

  const addClassName = (e) => {
    addOn1.current.classList.remove("on");
    addOn2.current.classList.remove("on");
    addOn3.current.classList.remove("on");
    addOn4.current.classList.remove("on");
    e.target.classList.add("on");
  };

  const test =(e)=>{
    console.log(e.target)
  }
  
  return (
    <header className="header">
      <div className="header_left_box">
        <h1 className="main_logo">
          <Link to={"/"} onClick={addClassName}>
            9FLIX
          </Link>
        </h1>
        <div className="header_movie_contents">
          <Link to={"/navi/now_playing"} ref={addOn1} onClick={addClassName}>
            Now Playing
          </Link>
        </div>
        <div className="header_movie_contents">
          <Link to={"/navi/upcoming"} ref={addOn2} onClick={addClassName}>
            Upcomig
          </Link>
        </div>
        <div className="header_movie_contents">
          <Link to={"/navi/popular"} ref={addOn3} onClick={addClassName}>
            Hottest
          </Link>
        </div>
        <div className="header_movie_contents">
          <Link to={"/navi/mylist"} ref={addOn4} onClick={addClassName}>
            MyList
          </Link>
        </div>
      </div>
      <div className="header_right_box">
        <div className="search_icon_box">
          <Link to={"/search"} className="search_link">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search_icon"
              onClick={addClassName}
            ></FontAwesomeIcon>
          </Link>
        </div>
        <div className="user_box">
          <div className="user" onClick={addClassName}>
            <div className="user_content_box">
              <div onClick={test}>?????????</div>
              <div onClick={test}>????????????</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    // <>
    //   <Navbar bg="dark" variant="dark">
    //     <Container>
    //       <Navbar.Brand>
    //           <Link to={"/"}>GUFLIX</Link>
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="navbarScroll" />

    //       <Nav className="me-auto">
    //         <Link to={"/navi/now_playing"}>Home</Link>
    //         <Link to={"/navi/upcoming"}>Features</Link>
    //         <Link to={"/navi/popular"}>Pricing</Link>
    //       </Nav>
    //       <div className="search_icon_box">
    //         <Link to={"/search"} className="search_link">
    //           <FontAwesomeIcon
    //             icon={faMagnifyingGlass}
    //             className="search_icon"
    //           ></FontAwesomeIcon>
    //         </Link>
    //       </div>
    //     </Container>
    //   </Navbar>
    // </>
  );
};

export default HeaderCom;