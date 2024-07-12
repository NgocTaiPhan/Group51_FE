import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../ProductDetail/CartContext';
import {message} from "antd";

interface Province {
    id: string;
    full_name: string;
}

interface District {
    id: string;
    full_name: string;
}

interface Ward {
    id: string;
    full_name: string;
}

interface FormValues {
    sonha: string;
    tinh: string;
    huyen: string;
    xa: string;
    phone: string;
    name: string;
}

export const useOrderLogic = () => {
    const { products, clearCart, getTotalPrice } = useCart();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [shippingFee, setShippingFee] = useState<number>(0); // State to store shipping fee

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                try {
                    const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
                    setDistricts(response.data.data);
                    setWards([]);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            };
            fetchDistricts();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                try {
                    const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
                    setWards(response.data.data);
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            };
            fetchWards();
        }
    }, [selectedDistrict]);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const getTotalAmount = (): number => {
        return getTotalPrice();
    };

    const updateShipping = (tinh: string, shipping: number): number => {
        // Your logic to calculate shipping fee based on province or other factors
        if (tinh === 'Tỉnh Bình Định') {
            return 10000; // Example: Shipping fee is 10,000 VND if province is tp.hcm
        } else {
            return 0; // Default shipping fee or other calculation logic
        }
    };

    const handleFinish = (values: FormValues) => {
        const orderData = {
            products,
            totalAmount: getTotalAmount(),
            status: "Đang xử lý",
            address: {
                sonha: values.sonha,
                tinh: provinces.find((p) => p.id === values.tinh)?.full_name,
                huyen: districts.find((d) => d.id === values.huyen)?.full_name,
                xa: wards.find((w) => w.id === values.xa)?.full_name,
                phone: values.phone,
                name: values.name,
            },
        };

        localStorage.setItem('orderData', JSON.stringify(orderData));
        console.log('Order saved:', orderData);
        message.success('Đặt hàng thành công!');
        clearCart();
    };

    return {
        products,
        provinces,
        districts,
        wards,
        selectedProvince,
        setSelectedProvince,
        selectedDistrict,
        setSelectedDistrict,
        formatPrice,
        getTotalAmount,
        updateShipping,
        handleFinish,
    };
};
