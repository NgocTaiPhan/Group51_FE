import { useParams } from "react-router-dom";
import data from "../../data/data";
import { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { FaHome, FaStar } from "react-icons/fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";

export default function ProductDetail() {
  const getProduct = async (id: number) => {
    return data.menu.find((product) => product.id == id);
  };
  const getSoupById = async (soupId: any) => {
    return data.soups.find((soup) => (soup.id = soupId));
  };

  const param = useParams();
  const [detail, setDetail] = useState<any>([]);
  const [soupDetail, setSoupDetail] = useState<any>([]);
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    fecthProductDetail();
  }, []);

  const loadProduct = async (param: any) => {
    const product = await getProduct(param.productId);
    return product;
  };
  const loadSoup = async (id: any) => {
    const product = await getSoupById(id);
    return product;
  };

  const fecthProductDetail = async () => {
    const result = await loadProduct(param);
    const soup = await loadSoup(result?.soups);
    setDetail(result);
  };

  return (
    <div>
      <div style={{ background: "rgb(246 246 246)" }}>
        <div className="px-20 flex items-center">
          <span className="mx-2">
            <FaHome />
          </span>
          <span className="font-semibold">Home / Shop</span>
          <span className="font-semibold" style={{ color: "rgb(199 199 199)" }}>
            / Detail
          </span>
        </div>
        <div className="px-20 py-20">
          <div
            className="detail_container mx-auto py-10 product-details flex justify-start"
            style={{ width: 1280, background: "#fff" }}
          >
            <div className="product_img">
              <img src={detail.image} style={{ width: 350, height: 300 }} />
              <div className="flex flex-wrap justify-center items-center py-10">
                <button className="px-2 py-1 flex justify-center items-center font-semibold text-sm text-gray-700">
                  <ShareIcon />
                  <span className="ml-2">Chia sẻ</span>
                </button>
                <button className="px-2 py-1 flex justify-center items-center font-semibold text-sm text-gray-700">
                  <FavoriteBorderIcon />
                  <span className="ml-2">Yêu thích</span>
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2">
                <button className="mr-3"> </button>
                <span className="font-semibold text-xl sm:text-3xl tracking-widest leading-relaxed text-gray-900">
                  {detail.name}
                </span>
              </p>
              <div className="flex items-center px-2 py-3">
                <span>
                  <FaStar style={{ color: "#f9c951" }} />
                </span>
                <span className="text-base font-normal tracking-widest mx-2">
                  {detail.rate}
                </span>
              </div>
              <div>
                <span className="text-base font-normal tracking-widest mx-2">
                  {detail.description}
                </span>
              </div>
              <div className="py-5">
                <span className="text-lg font-semibold tracking-widest mx-2 product_price">
                  {detail.price} VND
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex" style={{ marginRight: 20 }}>
                  <button
                    className="decrease"
                    onClick={() =>
                      setAmount((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                  <span className="amount">{amount}</span>
                  <button
                    className="increase"
                    onClick={() => setAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button className="addToCart">Thêm vào giỏ hàng</button>
                </div>
              </div>
              <div>
                <button className="buyNow">Mua ngay</button>
              </div>
              <p
                className="text-center"
                style={{ padding: "20px 10px", width: 480 }}
              >
                Gọi đặt mua{" "}
                <span style={{ color: "#87c84a", fontWeight: 500 }}>
                  0902.504.708
                </span>{" "}
                (7:30 - 12:00)
              </p>
              <div style={{ width: 480 }}>
                <ul className="product-policises list-unstyled py-3 px-3 m-0">
                  <li>
                    <div>
                      <TbTruckDelivery
                        style={{
                          width: 45,
                          fontSize: 30,
                          color: "rgb(75 128 26)",
                        }}
                      />
                    </div>
                    <div>Giao hàng siêu tốc trong 1h</div>
                  </li>
                  <li>
                    <div>
                      <FaHandHoldingUsd
                        style={{
                          width: 45,
                          fontSize: 30,
                          color: "rgb(75 128 26)",
                        }}
                      />
                    </div>
                    <div>Combo 2 món đa dạng mỗi ngày</div>
                  </li>
                  <li>
                    <div>
                      <MdOutlinePayment
                        style={{
                          width: 45,
                          fontSize: 25,
                          color: "rgb(75 128 26)",
                        }}
                      />
                    </div>
                    <div>Thanh toán đa nền tảng</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
