import React, { useState, useContext, useEffect } from "react";
export const Fetch = () => {
  const [fetchUser, setfetchUser] = useState({
    id: null,
    name: "",
    flag: "",
  });
  const get = () => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
          setfetchUser(data);
      }).catch(error=>{
          console.log(error);
      });
  };
  return (
    <React.Fragment>
    {/* 完成一个输出信息得表格 使用mui */}
      <div>
        <h1> fetch </h1>
      </div>
    </React.Fragment>
  );
};
