import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { toast } from '@/components/ui/use-toast';

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const adminEmails = ['richvybs92@gmail.com', 'vicadoma21@gmail.com'];
  const isAuthorized = user && adminEmails.includes(user.email);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProducts(data);
    }
    setIsLoadingProducts(false);
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchProducts();
    }
  }, [isAuthorized]);

  const handleProductUpdate = () => {
    fetchProducts();
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Daph Frozen & More</title>
        <meta name="description" content="Admin dashboard for Daph Frozen & More." />
      </Helmet>
      
      {isAuthorized ? (
        <AdminDashboard
          userEmail={user.email}
          onSignOut={signOut}
          products={products}
          isLoading={isLoadingProducts}
          onProductUpdate={handleProductUpdate}
        />
      ) : (
        <AdminLogin />
      )}
    </>
  );
};

export default Admin;