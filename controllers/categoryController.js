const pool = require('../config/db');

const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllCategories };
