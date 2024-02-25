const pool = require('../config/db');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId.userId;  
 
  try {
    // Check if the product is already in the user's cart
    const existingCartItem = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    if (existingCartItem.rows.length > 0) {
      // If the product is already in the cart, update the quantity
      const updatedQuantity = existingCartItem.rows[0].quantity + quantity;
      await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
        [updatedQuantity, userId, productId]
      );
      res.status(200).json({ message: 'Product quantity updated in cart' });
    } else {
      // If the product is not in the cart, add it
      await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)',
        [userId, productId, quantity]
      );
      res.status(201).json({ message: 'Product added to cart' });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const viewCart = async (req, res) => {
  const userId = req.userId.userId;  
  
  try {
    const cartItems = await pool.query(
      'SELECT products.*, cart_items.quantity FROM products INNER JOIN cart_items ON products.id = cart_items.product_id WHERE cart_items.user_id = $1',
      [userId]
    );
    res.json(cartItems.rows);
  } catch (error) {
    console.error('Error viewing cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  const userId = req.userId.userId;  
  
  try {
    await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3',
      [quantity, cartItemId, userId]
    );
    res.status(200).json({ message: 'Cart item quantity updated' });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeItemFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.userId.userId;  
  
  try {
    await pool.query(
      'DELETE FROM cart_items WHERE id = $1 AND user_id = $2',
      [cartItemId, userId]
    );
    res.status(200).json({ message: 'Cart item removed' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToCart, viewCart, updateCartItem, removeItemFromCart };
