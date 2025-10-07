const Product = require('../models/product');

// @desc Get all products or search
// @route GET /api/products?search=keyword
// @access Public
const getProducts = async (req, res) => {
  const search = req.query.search || '';
  
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc Create new product (for testing / admin use)
// @route POST /api/products
// @access Public
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const product = new Product({ name, description, price, image, category });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

module.exports = { getProducts, createProduct };
