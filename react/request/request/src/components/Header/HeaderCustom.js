import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, Breadcrumb, Image, Input, Space, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "./HeaderCustom.css";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const onSearch = (value) => console.log(value);

export const HeaderCustom = () => {
  return (
    <React.Fragment>
      <Header>
        <Space direction="horizontal" align="start" size="large">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
            className="search"
          />
          <h1 className="header" > 某某管理系统</h1>
          
        </Space>
        <Avatar size="large" icon={<UserOutlined />} className="avatar" alt="头像"/>
      </Header>
    </React.Fragment>
  );
};
