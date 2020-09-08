import React from 'react';
import { Route } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import Login from './components/Login';

export default function PrivateRoute({ component: Component, ...options }) {
	const { userData } = useUser();
	let RenderComponent = userData ? Component : Login;
	return (
		<Route {...options} render={(routeProps) => <RenderComponent {...routeProps} {...options} />} />
	);
}
