// Cart.tsx
import React from 'react';
import { List, Avatar, InputNumber, Button } from 'antd';
import { useCart } from '../ProductDetail/CartContext';

const Cart: React.FC = () => {
  const { products, updateProductQuantity, removeProduct } = useCart();

  return (
    <List
      itemLayout="horizontal"
      dataSource={products}
      renderItem={(product) => (
        <List.Item
          actions={[
            <Button type="text" danger onClick={() => removeProduct(product.id)}>Xóa</Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={product.image} />}
            title={product.name}
            description={`Giá: $${product.price}`}
          />
          <InputNumber
            min={1}
            value={product.quantity}
            onChange={(value) => updateProductQuantity(product.id, Number(value))}
          />
          <div style={{ marginLeft: 16 }}>
            Thành tiền: ${product.price * product.quantity}
          </div>
        </List.Item>
      )}
    />
  );
};

export default Cart;
