import React, { useEffect, useState } from 'react';
import { List, Avatar, InputNumber, Button, Form, Select, Input } from 'antd';
import { useCart } from '../ProductDetail/CartContext';
import axios from "axios";
import "./cart.scss";
import {Link} from "react-router-dom";

const { Option } = Select;

const Cart: React.FC = () => {
    const { products, getTotalPrice, removeProduct } = useCart();


    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };




    const [form] = Form.useForm();
    const [tinhData, setTinhData] = useState<any[]>([]);
    const [quanData, setQuanData] = useState<any[]>([]);
    const [phuongData, setPhuongData] = useState<any[]>([]);
    const [selectedTinh, setSelectedTinh] = useState<string>('');
    const [selectedQuan, setSelectedQuan] = useState<string>('');
    const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchTinhData = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                setTinhData(response.data.data);
            } catch (error) {
                console.error('Error fetching tinh data:', error);
            }
        };
        fetchTinhData();
    }, []);


    const handlePaymentButtonClick = () => {
        setIsInfoVisible(true);
    };


    return (
        <div className="main">
            <List
                className="orderContainer"
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(product) => (
                    <List.Item
                        actions={[
                            <Button style={{marginLeft: "150px"}} type="text" danger onClick={() => removeProduct(product.id)}>Xóa</Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={product.image} />}
                            title={product.name}
                            description={`Giá: ${formatPrice(product.price)}`}
                        />
                        <InputNumber  style={{marginRight: "100px"}} min={1} value={product.quantity} />
                        <div>
                            {formatPrice(product.price * product.quantity)}
                        </div>
                    </List.Item>
                )}
            />
            <div className="checkOut">
                <div className="title">
                    <h3>Thanh toán</h3>
                </div>
                <div className="sumAmount">
                    <label className="card-title">Tổng tiền:</label>
                    <InputNumber className="sumAmounts" value={formatPrice(getTotalPrice())} readOnly />
                </div>
                <div className="lines"></div>

                    <div className="button">
                        <Link to={"/order"}>
                        <Button className="buttons" onClick={handlePaymentButtonClick}>Thanh toán</Button>
                        </Link>
                    </div>
            </div>


        </div>
    );
};

export default Cart;
