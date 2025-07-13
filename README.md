# Inventory Management API

A Node.js/Express backend API for inventory management with MongoDB database.

## Backend Features

- **RESTful API** for product CRUD operations
- **MongoDB Integration** with Mongoose ODM
- **CORS Enabled** for frontend communication
- **Error Handling** with proper HTTP status codes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS middleware

### Frontend
- React with Material-UI (basic CRUD interface)

## API Endpoints

### Products
- `POST /api/products` - Create new product
- `GET /api/products` - Get all products
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Product Schema
```javascript
{
  name: String,           // Product name
  sku: String,           // Stock Keeping Unit
  category: String,      // Product category
  unit_price: Number,    // Price per unit
  quantity_in_stock: Number // Available quantity
}
```

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB running on localhost:27017

### Installation
```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:5000`

## Database

- **MongoDB** connection: `mongodb://localhost:27017/dbconnect`
- **Collection**: `products`
- **ODM**: Mongoose for schema validation

## Project Structure
```
server/
├── server.js          # Express server & API routes
├── package.json       # Dependencies
└── node_modules/      # Installed packages
```

## Development

```bash
# Start server
npm start

# Or directly
node server.js
```

## Frontend Integration

The React frontend connects via proxy configuration in `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
``` 