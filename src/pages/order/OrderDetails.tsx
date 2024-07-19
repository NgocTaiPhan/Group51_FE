// OrderDetailsPage
import { useEffect, useState } from 'react';
import './OrderDteails.scss';
import { Link } from 'react-router-dom';
import { useOrderLogic } from './OrderLogic';

const OrderDetailsPage: React.FC = () => {
    const { formatPrice, selectedDistrict } = useOrderLogic();
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        const storedOrder = sessionStorage.getItem('orderData');
        if (storedOrder) {
            const parsedOrder = JSON.parse(storedOrder);
            setOrderData(parsedOrder);
        }
    }, []);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orderDetailContainer">
            <div className="order-details">
                <Link to="/product">
                    <button className="back">Quay lại</button>
                </Link>
                <h3 style={{color: '#006600', textAlign: 'center'}}>Thông tin đơn hàng</h3>
                <p>Sản phẩm:</p>
                <ul>
                    {orderData.products.map((product: any, index: number) => (
                        <li key={index}>
                            {product.name}: {product.quantity} x {formatPrice(product.price)}
                        </li>
                    ))}
                </ul>
                <p>Trạng thái: {orderData.status}</p>
                <p>Phí vận chuyển: {formatPrice(orderData.phiShip)}</p>
                <p>Thời gian dự kiến nhận hàng: {orderData.thoiGian}</p>
                <p>Tổng tiền: {formatPrice(orderData.totalAmount + orderData.phiShip)}</p>

                <p>Địa chỉ nhận hàng:</p>
                <ul>
                    <li>
                        {orderData.address.sonha} - {orderData.address.xa} - {orderData.address.huyen} - {orderData.address.tinh}
                    </li>
                    <li>Số điện thoại: {orderData.address.phone}</li>
                    <li>Tên: {orderData.address.name}</li>
                </ul>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
