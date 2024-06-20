import "./login.scss";
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {NavLink} from "react-router-dom";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 550 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
        >
            <Checkbox>Remember me</Checkbox>
             <NavLink className="register" to="/register">
                Register
        </NavLink>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={"btn"} type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>

    </Form>
);

export default Login;