import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from './shopifyContext.js';
import { Link } from 'react-router-dom';

const Products = () => {
    const { fetchAllProducts, products } = useContext(ShopContext);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortBy, setSortBy] = useState('title'); // Default sorting by title

    useEffect(() => {
        fetchAllProducts();
        return () => {
            // Clean up
        };
    }, [fetchAllProducts]);

    useEffect(() => {
        // Whenever the products or sorting criteria change, re-sort the products
        sortProducts();
    }, [products, sortBy]);

    const sortProducts = () => {
        const sorted = [...products];
        sorted.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'price-low-to-high') {
                return a.variants[0].price.amount - b.variants[0].price.amount;
            } else if (sortBy === 'price-high-to-low') {
                return b.variants[0].price.amount - a.variants[0].price.amount;
            }
            return 0;
        });
        setSortedProducts(sorted);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className="container">
            <div>
                <label>Sort by: </label>
                <select onChange={handleSortChange} value={sortBy}>
                    <option value="title">Title</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                </select>
            </div>
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