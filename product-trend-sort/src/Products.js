import React, { useEffect, useContext, useState, useCallback } from 'react';
import { ShopContext } from './shopifyContext.js';
import { Link } from 'react-router-dom';

const Products = () => {
    const { fetchAllProducts, products } = useContext(ShopContext);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [typeValues, setTypeValues] = useState({});

    const fetchTypeValues = async () => {
        try {
            const response = await fetch('http://localhost:5000/get_trend_data'); // call trend data from API
            const data = await response.json();
            setTypeValues(data);
        } catch (error) {
            console.error('Error fetching type values:', error);
        }
    };

    const sortProducts = useCallback(() => {
        const sorted = [...products];
        sorted.sort((a, b) => {
            const getProductTypeValue = (productType) => {
                return typeValues[productType] || 0;
            };

            const aValue = getProductTypeValue(a.productType);
            const bValue = getProductTypeValue(b.productType);

            return bValue - aValue; // Sort in descending order (from positive to negative values)
        });
        setSortedProducts(sorted);
    }, [products, typeValues]);

    useEffect(() => {
        fetchAllProducts();
        fetchTypeValues();          // Fetch productType values when the component mounts
        return () => {
        };
    }, [fetchAllProducts]);

    useEffect(() => {               // Handles re-sorting when products or type values change
        sortProducts();
    }, [products, typeValues, sortProducts]);

    return (
        <div className="container">
            {sortedProducts.map((product) => (
                <Link to={`/products/${product.handle}`} key={product.id}>
                    <div className="productContainer">
                        <h1 className="productName">{product.title}</h1>
                        <img src={product.images[0].src} alt="Product" className="img" />
                        <p className="productPrice">${product.variants[0].price.amount}</p>
                        <button className="button">Purchase</button>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Products;