import React, { Component } from 'react';
import Client from 'shopify-buy';

const ShopContext = React.createContext();

const client = Client.buildClient({
    domain: 'quickstart-4000661a.myshopify.com',
    storefrontAccessToken: '6a39b23d97c0f95543f5914f1ef8f804'
});

export class ShopProvider extends Component {

    state = {
        product: {},
        products: []
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        this.setState({ products })
    }

    fetchProductWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle);
        this.setState({ product })
    }

    render() {
        return (
            <ShopContext.Provider
                value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithHandle: this.fetchProductWithHandle
                }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider;