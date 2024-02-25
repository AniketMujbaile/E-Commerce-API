const express = require('express')
const router = express.Router()

const userController = require("../controllers/userController")
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

const auth = require('../middlewares/auth')

// user routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Get all categories
router.get('/', auth.verifyToken, categoryController.getAllCategories);
// Get products by category
router.get('/category/:categoryId', auth.verifyToken, productController.getProductsByCategory);
// Get product details by ID
router.get('/product/:productId', auth.verifyToken, productController.getProductById);

// Add product to cart
router.post('/cart/add', auth.verifyToken, cartController.addToCart);
// View cart
router.get('/cart', auth.verifyToken, cartController.viewCart);
// Update cart item quantity
router.put('/cart/:cartItemId', auth.verifyToken, cartController.updateCartItem);
// Remove item from cart
router.delete('/cart/:cartItemId', auth.verifyToken, cartController.removeItemFromCart);

// Place an order
router.post('/place', auth.verifyToken, orderController.placeOrder);

// Get order history 
router.get('/history', auth.verifyToken, orderController.getOrderHistory);

// Get order details by ID
router.get('/order-details/:orderId', auth.verifyToken, orderController.getOrderById);

module.exports = router;