import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { Home } from "./components/Home";
import { Axios } from "./components/Axios";
import { Fetch } from "./components/Fetch";

function TestFecth() {
  const getData = () => {
    fetch("http://127.0.0.1:10111/menu/getMenu")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        console.log("rest");
      });
  };
  return (
    <div>
      <h1>hello world</h1>
      <button onclick={getData()}>get</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Axios" element={<Axios />} />
          <Route path="/Fetch" element={<Fetch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
