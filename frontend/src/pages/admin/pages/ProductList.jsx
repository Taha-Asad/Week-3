import React, { useEffect, useState } from 'react';
import { Plus, Loader2, Trash, Pencil } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductModal from '../components/modals/ProductModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ open: false, product: null });
  const [confirmData, setConfirmData] = useState({ open: false, product: null });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    const { product } = confirmData;
    if (!product) return;

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Product deleted');
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      toast.error(err.message || 'Error deleting product');
    } finally {
      setConfirmData({ open: false, product: null });
    }
  };

  const handleSave = (updatedProduct, isEdit) => {
    if (isEdit) {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } else {
      setProducts((prev) => [updatedProduct, ...prev]);
    }
    toast.success(`Product ${isEdit ? 'updated' : 'created'}`);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-text-dark">Products</h2>
        <button
          onClick={() => setModalData({ open: true, product: null })}
          className="flex items-center px-4 py-2 bg-primary-accent text-white rounded-lg shadow-md text-sm sm:text-base"
        >
          <Plus className="mr-2" size={18} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin text-primary-accent" size={24} />
          <span className="ml-3 text-text-medium">Loading...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-bg-secondary">
              <tr>
                <th className="th">ID</th>
                <th className="th">Name</th>
                <th className="th">Category</th>
                <th className="th">Price</th>
                <th className="th">Stock</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="td">{p.id}</td>
                  <td className="td">{p.name}</td>
                  <td className="td">{p.category}</td>
                  <td className="td">${p.price.toFixed(2)}</td>
                  <td className="td">{p.stock}</td>
                  <td className="td">
                    <button
                      onClick={() => setModalData({ open: true, product: p })}
                      className="iconBtn text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setConfirmData({ open: true, product: p })}
                      className="iconBtn text-red-600 ml-2"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {modalData.open && (
        <ProductModal
          product={modalData.product}
          onClose={() => setModalData({ open: false, product: null })}
          onSave={handleSave}
        />
      )}

      {confirmData.open && (
        <ConfirmationModal
          title="Confirm Deletion"
          message={`Are you sure you want to delete "${confirmData.product?.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmData({ open: false, product: null })}
        />
      )}
    </div>
  );
};

export default ProductsList;
