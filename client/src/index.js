import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import './styles/index.css';

ReactDOM.render(
	<UserProvider>
		<App />
	</UserProvider>,
	document.getElementById('root')
);
