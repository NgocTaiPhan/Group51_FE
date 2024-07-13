import React, {useState} from 'react';
import { List, Avatar, InputNumber, Button, Form, Select, Input } from 'antd';
import { useOrderLogic } from './OrderLogic';
import "./Order.scss";

const Order: React.FC = () => {
    const {
        products,
        provinces,
        districts,
        wards,
        selectedProvince,
        setSelectedProvince,
        selectedDistrict,
        setSelectedDistrict,
        formatPrice,
        handleFinish,
        updateShipping,
    } = useOrderLogic();
    const [shippingFee, setShippingFee] = useState<number>(0);
    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value);
        setShippingFee(updateShipping(value, 0)); // Update shipping fee when province changes
    };

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
        setShippingFee(updateShipping(selectedProvince || '', 0)); // Update shipping fee when district changes
    };

    return (
        <div className={"large-font"}>
            <List
                className={"orderContainer"}
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(product) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={product.image} />}
                            title={product.name}
                            description={`Giá: ` + formatPrice(product.price)}
                        />
                        <InputNumber
                            min={1}
                            value={product.quantity}
                        />
                        <div style={{ marginLeft: "300px" }}>
                            {formatPrice(product.price * product.quantity)}
                        </div>
                    </List.Item>
                )}
            />
            <div className="s">
                <div className="infomation">
                    <div className="titelOrder">
                        <h3>Nhập thông tin nhận hàng</h3>
                    </div>
                    <Form.Item
                        name="sonha"
                        label={"Số nhà"}
                        rules={[{ required: true, message: 'Vui lòng chọn nhập số nhà!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form layout="vertical" onFinish={handleFinish}>
                        <div className={"form"}>

                            <Form.Item
                                name="tinh"
                                label={"Tỉnh"}
                                rules={[{ required: true, message: 'Vui lòng chọn Tỉnh Thành!' }]}
                            >
                                <Select value={selectedProvince} onChange={(value) => handleProvinceChange(value)}>
                                    <Select.Option className="tinh" value="">Chọn Tỉnh Thành</Select.Option>
                                    {provinces.map(({ full_name, id }) => (
                                        <Select.Option className="tinh"  key={id} value={id}>{full_name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="huyen"
                                label={"Huyện"}
                                rules={[{ required: true, message: 'Vui lòng chọn Huyện!' }]}
                            >
                                <Select value={selectedDistrict} onChange={(value) => handleDistrictChange(value)}>
                                    <Select.Option value="">Chọn Huyện</Select.Option>
                                    {districts.map(({ full_name, id }) => (
                                        <Select.Option key={id} value={id}>{full_name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="xa"
                                label={"Xã"}
                                rules={[{ required: true, message: 'Vui lòng chọn Xã!' }]}
                            >
                                <Select>
                                    <Select.Option value="">Chọn Xã</Select.Option>
                                    {wards.map(({ full_name, id }) => (
                                        <Select.Option key={id} value={id}>{full_name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="phone"
                            label={"SDT"}
                            rules={[{ required: true, message: 'Vui lòng điền số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label={"Tên"}
                            rules={[{ required: true, message: 'Vui lòng điền tên!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
                            <Button className="submit" type="primary" htmlType="submit">
                                Xác nhận đơn hàng
                            </Button>
                        </Form.Item>
                    </Form>
                    {/*<div>Phí ship: {formatPrice(shippingFee)}</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Order;
