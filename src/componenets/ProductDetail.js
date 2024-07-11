import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${id}`)  // Replace with actual API endpoint
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography>No product found</Typography>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="300"
        image={`path/to/images/${product.image}`}  // Replace with actual image path
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.company}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Price: $${product.price}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Rating: ${product.rating}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Category: ${product.category}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Discount: ${product.discount}%`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Availability: ${product.availability}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductDetail;
