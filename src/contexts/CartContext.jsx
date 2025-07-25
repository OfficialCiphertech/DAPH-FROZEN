import React, { createContext, useContext, useState } from 'react';
import CartSidebar from '@/components/CartSidebar';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ isCartOpen, toggleCart, openCart, closeCart }}>
      {children}
      <CartSidebar />
    </CartContext.Provider>
  );
};