// CartContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CartContextType {
  cartItemCount: number;
  addToCart: (amount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState<number>(() => {
    // Get initial state from localStorage
    const savedCount = localStorage.getItem('cartItemCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    // Save cartItemCount to localStorage whenever it changes
    localStorage.setItem('cartItemCount', cartItemCount.toString());
  }, [cartItemCount]);

  const addToCart = (amount: number) => {
    setCartItemCount((prevCount) => prevCount + amount);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
