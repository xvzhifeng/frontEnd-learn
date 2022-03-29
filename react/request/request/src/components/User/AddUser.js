
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from 'antd';
import { GlobalContext } from '../../context/GlobalState';
import { useSearchParams, Navigate,Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import {  useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"


export const AddUser = () => {

  const { employees, addEmployee } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({
    key: null,
    name: "",
    age: null,
    address: "",
    tags: [],
  },);

  const currentUserKey = uuidv4();
  // setSelectedUser({...selectedUser, "key":currentUserKey});

  useEffect(() => {
    const UserKey = currentUserKey;
    setSelectedUser({...selectedUser, "key":UserKey});
  },[]);


  const onFinish = (values) => {
    console.log(values.tags);
    let value = {...values, "tags":values.tags.split(","),"key":currentUserKey}
    setSelectedUser({...values});
    addEmployee(value);
    navigate("/app/user");
    console.log(value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const checkTags = (rule, value, callback) => {
    console.log(value);
    callback(); // 校验通过
  }
  return (
    <Form
      name="addUser"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={selectedUser}
    >
      <Form.Item
        label="key"
        name="key"
        hidden="true"
      >
      </Form.Item>
      <Form.Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          {
            type:"string",min:3
          }
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="age"
        name="age"
        rules={[
          {
            required: true,
            pattern: new RegExp(/^[1-9]\d*$/, "g"),
            message: 'Please input your age!',
          }
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="tags"
        name="tags"
        rules={[
          {
            required: true,
            message: 'Please input your tags!',
          },
          {
            validator:checkTags,
          }
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};