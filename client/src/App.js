import React from 'react';
import AppRouter from './AppRouter';
import Loader from './components/Loader';
import { useUser } from './contexts/UserContext';

export default function App() {
	const { loading } = useUser();
	if (loading) {
		return <Loader size={200} thickness={4} />;
	}
	return <AppRouter />;
}
