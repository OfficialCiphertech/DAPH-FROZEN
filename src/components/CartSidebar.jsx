import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCartStore } from '@/hooks/useCartStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const CartSidebar = () => {
    const { isCartOpen, closeCart } = useCart();
    const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();

    const handleWhatsAppOrder = () => {
        if (items.length === 0) return;

        let message = "Hi! I'd like to place an order for the following items:\n\n";
        items.forEach(item => {
            message += `*${item.name}*\n`;
            message += `Quantity: ${item.quantity}\n`;
            message += `Price: GH₵${(item.price * item.quantity).toFixed(2)}\n\n`;
        });
        message += `*Total: GH₵${getCartTotal().toFixed(2)}*\n\n`;
        message += "Please confirm my order and provide payment details. Thank you!";
        
        const whatsappUrl = `https://wa.me/233209971141?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        closeCart();
        clearCart();
        toast({
            title: "Order Sent!",
            description: "Your order has been sent via WhatsApp. Your cart is now clear.",
        });
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50"
                    onClick={closeCart}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                            <Button variant="ghost" size="icon" onClick={closeCart}>
                                <X className="h-6 w-6" />
                            </Button>
                        </header>

                        {items.length === 0 ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Your cart is empty</h3>
                                <p className="text-gray-500 mt-2">Add some products to get started!</p>
                            </div>
                        ) : (
                            <div className="flex-grow overflow-y-auto p-6 space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img src={item.image_url || 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&h=100&fit=crop'} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">GH₵{item.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                                                <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {items.length > 0 && (
                            <footer className="p-6 border-t bg-gray-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-gray-800">Total</span>
                                    <span className="text-2xl font-bold text-gradient">GH₵{getCartTotal().toFixed(2)}</span>
                                </div>
                                <Button size="lg" className="w-full gradient-orange text-white hover:opacity-90" onClick={handleWhatsAppOrder}>
                                    Checkout on WhatsApp
                                </Button>
                                <Button size="lg" variant="link" className="w-full mt-2 text-red-500" onClick={clearCart}>
                                    Clear Cart
                                </Button>
                            </footer>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;