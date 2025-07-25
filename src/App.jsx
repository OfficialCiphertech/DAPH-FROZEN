import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import FloatingContact from '@/components/FloatingContact';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
          </main>
          <Footer />
          <FloatingContact />
          <Toaster />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;