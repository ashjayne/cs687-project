import React from 'react';

function Home (){
	return (
		<>
			<h1>CS687 Demo Store</h1>
			<p>Welcome to our online demo store, where we well Nintendo products sorted my trending keywords.</p>
			<p>Products are assigned a Product Type value within the Shopify admin. Those Product Types are associated with a keyword trend search within a PyTrends script.
				The Products you see on the Products page are sorted from postive to negative interest over time.</p>
			<img src="https://assets.nintendo.com/image/upload/ncom/en_US/merchandising/center-stage-stories/2023/09-September/Hero-Carousel-Desktop-Slide-1-3600x1300" alt="Super Mario" width="100%" />
		</>
	)
}

export default Home;