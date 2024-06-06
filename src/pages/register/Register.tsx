import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Input, Button, DatePicker, Cascader, Select} from 'antd';
import config from 'tailwindcss/defaultConfig';
import "./register.scss";

const { Option } = Select;

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const [tinhData, setTinhData] = useState([]);
    const [quanData, setQuanData] = useState([]);
    const [phuongData, setPhuongData] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState('');
    const [selectedQuan, setSelectedQuan] = useState('');

    useEffect(() => {
        // Fetch tinh data
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => {
                setTinhData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching tinh data:', error);
            });
    }, []);

    const handleTinhChange = (value: string) => {
        setSelectedTinh(value);
        // Fetch quan data
        axios.get(`https://esgoo.net/api-tinhthanh/2/${value}.htm`)
            .then(response => {
                setQuanData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching quan data:', error);
            });
    };

    const handleQuanChange = (value: string) => {
        setSelectedQuan(value);
        // Fetch phuong data
        axios.get(`https://esgoo.net/api-tinhthanh/3/${value}.htm`)
            .then(response => {
                setPhuongData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching phuong data:', error);
            });
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    let prefixSelector;
    return (
        <Form
            className={"register"}
            form={form}
            name="register"
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ prefix: '86' }}
            style={{ maxWidth: 600}}
            scrollToFirstError
        >
            <Form.Item
                className={"email"}
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="nickname"
                label="Tên đăng nhập"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
                <Input />
            </Form.Item>


            {/* Select Tỉnh Thành */}
            <Form.Item
                name="tinh"
                label="Tỉnh Thành"
                rules={[
                    { type: 'string', required: true, message: 'Please select your province!' },
                ]}
            >
                <Select value={selectedTinh} onChange={handleTinhChange}>
                    <Option value="">Chọn Tỉnh Thành</Option>
                    {tinhData.map(({ full_name, id }) => (
                        <Option key={id} value={id}>{full_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Select Quận Huyện */}
            <Form.Item
                name="quan"
                label="Quận Huyện"
                rules={[
                    { type: 'string', required: true, message: 'Please select your district!' },
                ]}
            >
                <Select value={selectedQuan} onChange={handleQuanChange}>
                    <Option value="">Chọn Quận Huyện</Option>
                    {quanData.map(({ full_name, id }) => (
                        <Option key={id} value={id}>{full_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Select Phường Xã */}
            <Form.Item
                name="phuong"
                label="Phường Xã"
                rules={[
                    { type: 'string', required: true, message: 'Please select your ward!' },
                ]}
            >
                <Select>
                    <Option value="">Chọn Phường Xã</Option>
                    {phuongData.map(({ full_name, id }) => (
                        <Option key={id} value={id}>{full_name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="phone"
                label="SDT"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="date-picker"
                label="Ngày sinh"
                rules={[{ required: true, message: 'Please input your birthday!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item  wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
                <Button className={"submit"} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
