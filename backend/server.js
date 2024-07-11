const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/api/products', async (req, res) => {
  try {
    // Mock data, replace with actual API calls to e-commerce companies
    const products = [
      { id: 1, name: 'Product 1', company: 'Company A', price: 100, rating: 4.5, category: 'Electronics', discount: 10, availability: 'In Stock', image: 'product1.jpg' },
      // Add more products here
    ];
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Mock data, replace with actual API call to fetch a single product by ID
    const product = { id, name: 'Product 1', company: 'Company A', price: 100, rating: 4.5, category: 'Electronics', discount: 10, availability: 'In Stock', image: 'product1.jpg' };
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
