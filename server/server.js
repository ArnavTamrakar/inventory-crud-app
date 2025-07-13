const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/dbconnect')
     .then(() => console.log('Connected to MongoDB'))
     .catch(err => console.error('MongoDB connection error:', err))

// Product model
const Product = mongoose.model('Product', {
    name: String,
    sku: String,
    category: String,
    unit_price: Number,
    quantity_in_stock: Number,
})

// PRODUCT ENDPOINTS

// Add a new product
app.post("/api/products", async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.json({ message: "Product added", product })
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message })
    }
})

// Get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message })
    }
})

// Update a product
app.put("/api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
})

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
})

// (Keep your user endpoints if you still need them)

app.listen(5000, () => { console.log("Server has started") })