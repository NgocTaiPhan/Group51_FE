import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Form,
    Input,
} from 'antd';

export default function ForgotPass(){
    return(

        <>
            <Form.Item label="Nhập mật khẩu hiện tại">
                <Input.Password className="inputForm"/>
            </Form.Item>
            <Form.Item label="Nhập mật khẩu mới">
                <Input.Password className="inputForm"/>
            </Form.Item>
            <Form.Item  label="Nhập lại mật khẩu mới">
                <Input.Password className="inputForm"/>
            </Form.Item>
        </>
    );


}