import React from 'react';
import IndividualProduct from './IndividualProduct';
import './IndividualProduct.css';

const Products = ({ products }) => {
  if (!products) {
    return null; // or you can return a loading indicator or an error message
  }

  return (
    <div className="products-container">
      {products.map((individualProduct) => (
        <IndividualProduct key={individualProduct.ID} individualProduct={individualProduct} />
      ))}
    </div>
  );
};

export default Products;