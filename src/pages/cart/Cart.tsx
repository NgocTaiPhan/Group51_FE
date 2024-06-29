import React from 'react';
import { List, Avatar, InputNumber, Button } from 'antd';

// @ts-ignore
const Cart = () => {
    return (
        <List.Item
            actions={[
                <Button type="text" danger >Xóa</Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar />}
                title={"hhh"}
                description={`Giá: $${2}`}
            />
            <InputNumber
                min={1}
                value={1}
                // onChange={onQuantityChange}
            />
            <div style={{ marginLeft: 16 }}>
                Thành tiền:
            </div>
        </List.Item>
    );
};

export default Cart;
