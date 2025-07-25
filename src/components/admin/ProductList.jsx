import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Package } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

const ProductList = ({ products, isLoading, onEdit, onDelete }) => {
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        toast({
          title: "Error deleting product",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Product deleted successfully!",
        });
        onDelete();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Products ({products.length})</h2>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-600">Add your first product to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.image_url || 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&h=100&fit=crop'}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">GH₵{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button onClick={() => onEdit(product)} size="sm" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50"><Edit className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDelete(product.id)} size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ProductList;