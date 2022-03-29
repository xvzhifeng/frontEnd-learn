
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from 'antd';
import { GlobalContext } from '../../context/GlobalState';
import { useSearchParams, Navigate,Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import {  useNavigate } from "react-router-dom";



export const EditUser = (route) => {

  const { employees, editEmployee } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({
    key: null,
    name: "",
    age: null,
    address: "",
    tags: [],
  },);

  // 通过route传参
  const currentUserKey = searchParams.get('key');

  useEffect(() => {
    const UserKey = currentUserKey;
    const selectedUser = employees.find(
      (currentEmployeeTraversal) => currentEmployeeTraversal.key === UserKey
    );
    setSelectedUser(selectedUser);
  }, [currentUserKey, employees]);

  const onSubmit = (e) => {
    e.preventDefault();
    editEmployee(selectedUser);
    navigate("/app/user");
  };

  const handleOnChange = (userKey, newValue) =>
    setSelectedUser({ ...selectedUser, [userKey]: newValue });

  if (!selectedUser || !selectedUser.key) {
    return <div>Invalid Employee ID.</div>;
  }

  const onFinish = (values) => {
    console.log(values.tags);
    let value = {...values, "tags":values.tags.split(",")}
    setSelectedUser({...values});
    editEmployee(value);
    navigate("/app/user");
    console.log(selectedUser);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="EditUser"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
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
            message: 'Please input your age!',
          },
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