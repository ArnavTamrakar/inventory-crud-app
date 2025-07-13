import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography 
} from '@mui/material';
import EditProduct from './EditProduct';
import Navbar from './Navbar';


function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error))
  }, []);

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
  };

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
  };

  const handleSearch = (e) => {
      e.preventDefault()
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', marginTop: '80px' }}>
        <form onSubmit={handleSearch} >
          <input 
          type="text" 
          placeholder='Search' 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}/>
          <button type='submit'>Search</button>
        </form>

        <Typography variant="h4" gutterBottom>
          Product Inventory
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>SKU</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Unit Price</strong></TableCell>
                <TableCell><strong>Quantity in Stock</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .filter(product => 
                  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.unit_price}</TableCell>
                    <TableCell>{product.quantity_in_stock}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => setEditingProduct(product._id)}
                        style={{ marginRight: '8px' }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small" 
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Show EditProduct component when editing */}
        {editingProduct && (
          <EditProduct 
            productId={editingProduct}
            onClose={() => setEditingProduct(null)}
            onUpdate={handleEdit}
          />
        )}
      </div>
    </>
  )
}

export default ViewProducts 