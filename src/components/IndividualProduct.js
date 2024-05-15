import React from 'react';
import './IndividualProduct.css';

const IndividualProduct = ({ individualProduct }) => {
  return (
    <div className="product">
      <div className="product-img-container">
        <img src={individualProduct.prodURL} alt="product-img" className="product-img" />
      </div>
      <div className="product-details">
        <div className="product-text title">{individualProduct.prodTitle}</div>
        <div className="product-text description">{individualProduct.prodDesc}</div>
        <div className="product-text price">Price: {individualProduct.prodPrice}</div>
        <div className="product-text quantity">Qty: {individualProduct.prodQty}</div>
      </div>
    </div>
  );
};

export default IndividualProduct;
