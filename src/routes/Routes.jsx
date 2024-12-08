import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import Homepage from "../pages/Homepage.jsx";
import AuctionPage from "../pages/AuctionPage.jsx";
import NewAuctionPage from "../pages/NewAuctionPage.jsx";

const Routes = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Auth />,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/auctions',
			element: <Homepage />,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/auction/information',
			element: <AuctionPage />,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/auction/new',
			element: <NewAuctionPage />,
			errorElement: <h1>404 NOT FOUND</h1>
		}
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
