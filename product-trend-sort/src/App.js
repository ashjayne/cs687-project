import React, { Component } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Home from './Home';
import Products from './Products';
import ProductPage from './ProductPage';

function fetchAPI() {
  axios.get('http://localhost:5000/get_data')
    .then(response => console.log(response.data))
}

class App extends Component {
  componentDidMount() {
    fetchAPI();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/products/:handle" element={<ProductPage />} />
              <Route exact path="/products" element={<Products />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;