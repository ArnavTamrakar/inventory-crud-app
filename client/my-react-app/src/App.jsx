import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Navbar from './Navbar';

function SafeToggle() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [quantityInStock, setQuantityInStock] = useState('')
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the default form submission (page reload)
    fetch("/api/products", { // Sends a POST request to the backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tells backend to expect JSON
      },
      body: JSON.stringify({
        name,
        sku,
        category,
        unit_price: parseFloat(unitPrice),
        quantity_in_stock: parseInt(quantityInStock)
      }) // Sends the product data as JSON in the request body
    })
    .then(response => response.json()) // Parses the JSON response
    .then(data => {
      console.log('Product added to database:', data) // Logs the response
      setName('')
      setSku('')
      setCategory('')
      setUnitPrice('')
      setQuantityInStock('') // Clears the input fields
      setOpen(true) // Show success dialog
    })
    .catch(error => console.error('Error:', error)) // Handles any errors
  }
  
  useEffect (()=> {
    fetch("/api/products")
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(error => console.error('Error:', error))
  }, [])

  
  const handleEdit = (productId, newData) => {
    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Product updated:', data)
      // Refresh the products list
      fetch("/api/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error))
  }

  const handleDelete = (productId) => {
    fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log('Product deleted:', data);
      // Refresh the products list after deletion
      fetch("/api/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error deleting product:', error));
  }

  return (
    <>
      <Navbar />
      <div style={{ width: '100%' }}>
        <div style={{ padding: '20px', marginTop: '80px', maxWidth: '600px', margin: '80px auto 0 auto' }}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '30px' }}>
            Enter New Product
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="SKU"
                variant="outlined"
                value={sku}
                onChange={e => setSku(e.target.value)}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={e => setCategory(e.target.value)}
                >
                  <MenuItem value="fruit and vegetable">Fruit and Vegetable</MenuItem>
                  <MenuItem value="grocery">Grocery</MenuItem>
                  <MenuItem value="liquor">Liquor</MenuItem>
                  <MenuItem value="meat and deli">Meat and Deli</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Unit Price"
                variant="outlined"
                type="number"
                value={unitPrice}
                onChange={e => setUnitPrice(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Quantity in Stock"
                variant="outlined"
                type="number"
                value={quantityInStock}
                onChange={e => setQuantityInStock(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                style={{ marginTop: '20px' }}
              >
                Add Product
              </Button>
            </Box>
          </form>
          
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Submit Product</DialogTitle>
            <DialogContent>Product Data submitted successfully!</DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default SafeToggle
