import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ShopContext } from './shopifyContext';

const ProductPage = () => {

  let { handle } = useParams()

  const { fetchProductWithHandle, fetchAllProducts, product } = useContext(ShopContext)

  useEffect(() => {
    fetchProductWithHandle(handle)
  }, [fetchProductWithHandle, handle])

  useEffect(() => {
    fetchAllProducts()
    return () => {

    }
  }, [fetchAllProducts])

  if (!product.title) return <div>Loading...</div>

  return (
      <>
          <div>
            <h1 key={product.id}>{product.title}</h1>
            <p>{product.description}</p>
            <img src={product.images[0].src} alt="Product" className="imgLarge" />
          </div>
          <div>
            <Link to="/products">Back to Products</Link>
          </div>
      </>
  )
};

export default ProductPage;