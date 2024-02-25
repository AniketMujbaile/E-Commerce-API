const pool = require('../config/db');

const getProductsByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  if (isNaN(categoryId)) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }
  try {
    const products = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);
    res.json(products.rows);
  } catch (error) {
    console.error('Error getting products by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    if (product.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product.rows[0]);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProductsByCategory, getProductById };

 