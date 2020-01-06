import React from 'react'
import AppRouter from './AppRouter';
import { usePalette } from './contexts/PaletteContext';

export default function App() {
	
	const { loading, error } = usePalette();
	
	let content;
	if (loading) {
		content = <h1> L O A D E R </h1>
	} else if (error) {
		content = <h1>Error</h1>
	} else {
		content = <AppRouter />
	}

	return content;
}
