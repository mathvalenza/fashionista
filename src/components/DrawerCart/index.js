import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

import {
  toggleShowCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from 'store/actions/cart';

import { subTotalSelector, itemsQuantitySelector } from 'store/selectors/cart';

import { Drawer, ImagePlaceholder } from 'components';
import { numberToCurrency } from 'utils';

export default function Cart() {
  const dispatch = useDispatch();
  const { showCart, cartItems } = useSelector((state) => state.cart);
  const subTotalPrice = useSelector(subTotalSelector);
  const itemsQuantity = useSelector(itemsQuantitySelector);
  const hasProductsInCart = itemsQuantity > 0;
  const subTotalFormated = `Subtotal: ${numberToCurrency(subTotalPrice)}`;

  const handleRemoveItem = (selectedSku) =>
    dispatch(removeFromCart(selectedSku));

  const handleDecrementQuantity = (selectedSku) =>
    dispatch(decrementQuantity(selectedSku));

  const handleIncrementQuantity = (selectedSku) =>
    dispatch(incrementQuantity(selectedSku));

  return (
    <Drawer
      title={`Sua sacola (${itemsQuantity})`}
      active={showCart}
      close={() => dispatch(toggleShowCart())}
    >
      {hasProductsInCart ? (
        <section className="cart">
          <div className="cart__content">
            {cartItems.map(
              ({
                name,
                actual_price,
                installments,
                image,
                quantity,
                selectedSku,
                sizes
              }) => {
                const size = sizes.find(({ sku }) => sku === selectedSku).size;

                return (
                  <article className="cart-item" key={selectedSku}>
                    <div className="cart-item__row">
                      <div className="cart-item__image">
                        <ImagePlaceholder image={image} name={name} />
                      </div>
                      <div className="cart-item__info">
                        <p className="cart__product-title">{name}</p>
                        <p className="cart__product-subtitle">Tam.: {size}</p>
                        <div className="change-quantity">
                          <button
                            className="change-quantity__button"
                            onClick={() => handleDecrementQuantity(selectedSku)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <span className="change-quantity__current">
                            {quantity}
                          </span>
                          <button
                            className="change-quantity__button"
                            onClick={() => handleIncrementQuantity(selectedSku)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="cart-item__price">
                        <p className="cart__product-title">{actual_price}</p>
                        <p className="cart__product-subtitle">{installments}</p>
                      </div>
                    </div>
                    <div className="cart-item__row">
                      <button
                        className="cart__remove"
                        onClick={() => handleRemoveItem(selectedSku)}
                      >
                        Remover item
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>
      ) : (
        <section className="cart--empty">
          <p>Sua sacola está vazia :(</p>
        </section>
      )}
      <section className="cart__footer">{subTotalFormated}</section>
    </Drawer>
  );
}
