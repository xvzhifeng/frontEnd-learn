import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from 'antd';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from "react-router-dom";



export const User = () => {
  const { employees, removeEmployee, initEmployee } = useContext(GlobalContext);

  const getUSer = () =>{
    axios.post("https://mock.presstime.cn/mock/623dd6987bad590021c4cda9/test/getUser")
      .then(function(res) {
        console.log(employees);
        console.log(res);
        let newUser = res.data.data.concat(employees.slice());
        initEmployee(newUser);
      }).catch(function(error){
        console.log(error);
      })
  }

  const post = () => {
    axios
      .post(
        "https://mock.presstime.cn/mock/623dd6987bad590021c4cda9/test/getUser",
        {
          // mode: "cors",
          // credentials: "include",
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          // },
        }
      )
      .then(function (response) {
        // setUser(response.data.data);
        console.log(response);
        console.log(employees);
        initEmployee(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      {/* 完成一个输出信息得表格 使用mui */}
      <div>
        <UserTable data={employees} remove={(key)=>removeEmployee(key)} />
        {/* <h1> Axios </h1>
        <h1>{user.name}</h1> */}
        <Button onClick={post}>获取最新数据</Button>
      </div>
    </React.Fragment>
  );
};

function UserTable(props) {

  const {removeEmployee } = useContext(GlobalContext);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'C++') {
              color = 'volcano';
            }
            if (tag === 'java') {
              color = 'geekblue';
            }
            if (tag === 'python') {
              color = 'red';
            }
            if (tag === 'C#') {
              color = 'yellow';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a> <Link to={"/app/user/edit?key="+record.key}>Edit {record.name}</Link></a>
          <a onClick={()=>removeEmployee(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  for(let i = 0; i<65;i++) {
    data.push({
      key: i+6,
      name: 'John Brown' + i,
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    })
  }
  
  return(
    <React.Fragment>
      <Table columns={columns} dataSource={props.data} />
    </React.Fragment>
  );
}
