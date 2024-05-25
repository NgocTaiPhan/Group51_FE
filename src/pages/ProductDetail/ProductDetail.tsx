import { useParams } from "react-router-dom";
import data from "../../data/data";
import { useEffect, useState } from "react";

export default function ProductDetai() {
  const getProduct = async (id: number) => {
    return data.menu.find((product) => product.id == id);
  };
  const getSoupById = async (soupId: any) => {
    return data.soups.find((soup) => (soup.id = soupId));
  };

  const param = useParams();
  const [detail, setDetail] = useState<any>([]);
  const [soupDetail, setSoupDetail] = useState<any>([]);
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
      <img src={detail.image} style={{width: 200, height:200}} />
    </div>
  );
}
