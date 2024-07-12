import React from 'react';
import {Col, DatePicker, Row} from "antd";
import './InforUser.scss';
import Popup from '../Popup/Popup';
import ForgotPass from "../Header/components/ForgotPass/ForgotPass";
import {Form, Input} from 'antd';
import Province from '../Province/Province'


export function UserInfor() {
    return (
        <>
            <div className="w-[900px]">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold mb-2">Thông tin người dùng</h2>
                    <form>
                        <Form layout="vertical">  {/* Sử dụng layout "vertical" cho form */}
                            <Form.Item
                                label="Tên đăng nhập">
                                <Input className="input-custom" defaultValue="Phan Ngọc Tài" disabled/>
                            </Form.Item>

                            <Row gutter={16}> {/* Sử dụng Row và Col để tạo layout grid */}
                                <Col span={12}>
                                    <Form.Item label="Họ và tên">
                                        <Input className="input-custom" defaultValue="Phan Ngọc Tài" disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Email">
                                        <Input className="input-custom" defaultValue="email@gmail.com" disabled/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Địa chỉ">
                                <Input className="input-custom"
                                       defaultValue="ấp Gò Dỗ, xã Bình Hòa Tây, huyện Mộc Hóa, tỉnh Long An" disabled/>
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Số điện thoại">
                                        <Input className="input-custom" defaultValue="0345098986" type="number"
                                               disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Ngày sinh">
                                        <DatePicker className="input-custom" disabled/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                        <div className=" mx-64 mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="btn-changeinfor ml-30">
                                <Popup btnText="Thay đổi thông tin" title="Thay đổi thông tin"
                                       content={<FillUserInfor/>}/>
                            </div>
                            <div className="ml-20 forgotpass">
                                <Popup btnText="Đổi mật khẩu" title="Đổi mật khẩu" content={<ForgotPass/>}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </>

    )
        ;
}

export function FillUserInfor() {
    return (
        <Form layout="vertical">  {/* Sử dụng layout "vertical" cho form */}
            <Form.Item label="Tên đăng nhập">
                <Input className="input-custom" defaultValue="Phan Ngọc Tài"/>
            </Form.Item>

            <Row gutter={16}> {/* Sử dụng Row và Col để tạo layout grid */}
                <Col span={12}>
                    <Form.Item label="Họ và tên">
                        <Input className="input-custom" defaultValue="Phan Ngọc Tài"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Email">
                        <Input className="input-custom" defaultValue="email@gmail.com"/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="Địa chỉ" >
                <Province  />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Số điện thoại">
                        <Input className="input-custom" defaultValue="0345098986" type="number"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Ngày sinh">
                        <DatePicker className="input-custom"/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
