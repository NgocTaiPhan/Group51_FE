import React, { useEffect, useState } from "react";
import { Button } from "antd";
import data from "../../data/data";
import "./Product.scss";
import { Link } from "react-router-dom";

const getProduct = async () => {
    return data.menu;
};

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function Product() {
    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

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

    // Tính toán chỉ mục sản phẩm bắt đầu và kết thúc của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <section style={{ backgroundColor: 'white' }}>
                <div className="container py-10">
                    <div className="row">
                        {currentProducts.map((product) => (
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
                    <div className="pagination justify-content-center mt-4">
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                            <Button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
