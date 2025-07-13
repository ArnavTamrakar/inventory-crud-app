import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

function EditProduct({ productId, onClose, onUpdate }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');

  // Fetch current product data when component mounts
  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        setName(product.name);
        setSku(product.sku);
        setCategory(product.category);
        setUnitPrice(product.unit_price);
        setQuantityInStock(product.quantity_in_stock);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the update function with new data
    onUpdate(productId, { 
      name, 
      sku, 
      category, 
      unit_price: parseFloat(unitPrice), 
      quantity_in_stock: parseInt(quantityInStock) 
    });
    
    // Close the edit form
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="SKU"
            variant="outlined"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setUnitPrice(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Quantity in Stock"
            variant="outlined"
            type="number"
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProduct; 