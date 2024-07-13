import React, { useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";
import path from "path";

const fetchData = async () => {
  try {
    const urls = [
      "https://thefreshkitchen.vn/collections/tat-ca-san-pham",
      "https://thefreshkitchen.vn/collections/tat-ca-san-pham?page=2",
      "https://thefreshkitchen.vn/collections/tat-ca-san-pham?page=3",
      "https://thefreshkitchen.vn/collections/tat-ca-san-pham?page=4",
      "https://thefreshkitchen.vn/collections/tat-ca-san-pham?page=5",
    ];

    let allData: {
      id: number;
      name: string;
      image: string | undefined;
      price: number;
      type: string;
    }[] = [];
    const convertPriceToNumber = (priceString: string): number => {
      // Loại bỏ ký tự "đ" và khoảng trắng, sau đó chuyển chuỗi thành số
      const cleanedPrice = priceString.replace(/[đ,\s]/g, '');
      return parseFloat(cleanedPrice);
    };
    const determineType = (name: string): string => {
      if (name.includes("HC") || name.includes("CM")) {
        return "combo";
      } else if (name.includes("Cơm")) {
        return "cơm";
      } else if (
        name.includes("Mì") ||
        name.includes("Hủ tiếu") ||
        name.includes("Miến")
      ) {
        return "mì, hủ tiếu, miến";
      } else if (name.includes("Phá lấu")) {
        return "Phá lấu";
      } else if (
        name.includes("Café") ||
        name.includes("Coca") ||
        name.includes("7up") ||
        name.includes("Dasani")
      ) {
        return "nước";
      } else {
        return "đồ ăn thêm";
      }
    };

    for (const url of urls) {
      const response = await axios.get(url);

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".product-loop").each((index, el) => {
          const id = allData.length + 1;
          const name = $(el).find(".proloop-name a").text().trim();
          const image = $(el).find(".product-img img").attr("data-src");
          const priceString = $(el).find(".proloop-price span").text().trim();
          const price = convertPriceToNumber(priceString);
          const type = determineType(name);

          allData.push({ id, name, image, price, type });
        });
      } else {
        console.error(`Không thể lấy dữ liệu từ trang ${url}.`);
      }
    }

    const fs = require("fs");
    const dataFilePath = 'C:\\Users\\HP\\Desktop\\Group51_FE\\src\\data.json';
    fs.writeFileSync(dataFilePath, JSON.stringify(allData, null, 2));
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
};

fetchData();
