import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
export const FetchGet = () => {
  const [fetchUser, setfetchUser] = useState({
    id: null,
    name: "",
    flag: "",
  });
  const post = () => {
    fetch(
      "https://mock.presstime.cn/mock/623dd6987bad590021c4cda9/test/getFetchUser",
      {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setfetchUser({...fetchUser,"name":data.data.name});
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };
  useEffect(() => {
    //   setfetchUser({id:1,name:"123",flag:"123"});
  });
  return (
    <React.Fragment>
      {/* 完成一个输出信息得表格 使用mui */}
      <div>
        <h1> fetch </h1>
        <h1>{fetchUser.name}</h1>
        <Button onClick={post}>获取最新数据</Button>
      </div>
    </React.Fragment>
  );
};
