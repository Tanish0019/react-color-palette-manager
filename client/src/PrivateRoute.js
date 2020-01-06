import React from 'react'
import { Route } from 'react-router-dom';
import { useUser } from  './contexts/UserContext';
import Login from './components/Login';

export default function PrivateRoute({component: Component, ...options}) {
	const { authenticated } = useUser();
	
	let FinalComponent = authenticated ? Component : Login;
	return (
		<Route 
			{...options} 
			render={routeProps => (
				<FinalComponent {...routeProps} {...options} />
			)}	
		/>
	)
};
