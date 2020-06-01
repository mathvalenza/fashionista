import React from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

import { ImagePlaceholder } from 'components';

export default function Product(props) {
  const { name } = useParams();

  return (
    <div className="container">
      <section className="product">
        <ImagePlaceholder
          name={name}
          image="https://d3l7rqep7l31az.cloudfront.net/images/products/20002605_615_catalog_1.jpg?1460136912"
        />
        <div className="product__detail">
          <div className="product__name">{name}</div>
          <div className="product__price">
            <span className="product__price--black">R$ 199,90</span>
            <span>em até 3x R$ 66,63</span>
          </div>
          <div className="product__size">
            <span>Escolha o tamanho</span>
          </div>
          <div className="product__size-options">
            <button className="product__size-option">P</button>
            <button className="product__size-option">M</button>
            <button className="product__size-option">G</button>
          </div>
          <button className="product__button">Adicionar à sacola</button>
        </div>
      </section>
    </div>
  );
}