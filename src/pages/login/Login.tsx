import React from "react";
import "./Login.css";
import { Form, Input, Button } from "element-react";

export function Login() {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <Form className="en-US" labelWidth="120">
        <Form.Item label="User Name">
          <Input />
        </Form.Item>
        <Form.Item label="Password">
          <Input />
        </Form.Item>
        <Button type="primary">Login</Button>
      </Form>
    </div>
  );
}
