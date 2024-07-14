import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../ProductDetail/CartContext';
import { message } from 'antd';

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
    huyen: string;
    xa: string;
    phone: string;
    name: string;
}

export const useOrderLogic = () => {
    const { products, clearCart, getTotalPrice } = useCart();
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                // Replace with the appropriate API endpoint to fetch districts of TP.HCM
                const response = await axios.get('https://esgoo.net/api-tinhthanh/2/79.htm'); // '79' is the ID for TP.HCM
                // Filter districts to only include those in TP.HCM
                const hcmDistricts = response.data.data.filter((district: District) => {
                    // Adjust condition to filter districts of TP.HCM
                    return district.full_name.includes('Quận') || district.full_name.includes('Huyện');
                });
                setDistricts(hcmDistricts);
                setWards([]);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchDistricts();
    }, []);

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



    const handleFinish = (values: FormValues) => {
        const orderData = {
            products,
            totalAmount: getTotalAmount(),
            status: 'Đang xử lý',
            address: {
                sonha: values.sonha,
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
    const thoiGianDuKien = async (huyen: string): Promise<string> => {
        try {
            if (!huyen) {
                throw new Error('Missing district information');
            }

            // Replace with the appropriate API endpoint for estimated delivery time
            const response = await axios.get(`https://api.now.vn/estimated-delivery-time?district=${selectedDistrict}`);
            return response.data.estimatedTime || 'Không xác định';
        } catch (error) {
            console.error('Error fetching estimated delivery time:', error);
            return 'Không xác định';
        }
    };

    return {
        products,
        districts,
        wards,
        selectedDistrict,
        setSelectedDistrict,
        formatPrice,
        getTotalAmount,
        handleFinish,
        thoiGianDuKien,
    };
};
