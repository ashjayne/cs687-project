import React, { useEffect, useContext } from 'react';
import { ShopContext } from './shopifyContext.js';
import { Link } from 'react-router-dom';

const Products = () => {

    const { fetchAllProducts, products } = useContext(ShopContext)

    useEffect(() => {
        fetchAllProducts()
        return () => {

        }
    }, [fetchAllProducts])

    console.log(products)
    
    return (
        <div className="container">
            {
                products.map(product => (
                <>
                    <Link to={`/products/${product.handle}`} key={product.id} >
                        <div className="productContainer">
                            <h1 className="productName">{product.title}</h1>
                            <img src={product.images[0].src} alt="Product" className="img" />
                            <p className="productPrice">${product.variants[0].price.amount}</p>
                            <button className="button">Purchase</button>
                        </div>
                    </Link>
                </>
                ))
            }
        </div>
    )
};

export default Products;