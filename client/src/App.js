import React from 'react';
import { toast } from 'react-toastify';
import AppRouter from './AppRouter';
import Loader from './components/Loader';
import { useUser } from './contexts/UserContext';

toast.configure({
	autoClose: 3000,
	position: 'bottom-right',
});

export default function App() {
	const { loading } = useUser();
	if (loading) {
		return <Loader size={200} thickness={4} />;
	}
	return <AppRouter />;
}
