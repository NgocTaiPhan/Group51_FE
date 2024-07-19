import { useEffect, useState } from 'react';
import './OrderHistory.scss'; // Đảm bảo bạn có file CSS tương ứng
import { useOrderLogic } from "../order/OrderLogic";
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const navigate = useNavigate();
    const { formatPrice } = useOrderLogic(); // Sử dụng hook để định dạng giá

    useEffect(() => {
        // Lấy danh sách đơn hàng từ API khi component được render
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3003/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = (order: any) => {
        sessionStorage.setItem('orderData', JSON.stringify(order)); // Lưu thông tin đơn hàng vào sessionStorage
        navigate('/orderDetail'); // Điều hướng đến trang chi tiết đơn hàng
    };

    if (orders.length === 0) {
        return <div>Loading...</div>; // Hiển thị thông báo nếu không có đơn hàng
    }

    return (
        <div className="orderHistoryContainer">
            <h2 style={{ textAlign: 'center' }}>Lịch sử đơn hàng</h2>
            <div className="orderList">
                {orders.map((order: any, index: number) => (
                    <div key={index} className="orderItem">
                        <h3>Đơn hàng #{index + 1}</h3>
                        <p>Trạng thái: {order.status}</p>
                        <p>Phí vận chuyển: {formatPrice(order.phiShip)}</p>
                        <p>Tổng tiền: {formatPrice(order.totalAmount + order.phiShip)}</p>
                        <button onClick={() => handleViewDetails(order)}>Xem chi tiết</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
