import React, { useEffect, useState } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash, FaChartBar, FaImage } from "react-icons/fa";
import API from "../../api/api"; // axios setup here

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    subcategory: "",
    image: null,
    imageUrl: "",
  });
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  // Predefined categories & subcategories
  const categories = {
    "Kitchen Appliances": ["Mixer", "Toaster", "Microwave", "Refrigerator"],
    "Home Cleaning": ["Vacuum Cleaner", "Washing Machine", "Iron"],
    "Entertainment": ["TV", "Sound System", "Projector"],
  };

  // Load products
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Create / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      if (editing) {
        await API.put(`/products/${editing._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        subcategory: "",
        image: null,
        imageUrl: "",
      });
      setEditing(null);
      setPreview(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      subcategory: product.subcategory,
      imageUrl: product.imageUrl,
    });
    setEditing(product);
    setPreview(product.imageUrl || null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaBox className="text-blue-600" /> Seller Dashboard
        </h1>
        <FaChartBar
          className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600"
          title="Analytics"
        />
      </div>

      {/* Product Form */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {editing ? "Edit Product" : "Add New Product"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={(e) => {
              setForm({ ...form, category: e.target.value, subcategory: "" });
            }}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Subcategory */}
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
            required
            disabled={!form.category}
          >
            <option value="">Select Subcategory</option>
            {form.category &&
              categories[form.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
          </select>

          {/* Image Upload */}
          <div className="border rounded p-2 flex items-center gap-3">
            <FaImage className="text-gray-500 text-xl" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>

          {preview && (
            <div className="col-span-full flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex justify-center items-center gap-2 transition-all"
          >
            <FaPlus />
            {editing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-3">Product List</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Subcategory</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Stock</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <img
                      src={p.imageUrl || "https://via.placeholder.com/50"}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-3">{p.name}</td>
                  <td className="py-2 px-3">{p.category}</td>
                  <td className="py-2 px-3">{p.subcategory}</td>
                  <td className="py-2 px-3">₹{p.price}</td>
                  <td className="py-2 px-3">{p.stock}</td>
                  <td className="py-2 px-3 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
