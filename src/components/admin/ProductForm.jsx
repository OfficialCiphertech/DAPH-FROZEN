import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Upload, Link, Image as ImageIcon } from 'lucide-react';

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'frozen',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'frozen',
        image_url: product.image_url || ''
      });
      setImageFile(null);
    } else {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'frozen',
            image_url: ''
        });
        setImageFile(null);
    }
  }, [product]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setFormData(prev => ({ ...prev, image_url: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'image_url') {
        setImageFile(null);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: false,
        onUploadProgress: (event) => {
            if (event.total) {
                setUploadProgress(Math.round((event.loaded / event.total) * 100));
            }
        }
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(data.path);
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let finalImageUrl = formData.image_url;
      if (imageFile) {
        finalImageUrl = await uploadImage();
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        image_url: finalImageUrl,
      };

      let error;
      if (product) {
        const { error: updateError } = await supabase.from('products').update(productData).eq('id', product.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('products').insert([productData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: `Product ${product ? 'updated' : 'added'} successfully!`,
      });
      onClose(true);

    } catch (error) {
      toast({
        title: `Error ${product ? 'updating' : 'adding'} product`,
        description: error.message,
        variant: "destructive",
      });
      onClose(false);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text" required name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (GH₵)</label>
            <input
              type="number" step="0.01" required name="price" value={formData.price} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter price"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category" value={formData.category} onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="frozen">Frozen</option>
            <option value="dairy">Dairy</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            required name="description" value={formData.description} onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter product description"
          ></textarea>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">Upload from device</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
                <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="url" name="image_url" value={formData.image_url} onChange={handleChange}
                        className="w-full h-full px-4 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Or paste image URL"
                    />
                </div>
            </div>
            {(imageFile || formData.image_url) && (
                <div className="mt-4 flex items-center space-x-3">
                    <ImageIcon className="h-8 w-8 text-green-500" />
                    <span className="text-sm text-gray-700 truncate">{imageFile ? imageFile.name : formData.image_url}</span>
                </div>
            )}
        </div>

        {isSubmitting && uploadProgress > 0 && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uploading...</label>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
            </div>
        )}

        <div className="flex space-x-4">
          <Button type="submit" className="gradient-orange text-white hover:opacity-90" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </Button>
          <Button type="button" onClick={() => onClose(false)} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;