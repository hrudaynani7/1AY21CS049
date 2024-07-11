import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/product/:id" component={ProductDetail} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
