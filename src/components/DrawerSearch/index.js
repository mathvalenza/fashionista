import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.css';

import { toggleShowSearch, setSelectedProduct } from 'store/actions/products';

import { searchSelector } from 'store/selectors/products';

import { Drawer, ImagePlaceholder } from 'components';

export default function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { showSearch } = useSelector((state) => state.products);
  const filteredProducts = useSelector(searchSelector(search));

  const handleChangeInput = (event) => setSearch(event.target.value);

  const handleClose = () => {
    dispatch(toggleShowSearch());
    setSearch('');
  };

  const handleClickProduct = (product) => {
    dispatch(setSelectedProduct(product));

    history.push(`/product/${product.id}`);

    handleClose();
  };

  return (
    <Drawer title="Buscar produtos" active={showSearch} close={handleClose}>
      <section className="search">
        <div className="search__form">
          <input
            className="search__input"
            placeholder="Pesquise por um produto..."
            data-testid="search-input"
            value={search}
            onChange={(event) => handleChangeInput(event)}
          />
        </div>
        <div className="search__content" data-testid="search-content">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <section
                key={index}
                className="filtered-product"
                onClick={() => handleClickProduct(product)}
              >
                <div className="filtered-product__image">
                  <ImagePlaceholder image={product.image} />
                </div>
                <div className="filtered-product__name">{product.name}</div>
                <div>
                  <p className="filtered-product__price">
                    {product.actual_price}
                  </p>
                  <p className="filtered-product__installments">
                    {product.installments}
                  </p>
                </div>
              </section>
            ))
          ) : (
            <div className="search--empty">
              <p>Nenhum produto encontrado :(</p>
            </div>
          )}
        </div>
      </section>
    </Drawer>
  );
}
