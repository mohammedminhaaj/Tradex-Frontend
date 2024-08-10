import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Wallet from '../pages/Wallet';
import Browse from '../pages/Browse';

export const router = createBrowserRouter([
	/*
		Defining all the routes inside the application
	*/
	{
		path: '/',
		element: <Navigate to='/login' replace={true} />,
		errorElement: <NotFound />, // Not found page
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
	{
		path: '/dashboard/wallet',
		element: <Wallet />,
	},
	{
		path: 'dashboard/browse',
		element: <Browse />,
	},
]);
