const data = {
  menu: [
    {
      id: 1,
      name: "Cơm gà xối mỡ",
      description: "Cơm nóng hổi với gà chiên giòn rụm, xối mỡ hành thơm phức",
      price: 45000,
      rate: 4.8,
      image:
        "data:image/jpeg;base64,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",
      category: 1,
      soups: 1,
    },
    {
      id: 2,
      name: "Bún riêu",
      description: "Bún riêu cua kèm theo thịt giò, chả cua thơm ngon",
      price: 50000,
      rate: 4.8,

      image: "bun_cha.jpg",
      category: 1,
    },
    {
      id: 3,
      name: "Phở bò đặc biệt",
      description:
        "Phở thơm ngon với thịt bò tái, chín, nạm, gầu, nước dùng đậm đà",
      price: 60000,
      rate: 4.8,

      image: "pho_bo.jpg",
      category: 1,
    },
    {
      id: 4,
      name: "Hủ tiếu Nam Vang",
      description:
        "Hủ tiếu dai ngon với thịt bằm, tôm, trứng cút, nước dùng thanh ngọt",
      price: 40000,
      rate: 4.8,

      image: "hu_tieu.jpg",
      category: 1,
    },
    {
      id: 5,
      name: "Trà đá",
      description: "Trà đá mát lạnh giải nhiệt",
      price: 5000,
      rate: 4.8,

      image: "tra_da.jpg",
      category: 2,
    },
    {
      id: 6,
      name: "Pepsi",
      description: "Nước ngọt Pepsi",
      price: 120000,
      rate: 4.8,

      image: "pepsi.jpg",
      category: 2,
    },
    {
      id: 7,
      name: "Cơm sườn cây",
      description: "Cơm nóng hổi với sườn sụn giòn",
      price: 45000,
      rate: 4.8,

      image: "com_suon_cay.jpg",
      category: 0,
      soups: 2,
    },
    {
      id: 8,
      name: "Cơm sườn cốt lết",
      description: "Cơm nóng hổi với sườn màu Caramel, vừa nạc vừa mỡ",
      price: 45000,
      rate: 4.8,
      image: "com_suon_cot_let.jpg",
      category: 0,
      soups: 3,
    },
  ],
  soups: [
    {
      id: 1,
      name: "Canh rong biển thịt bằm",
      price: 10000,
    },
    {
      id: 2,
      name: "Canh chua",
      price: 12000,
    },
    {
      id: 3,
      name: "Canh cải ngọt",
      price: 8000,
    },
  ],
  categories: [
    {
      id: 0,
      name: "Cơm",
    },
    {
      id: 1,
      name: "Đồ nước",
    },
    {
      id: 2,
      name: "Nước uống",
    },
  ],
  others: [
    {
      id: 1,
      name: "Cơm thêm",
      price: 5000,
    },
    {
      id: 2,
      name: "Trứng ốp la",
      price: 10000,
    },
    {
      id: 3,
      name: "Chả hấp",
      price: 15000,
    },
    {
      id: 4,
      name: "Bì thịt",
      price: 15000,
    },
    {
      id: 5,
      name: "Sườn thêm",
      price: 15000,
    },
  ],
  orders: [
    {
      id: 101,
      items: [
        { id: 1, quantity: 2, soup: 2 }, // Thêm thông tin canh đã chọn
        { id: 3, quantity: 1 },
      ],
      total: 174000, // Cập nhật tổng tiền (bao gồm cả canh)
      status: "pending",
      customer_name: "Nguyễn Văn A",
      customer_phone: "0912345678",
      customer_address: "123 đường ABC, quận 1, TP.HCM",
    },
  ],
};

export default data;
