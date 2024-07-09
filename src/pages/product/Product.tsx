import React, { useEffect, useState } from "react";
import { Button } from "antd";
import data from "../../data/data";
import "./Product.scss";
import { comment } from "../../interfaces/product";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: number;
    soups?: number; // Nếu có thể thiếu, bạn có thể đánh dấu là không bắt buộc
    comments: comment[]; // Sử dụng interface từ file interfaces/product.ts
}

const getProduct = async (): Promise<Product[]> => {
    return data.menu;
};

export default function Product() {
    const [products, setProducts] = useState<Product[]>([]); // Sử dụng kiểu dữ liệu Product

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
                <div className="container py-10">
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
                                            <h5 className="text-dark mb-0">${product.price}</h5>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Button className="detail bg-emerald-600 text-white">
                                                Xem chi tiết
                                            </Button>
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
