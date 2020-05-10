import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Products, Product } from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/products" />
      <Route path="/products" component={Products} />
      <Route path={`/product/:productId`} component={Product} />
    </BrowserRouter>
  );
};
