import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { FaHome, FaStar } from "react-icons/fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import {Avatar, Form, Button, List, Input, message} from "antd";
import moment from "moment";

import { useCart } from "./CartContext";

export default function ProductDetail() {
  // const [comments, setComments] = useState<any>([]);
  // const [newCommentText, setNewCommentText] = useState<string>("");
  const { addToCart } = useCart();
  const [amount, setAmount] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const handleAddToCart = () => {
    const productToAdd = {
      id: detail.id.toString(),
      name: detail.name,
      price: detail.price,
      quantity: amount,
      image: detail.image,
    };
    addToCart(productToAdd);
    message.success("Thêm sản phẩm vào giỏ hàng thành công")
  };
  const getProduct = async (id: number) => {
    return data.find((product) => product.id == id);
  };
  const getOthers = async (id: number) => {
    return data.filter((product) => product.id != id);
  };
  const param = useParams();
  const [detail, setDetail] = useState<any>([]);
  const [others, setOthers] = useState<any>([]);
  useEffect(() => {
    fecthProductDetail();
  }, [param.productId]);
  const loadOthers = async (param: any) => {
    const product = await getOthers(param.productId);
    return product;
  };
  const loadProduct = async (param: any) => {
    const product = await getProduct(param.productId);
    return product;
  };
  const fecthProductDetail = async () => {
    const result = await loadProduct(param);
    const others = await loadOthers(param);

    setDetail(result);
    setOthers(others.slice(0, 5));
  };
  const handleProductClick = (productId: number) => {
    window.location.href = `/product-detail/${productId}`;
  };
  const renderOthers = () => {
    return others.map((element: any) => {
      return (
        <div key={element.id} className="px-5 py-5 mx-5 others">
          <div onClick={() => handleProductClick(element.id)}>
            <div>
              <img src={element.image} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-color1 py-2">
                {element.name}
              </h3>
              <p className="py-1 text-color2">{element.description}</p>
              <p className="py-1 font-semibold">{element.price} VND</p>
            </div>
          </div>
        </div>
      );
    });
  };
  // const renderComments = (comments: comment[]) => {
  //   return (
  //     <ul className="pl-0">
  //       {comments.map((comment) => (
  //         <li key={comment.id} className="flex items-center mb-3">
  //           <FaRegUserCircle
  //             style={{ width: 40, height: 40, marginRight: 20 }}
  //           />
  //           <div>
  //             <p
  //               style={{
  //                 fontSize: 18,
  //                 fontWeight: 500,
  //                 marginBottom: 0,
  //                 color: "#385898",
  //               }}
  //             >
  //               {comment.author}
  //             </p>
  //             <p style={{ marginBottom: 0, fontSize: 14 }}>{comment.text}</p>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  // const handleAddComment = () => {
  //   const newComment: comment = {
  //     id: comments.length + 1,
  //     text: newCommentText,
  //     author: "QuyNguyen",
  //   };
  //   setComments([...comments, newComment]);
  //   setNewCommentText("");
  // };
  return (
    <div style={{paddingTop:80}}>
      <div>
        <div className="path flex items-center">
          <span className="mx-2">
            <FaHome />
          </span>
          <span style={{fontWeight:400}}>Home / Shop / Detail</span>
        </div>

        <div className="px-10 py-5">
          <div
            className="detail_container mx-auto py-10 product-details flex justify-center	"
            style={{ width: 1280, background: "#fff" }}
          >
            <div className="product_img">
              <img src={detail.image} style={{ width: 500, height: 530 }} />
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
              <div>
                <p className="text-base font-normal tracking-widest mx-2">
                  Mã sản phẩm: {detail.id}
                </p>
              </div>
              <div className="py-3">
                <span className="text-lg font-semibold tracking-widest mx-2 product_price">
                  {detail.price}đ
                </span>
              </div>
              <div
                className="my-3"
                style={{ padding: 10, background: "#f8f8f8", borderRadius: 10 }}
              >
                <div
                  style={{
                    background: "#f33828",
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaGift style={{ color: "#fff", marginLeft: 10 }} />
                  <p
                    style={{
                      padding: "5px 10px",
                      color: "#fff",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    Thân chúc quý khách dùng ngon miệng
                  </p>
                </div>

                <ul
                  className="promotion_box"
                  style={{
                    padding: 10,
                    background: "#fff",
                    marginTop: 10,
                    listStyleType: "disc",
                  }}
                >
                  <li>Freeship với đơn hàng 5 phần trở lên</li>
                  <li>Tặng kèm trái cây tráng miệng mỗi ngày</li>
                  <li>Cuối tuần tặng kèm nước uống</li>
                </ul>
              </div>
              <div className="flex items-center pt-3">
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
                  <button className="addToCart" onClick={handleAddToCart}>
                    Thêm vào giỏ hàng
                  </button>
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
            {/* <div className="line mx-5"></div>
            <div className="comment">
              <h2 className="text-2xl">Hỏi đáp - Bình luận</h2>
              <p className="py-3 text-base font-medium">
                {comments.length} bình luận
              </p>
              <div className="line_1 my-2"></div>
              <div>{renderComments(comments)}</div>
              <div>
                <h4 style={{ marginTop: 50 }}>Add a Comment</h4>
                <input
                  className="setNewComment"
                  placeholder="Your Comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button className="submit_comment" onClick={handleAddComment}>
                  Submit
                </button>
              </div>
              <div className="line_1 my-2"></div>
            </div> */}
          </div>
        </div>
        <div>
          <div className="px-20 py-3 other_products">
            <h3 className="text-2xl font-semibold text-white">Sản phẩm khác</h3>
          </div>
          <div className="flex justify-start py-20 px-10">{renderOthers()}</div>
        </div>
      </div>

    </div>
  );
}
