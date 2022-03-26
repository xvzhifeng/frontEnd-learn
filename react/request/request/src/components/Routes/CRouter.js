import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { FetchGet } from "../Fetch/FetchGet";
import { AxiosGet } from "../Axios/AxiosGet";
import { AxiosPost } from "../Axios/AxiosPost";
import { FetchPost } from "../Fetch/FetchPost";

function CRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/app/axios/get" />} />
        <Route path="/axios/get" element={<AxiosGet />} />
        <Route path="/axios/post" element={<AxiosPost />} />
        <Route path="/fetch/post" element={<FetchPost />} />
        <Route path="/fetch/get" element={<FetchGet />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default CRouter;
