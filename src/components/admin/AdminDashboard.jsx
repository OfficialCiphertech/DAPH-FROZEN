import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Package, ShoppingCart } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';

const AdminDashboard = ({ userEmail, onSignOut, products, isLoading, onProductUpdate }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormClose = () => {
    setEditingProduct(null);
    setShowProductForm(false);
    onProductUpdate();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {userEmail}</p>
          </div>
          <Button
            onClick={onSignOut}
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            Logout
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="gradient-orange p-3 rounded-lg"><Package className="h-6 w-6 text-white" /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="gradient-orange p-3 rounded-lg"><ShoppingCart className="h-6 w-6 text-white" /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
          {!showProductForm && (
            <Button
              onClick={handleAddNew}
              className="gradient-orange text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          )}
        </motion.div>

        {showProductForm && (
          <ProductForm
            product={editingProduct}
            onClose={handleFormClose}
          />
        )}
        
        <ProductList 
          products={products}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={onProductUpdate}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;