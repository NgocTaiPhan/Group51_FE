
import React, { useState } from 'react';
import { List, Avatar, InputNumber, Button, Form, Select, Input } from 'antd';
import { useOrderLogic } from './OrderLogic';
import './Order.scss';
import OrderDetails from "./OrderDetails";

const Order: React.FC = () => {
    const {
        products,
        districts,
        wards,
        selectedDistrict,
        setSelectedDistrict,
        formatPrice,
        handleFinish,
    } = useOrderLogic();
    const [showOrderDetails, setShowOrderDetails] = useState(false); // State to control OrderDetails visibility

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
    };
    const onFinish = (values: any) => {
        handleFinish(values);
        setShowOrderDetails(true);
    };
    return (
        <div className="large-font">
            <List
                className="orderContainer"
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(product) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={product.image} />}
                            title={product.name}
                            description={`Giá: ${formatPrice(product.price)}`}
                        />
                        <InputNumber min={1} value={product.quantity} />
                        <div style={{ marginLeft: '300px' }}>{formatPrice(product.price * product.quantity)}</div>
                    </List.Item>
                )}
            />
            <div className="s">
                <div className="infomation">
                    <div className="titelOrder">
                        <h3>Nhập thông tin nhận hàng</h3>
                    </div>
                    <Form layout="vertical" onFinish={onFinish}>
                        <div className="form">
                            <Form.Item
                                label="Tỉnh"
                                initialValue="TP.HCM"
                                // rules={[{ required: true, message: 'Vui lòng chọn Tỉnh Thành!' }]}
                            >
                                <Input disabled value={"TP.HCM"}/>
                            </Form.Item>
                            <Form.Item
                                name="huyen"
                                label="Huyện"
                                rules={[{required: true, message: 'Vui lòng chọn Huyện!'}]}
                            >
                                <Select value={selectedDistrict} onChange={(value) => handleDistrictChange(value)}>
                                    <Select.Option value="">Chọn Huyện</Select.Option>
                                    {districts.map(({full_name, id}) => (
                                        <Select.Option key={id} value={id}>
                                            {full_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="xa"
                                label="Xã"
                                rules={[{required: true, message: 'Vui lòng chọn Xã!'}]}
                            >
                                <Select>
                                    <Select.Option value="">Chọn Xã</Select.Option>
                                    {wards.map(({full_name, id}) => (
                                        <Select.Option key={id} value={id}>
                                            {full_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="sonha"
                            label="Số nhà"
                            rules={[{required: true, message: 'Vui lòng nhập số nhà!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[{required: true, message: 'Vui lòng điền số điện thoại!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Tên"
                            rules={[{required: true, message: 'Vui lòng điền tên!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 16, offset: 8}}}>
                            <Button className="submit" type="primary" htmlType="submit">
                                Xác nhận đơn hàng
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{marginLeft: "-1300px", marginTop: "-535px", position: "absolute"}}>
                         {showOrderDetails && <OrderDetails/>}
                    </div>
                    {/* <div>Phí ship: {formatPrice(shippingFee)}</div> */}
                </div>
            </div>
        </div>
    );
};

export default Order;
