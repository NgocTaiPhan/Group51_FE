// import React, { useEffect, useState } from "react";
// import "./OrderDteails.scss";
// import { Link } from "react-router-dom";
// import {useOrderLogic} from "./OrderLogic";
//
// const OrderDetails: React.FC = () => {
//     const { thoiGianDuKien } = useOrderLogic();
//     const [orderData, setOrderData] = useState<any>(null);
//     useEffect(() => {
//         // Lấy dữ liệu đơn hàng từ localStorage khi component được render
//         const storedOrder = localStorage.getItem('orderData');
//         if (storedOrder) {
//             const parsedOrder = JSON.parse(storedOrder);
//             setOrderData(parsedOrder);
//         }
//     }, []);
//
//     if (!orderData) {
//         return <div>Loading...</div>; // Xử lý khi chưa có dữ liệu đơn hàng
//
//     }
//
//     return (
//
//         <div className="orderDetailContainer">
//
//             <div className="order-details">
//             <Link to="/product">
//                     <button className="back">X</button>
//                 </Link>
//                 <h3 style={{color: "#006600", textAlign: "center"}}>Thông tin đơn hàng</h3>
//                 <p>Sản phẩm:</p>
//                 <ul>
//                     {orderData.products.map((product: any, index: number) => (
//                         <li key={index}>
//                             {product.name}: {product.quantity} x {product.price}
//                         </li>
//                     ))}
//                 </ul>
//                 <p>Tổng tiền: {orderData.totalAmount}</p>
//                 <p>Trạng thái: {orderData.status}</p>
//                 <p>Địa chỉ nhận hàng:</p>
//                 <ul>
//                     <li>{orderData.address.sonha} - {orderData.address.xa} - {orderData.address.huyen} - {orderData.address.tinh}</li>
//                     <li>Số điện thoại: {orderData.address.phone}</li>
//                     <li>Tên: {orderData.address.name}</li>
//                 </ul>
//
//             </div>
//
//         </div>
//
//     );
// }
//
// export default OrderDetails;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderDteails.scss';
import { Link } from 'react-router-dom';
import {useOrderLogic} from "./OrderLogic";

const OrderDetailsPage: React.FC = () => {
    const { selectedDistrict, wards, thoiGianDuKien } = useOrderLogic(); // Sử dụng hook useOrderLogic để lấy thông tin cần thiết

    const [orderData, setOrderData] = useState<any>(null);
    const [estimatedTime, setEstimatedTime] = useState<string | null>(null); // State để lưu trữ thời gian dự kiến

    useEffect(() => {
        // Lấy dữ liệu đơn hàng từ localStorage khi component được render
        const storedOrder = localStorage.getItem('orderData');
        if (storedOrder) {
            const parsedOrder = JSON.parse(storedOrder);
            setOrderData(parsedOrder);
        }
    }, []);

    useEffect(() => {
        // Khi huyen thay đổi, gọi API để lấy thời gian dự kiến
        if (orderData && orderData.address && orderData.address.huyen) {
            thoiGianDuKien(orderData.address.huyen).then((time: any) => {
                setEstimatedTime(time); // Cập nhật thời gian dự kiến khi lấy được từ API
            }).catch((error: any) => {
                console.error('Error fetching estimated delivery time:', error);
                setEstimatedTime('Không xác định'); // Xử lý lỗi khi không thể lấy được thông tin từ API
            });
        }
    }, [orderData, thoiGianDuKien]);

    if (!orderData || !estimatedTime) {
        return <div>Loading...</div>; // Xử lý khi chưa có dữ liệu đơn hàng hoặc thời gian dự kiến
    }

    return (
        <div className="orderDetailContainer">
            <div className="order-details">
                <Link to="/product">
                    <button className="back">X</button>
                </Link>
                <h3 style={{ color: '#006600', textAlign: 'center' }}>Thông tin đơn hàng</h3>
                <p>Sản phẩm:</p>
                <ul>
                    {orderData.products.map((product: any, index: number) => (
                        <li key={index}>
                            {product.name}: {product.quantity} x {product.price}
                        </li>
                    ))}
                </ul>
                <p>Tổng tiền: {orderData.totalAmount}</p>
                <p>Trạng thái: {orderData.status}</p>
                <p>Địa chỉ nhận hàng:</p>
                <ul>
                    <li>
                        {orderData.address.sonha} - {orderData.address.xa} - {orderData.address.huyen} -{' '}
                        {orderData.address.tinh}
                    </li>
                    <li>Số điện thoại: {orderData.address.phone}</li>
                    <li>Tên: {orderData.address.name}</li>
                </ul>
                <div>
                    Thời gian dự kiến nhận hàng: {estimatedTime}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;

