import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { PaletteProvider } from './contexts/PaletteContext';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<UserProvider>
		<PaletteProvider>
			<App />
		</PaletteProvider>
	</UserProvider>,
	document.getElementById("root")
);

serviceWorker.register();
