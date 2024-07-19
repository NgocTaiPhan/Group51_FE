import { useEffect, useState } from 'react';
import './OrderHistory.scss'; // Đảm bảo bạn có file CSS tương ứng
import { useOrderLogic } from "../order/OrderLogic";

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null); // Để lưu đơn hàng được chọn
    const { formatPrice } = useOrderLogic(); // Sử dụng hook để định dạng giá

    useEffect(() => {
        // Lấy danh sách đơn hàng từ API khi component được render
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders');
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
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
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

            {/* Hiển thị chi tiết đơn hàng nếu có */}
            {selectedOrder && (
                <div className="orderDetails">
                    <button className="closeButton" onClick={handleCloseDetails}>Đóng</button>
                    <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
                    <p>Trạng thái: {selectedOrder.status}</p>
                    <p>Phí vận chuyển: {formatPrice(selectedOrder.phiShip)}</p>
                    <p>Thời gian dự kiến nhận hàng: {selectedOrder.thoiGian}</p>
                    <p>Tổng tiền: {formatPrice(selectedOrder.totalAmount + selectedOrder.phiShip)}</p>
                    <p>Địa chỉ nhận hàng:</p>
                    <ul>
                        <li>
                            {selectedOrder.address.sonha} - {selectedOrder.address.xa} - {selectedOrder.address.huyen} - {selectedOrder.address.tinh}
                        </li>
                        <li>Số điện thoại: {selectedOrder.address.phone}</li>
                        <li>Tên: {selectedOrder.address.name}</li>
                    </ul>
                    <h4>Sản phẩm:</h4>
                    <ul>
                        {selectedOrder.products.map((product: any, idx: number) => (
                            <li key={idx}>
                                <img src={product.image} alt={product.name} className="productImage" />
                                {product.name}: {product.quantity} x {formatPrice(product.price)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;
