import "./App.css";
import { Routes, Route } from "react-router-dom";
import HeaderCom from "./components/HeaderCom";
import Home from "./pages/Home";
import HeaderMovie from "./pages/HeaderMovie";
import SearchPage from "./pages/SearchPage";
import MovieDetail from "./pages/MovieDetail";
import ActorDetail from "./pages/ActorDetail";
import MyList from "./pages/MyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

function App() {
  const toTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <HeaderCom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navi/:ls" element={<HeaderMovie />} />
        <Route path="/navi/mylist" element={<MyList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/person/:who" element={<ActorDetail />} />
      </Routes>
      <div className="main-icon-box">
        <FontAwesomeIcon
          icon={faCircleChevronUp}
          className="fa-solid fa-circle-chevron-up fa-3x"
          onClick={toTheTop}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default App;
