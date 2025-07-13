import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inventory Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Add Product
        </Button>
        <Button color="inherit" component={Link} to="/products">
          View Products
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 