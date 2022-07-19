import "./App.css";
import { Routes, Route } from "react-router-dom";
import HeaderCom from "./components/HeaderCom";
import Home from "./pages/Home";
import HeaderMovie from "./pages/HeaderMovie";
import SearchPage from "./pages/SearchPage";
import MovieDetail from "./pages/MovieDetail";
import ActorDetail from "./pages/ActorDetail";

function App() {
  return (
    <div className="App">
      <HeaderCom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navi/:ls" element={<HeaderMovie />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/person/:who" element={<ActorDetail />} />
      </Routes>
    </div>
  );
}

export default App;
