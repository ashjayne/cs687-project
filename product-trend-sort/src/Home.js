import React from 'react';

function Home (){
	return (
		<>
			<h1>CS687 Demo Store</h1>
			<p>Welcome to our online demo store, where Nintendo products are sorted by trending keywords.</p>
			<p>Products are assigned a Product Type value within the Shopify admin. Those Product Types are associated with a keyword trend search within a PyTrends script.
				The Products you see on the Products page are sorted from postive to negative interest over time.</p>
		</>
	)
}

export default Home;