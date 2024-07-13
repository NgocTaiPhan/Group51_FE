import React, { useEffect, useState } from "react";
import { Button } from "antd";
import data from "../../data.json";
import "./Product.scss";
import {Link} from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho sản phẩm

const getProduct = async () => {
    return data;
};

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
export default function Product() {
    const [products, setProducts] = useState<any[]>([]); // Sử dụng kiểu dữ liệu any
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProduct();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div>
            <section style={{ backgroundColor: 'white' }}>
                <div className="container" style={{paddingTop:130}}>
                    <div className="row">
                        {products.map((product) => (
                            <div key={product.id} className="col-xl-3 col-md-4 col-sm-6">
                                <div className="card">
                                    <img
                                        src={product.image}
                                        className="card-img-top"
                                        alt={product.name}
                                    />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{product.name}</h5>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="text-dark mb-0">{formatPrice(product.price)}</h5>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* eslint-disable-next-line react/jsx-no-undef */}
                                            <Link to={`/product-detail/${product.id}`}>
                                                <Button className="detail text-white">
                                                    Xem chi tiết
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
