import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

export const AxiosGet = () => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    flag: "",
  });

  const get = () => {
    axios
      .get(
        "https://mock.presstime.cn/mock/623dd6987bad590021c4cda9/test/getAxiosUser",
        {
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      {/* 完成一个输出信息得表格 使用mui */}
      <div>
        <h1> Axios </h1>
        <h1>{user.name}</h1>
        <Button onClick={get}>获取最新数据</Button>
      </div>
    </React.Fragment>
  );
};
