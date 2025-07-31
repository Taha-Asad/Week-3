import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = product ? 'PUT' : 'POST';
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save product');
      const saved = await res.json();
      onSave(saved, !!product);
      onClose();
    } catch (err) {
      alert(err.message || 'Error saving product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-dark">
            {product ? 'Edit Product' : 'New Product'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Product Name"
            required
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Category"
            required
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            type="number"
            step="0.01"
            placeholder="Price"
            required
          />
          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            type="number"
            placeholder="Stock Quantity"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal