import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import { HeaderCustom } from "../Header/HeaderCustom";
import { Link } from "react-router-dom";
import CRouter from "../Routes/CRouter";
import { Axios } from "../Axios/Axios";
import { Fetch } from "../Fetch/FetchGet";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// export const Index = () => {
//   return (
//     <React.Fragment>
//       {/* 完成一个输出信息得表格 使用mui */}
//       <div>
//         <h1> Axios </h1>
//       </div>
//     </React.Fragment>
//   );
// }

export class Index extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["/app/axios/post"]} mode="inline">
            <SubMenu key="Axios" icon={<PieChartOutlined />}  title="Axios">
              <Menu.Item key="/app/axios/get" icon={<PieChartOutlined />}>
                <Link to="/app/axios/get">get</Link>
              </Menu.Item>
              <Menu.Item key="/app/axios/post" icon={<PieChartOutlined />}>
                <Link to="/app/axios/post">post</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="fetch" icon={<PieChartOutlined />}  title="Fetch">
              <Menu.Item key="/app/fetch/get" icon={<PieChartOutlined />}>
                <Link to="/app/fetch/get">get</Link>
              </Menu.Item>
              <Menu.Item key="/app/fetch/post" icon={<PieChartOutlined />}>
                <Link to="/app/fetch/post">post</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/app/fetch">Fetch</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <HeaderCustom
            className="site-layout-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Axios</Breadcrumb.Item>
              {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <CRouter></CRouter>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
