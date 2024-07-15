import React, { useEffect, useState } from "react";
import { Button, Pagination, Select, Input, Empty, ConfigProvider } from "antd";
import data from "../../data.json";
import "./Product.scss";
import { Link } from "react-router-dom";
import banner from "../../assets/img/image.png";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface ProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
}

const getProduct = async (): Promise<ProductItem[]> => {
  return data;
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState<string>(""); // State cho thanh tìm kiếm
  const pageSize = 24; // Số sản phẩm mỗi trang

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1); // Reset page khi type thay đổi
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset page khi tìm kiếm thay đổi
  };

  const filteredProducts = selectedType
    ? products.filter((product) => product.type === selectedType)
    : products;

  const filteredBySearchProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = filteredBySearchProducts.slice(startIndex, endIndex);

  // Lấy danh sách các loại sản phẩm để hiển thị trong select
  const productTypes: string[] = [];
  const typeSet = new Set(products.map((product) => product.type));
  typeSet.forEach((type) => {
    productTypes.push(type);
  });

  return (
    <div>
      <section style={{ backgroundColor: "white" }}>
        <div className="banner">
          <img src={banner} alt="" />
        </div>
        <div className="container">
          <div className="heading_list">
            <h1
              style={{
                textAlign: "center",
                padding: 30,
                fontSize: 36,
                fontWeight: 500,
              }}
            >
              Tất cả sản phẩm
            </h1>
          </div>
          <div className="flex items-center justify-between	">
            {/* Dropdown select để chọn type */}
            <div style={{ marginBottom: 20 }}>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                style={{ width: 200 }}
                placeholder="Chọn loại sản phẩm"
              >
                <Select.Option value={undefined}>Tất cả</Select.Option>
                {productTypes.map((type, index) => (
                  <Select.Option key={index} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </div>
            {/* Thanh tìm kiếm theo tên sản phẩm */}
            <div style={{ marginBottom: 20 }}>
              <Input.Search
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên sản phẩm"
                style={{ width: 500 }}
                size="large"
                className="search-input"
              />
            </div>
          </div>
          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ height: 490, paddingBottom: 20 }}
                  className="col-xl-3 col-md-4 col-sm-6"
                >
                  <div className="card" style={{ height: "100%" }}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <div style={{ height: 100 }}>
                        <h5
                          className="mb-0"
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            paddingBottom: 10,
                          }}
                        >
                          {product.name}
                        </h5>
                        <h5
                          className="text-dark mb-0"
                          style={{ fontSize: 16, fontWeight: 600 }}
                        >
                          {formatPrice(product.price)}
                        </h5>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <Link to={`/product-detail/${product.id}`}>
                          <Button className="detail">Xem chi tiết</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty description="Không có sản phẩm nào phù hợp" />
            )}
          </div>
          <Pagination
            current={currentPage}
            total={filteredBySearchProducts.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{
              padding: 20,
            }}
            className="col-12 justify-center flex"
          />
        </div>
      </section>
    </div>
  );
};

export default Product;
