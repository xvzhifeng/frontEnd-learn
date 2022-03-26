import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Index } from "./components/Index/Index";
import NotFound from "./components/pages/NotFound"
import { Axios } from "./components/Axios/Axios";

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
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="/app/*" element={<Index />} />
          <Route path="/404" element={<NotFound/>} />
          {/* <Route path="/Axios" element={<Axios />} /> */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
