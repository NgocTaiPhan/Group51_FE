import React, { useState } from 'react';
import { Drawer, List, Avatar, InputNumber, Divider, Button } from 'antd';
import {NavLink} from "react-router-dom";

interface CartProps {
    visible: boolean;
    onClose: () => void;
}

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 2000,
        image: 'https://via.placeholder.com/150'
    },
    // Add more products here
];

const CartPopUp: React.FC<CartProps> = ({ visible, onClose }) => {
    const [quantities, setQuantities] = useState<number[]>(products.map(() => 1));

    const handleQuantityChange = (index: number, value: number) => {
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    };

    const total = products.reduce((sum, product, index) => {
        return sum + product.price * quantities[index];
    }, 0);

    return (
        <Drawer
            title="Giỏ hàng"
            placement="right"
            onClose={onClose}
            visible={visible}
        >
            <List
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={item.name}
                            description={`Price: $${item.price}`}
                        />
                        <InputNumber
                            min={1}
                            defaultValue={quantities[index]}
                            onChange={(value) => handleQuantityChange(index, Number(value))}
                        />
                        <div style={{ marginLeft: 16 }}>
                            ${item.price * quantities[index]}
                        </div>
                    </List.Item>
                )}
            />
            <Divider />
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Tổng tiền: ${total}
            </div>
            <Button type="primary" block style={{ marginTop: 16 }}>
                <NavLink className="checkout" to="/carts">
                    Thanh toán
                </NavLink>
            </Button>
        </Drawer>
    );
};

export default CartPopUp;
