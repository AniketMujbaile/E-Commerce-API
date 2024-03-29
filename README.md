# E-Commerce-API
API set to support e-commerce operations, such as product and category
listing, product details, cart management, and order processing. Use any SQL
database to manage product/category data, user cart information, and order details.
The API should also handle token management in the system.

## 🔗 Hosted link

Postman API Testing Documentation: [API Documentation](https://documenter.getpostman.com/view/24632237/2sA2rDvKdT)

## Technologies Used

- Node.js
- Express.js
- Postgres SQL
 
## Configuration File
1. Create a PostgreSQL database and update the connection details in `.env`.

```ENV

PORT=5000

DATABASE_URL=YOUR_URL

JWT_SECRET = YOUR_KEY
 
```
## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
npm start
```

## Endpoints

- `POST http://localhost:5000/register`: API to Register User

- `POST http://localhost:5000/login`: API to Login User

- `GET http://localhost:5000/`: API to Get all categories

- `GET http://localhost:5000/category/:categoryId`: API to Get products by category

- `GET http://localhost:5000/product/:productId`: API to Get product details by ID

- `POST http://localhost:5000/cart/add`: API to Add product to cart

- `GET http://localhost:5000/cart`: API to View cart product 

- `PUT http://localhost:5000/cart/:cartItemId`: API to Update cart item quantity

- `DELETE http://localhost:5000/cart/:cartItemId`: API to Remove item from cart

- `POST http://localhost:5000/place`: API to Place an order

- `GET http://localhost:5000/history`: API to Get order history 

- `GET http://localhost:5000/order-details/:orderId`: API to Get order details by ID