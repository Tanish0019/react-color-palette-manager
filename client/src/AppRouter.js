import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PrivateRoute from './PrivateRoute';
import PaletteList from './components/PaletteList';
import Palette from './components/Palette';
import NewPaletteForm from './components/NewPaletteForm';
import NotFound from './components/NotFound';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames='page' timeout={500}>
							<Switch location={location}>
								{/* TODO: FIX PAGE TRANSITION USING HOC */}
								<PrivateRoute path='/' exact component={PaletteList} />
								<PrivateRoute path='/palette/new' exact component={NewPaletteForm} />
								<PrivateRoute path='/palette/:paletteID' exact component={Palette} />
								<Route path='*' component={NotFound} />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		</BrowserRouter>
	);
}
