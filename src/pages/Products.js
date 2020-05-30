import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setProducts } from '../store/actions/products';
import { toggleShowCart } from '../store/actions/cart';

import { ProductCard, Drawer } from '../components';

export default function Products({ history, stateProducts }) {
  const { productsList, isLoading } = useSelector((state) => state.products);
  const { showCart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

  function handleClick(name) {
    history.push(`/product/${name}`, { name });
  }

  return (
    <div className="container">
      <div className="products">
        {isLoading ? (
          <h1>Carregando...</h1>
        ) : (
          <React.Fragment>
            <h3 className="products__title">{productsList.length} itens</h3>
            <button onClick={() => dispatch(toggleShowCart())}>
              Toggle drawer
            </button>
            <section className="products__cards">
              {productsList &&
                productsList.map((product, index) => (
                  <ProductCard key={index} {...product} onClick={handleClick} />
                ))}
            </section>
          </React.Fragment>
        )}
      </div>
      {<Drawer active={showCart} close={() => dispatch(toggleShowCart())} />}
    </div>
  );
}
