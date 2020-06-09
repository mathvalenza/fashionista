import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.css';

import { setProducts, setSelectedProduct } from 'store/actions/products';

import Card from './Card';

export default function Products({ history, stateProducts }) {
  const { productsList, isLoading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

  function handleClick(product) {
    history.push(`/product/${product.id}`);

    dispatch(setSelectedProduct(product));
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="loading">
          <div className="loading__content">
            <div className="loading__message">Carregando...</div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="products">
            <h3 className="products__title">
              Exibindo {productsList.length} itens
            </h3>
            <section className="products__list">
              {productsList &&
                productsList.map((product, index) => (
                  <div key={index} className="products__item">
                    <Card {...product} onClick={() => handleClick(product)} />
                  </div>
                ))}
            </section>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
