const pool = require('../config/db');

const placeOrder = async (req, res) => {
 const userId = req.userId.userId;  
 const products = req.body.products;

  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    let totalAmount = 0;
    for (const product of products) {
      const productInfo = await client.query('SELECT price FROM products WHERE id = $1', [product.productId]);
      totalAmount += productInfo.rows[0].price * product.quantity;
    }

    const order = await client.query(
      'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
      [userId, totalAmount]
    );
    const orderId = order.rows[0].id;

    for (const product of products) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
        [orderId, product.productId, product.quantity]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    console.error('Error placing order:', error);
    if (client) {
      await client.query('ROLLBACK');
    }
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      client.release();
    }
  }
};

const getOrderHistory = async (req, res) => {
  const userId = req.userId.userId;  

  try {
    const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    res.json(orders.rows);
  } catch (error) {
    console.error('Error getting order history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (order.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order.rows[0]);
  } catch (error) {
    console.error('Error getting order by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { placeOrder, getOrderHistory, getOrderById };
