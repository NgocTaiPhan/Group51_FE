import "./login.scss";
import React from 'react';
import axios from 'axios';
import {Button, Checkbox, Form, Input} from 'antd';
import {NavLink, useNavigate} from 'react-router-dom';

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}

const Login: React.FC = () => {
    const navigate = useNavigate(); // Hook để chuyển hướng

    const onFinish = async (values: LoginFormValues) => {
        console.log('Input:', values);
        try {
            const response = await axios.get('http://localhost:3002/users', {
                params: {
                    username: values.username,
                    password: values.password
                }
            });
            const user = response.data.find((user: any) => user.username === values.username && user.password === values.password);
            if (user) {
                console.log('Login successful:', user);
                // Lưu thông tin người dùng vào localStorage hoặc sessionStorage tùy thuộc vào trường remember
                if (values.remember) {
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(user));
                }
                // Chuyển hướng đến trang chính
                navigate('/');
            } else {
                console.error('Invalid username or password');
                // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, v.v.)
            }
        } catch (error) {
            console.error('There was an error!', error);
            // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, v.v.)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 5}}
            wrapperCol={{span: 16}}
            style={{ maxWidth: '550px', marginTop: '5%', }}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{required: true, message: 'Hãy điền tên đăng nhập'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{required: true, message: 'Hãy điền mật khẩu'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName=""
                wrapperCol={{offset: 8, span: 16}}
            >
                <Checkbox>Lưu đăng nhập</Checkbox>
                <NavLink className="register" to="/register">
                    Register
                </NavLink>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button className={"btn"} type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
