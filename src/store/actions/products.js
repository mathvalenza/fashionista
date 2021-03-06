import {
  SET_IS_LOADING,
  SET_PRODUCTS_LIST,
  SET_VISITED_PRODUCT,
  TOGGLE_SHOW_SEARCH
} from '../types';

import { getProducts } from 'services/api';

const generateIdByName = (name) => name.toLowerCase().replace(/\s+/g, '-');

export function setIsLoading(payload) {
  return {
    type: SET_IS_LOADING,
    payload
  };
}

export function setProducts() {
  return async (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: true });

    const products = await getProducts();

    dispatch({
      type: SET_PRODUCTS_LIST,
      payload: products.map((product) => ({
        ...product,
        id: generateIdByName(product.name)
      }))
    });

    dispatch({ type: SET_IS_LOADING, payload: false });
  };
}

export function setSelectedProduct(payload) {
  return {
    type: SET_VISITED_PRODUCT,
    payload
  };
}

export function toggleShowSearch() {
  return {
    type: TOGGLE_SHOW_SEARCH
  };
}
