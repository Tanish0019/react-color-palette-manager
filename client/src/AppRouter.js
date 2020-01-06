import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PrivateRoute from "./PrivateRoute";
import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";
import Palette from "./components/Palette";
import SingleColorPalette from "./components/SingleColorPalette";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="page" timeout={500}>
							<Switch location={location}>
								{/* TODO: FIX PAGE TRANSITION USING HOC */}
								<PrivateRoute path="/" exact component={PaletteList} />
								<PrivateRoute path="/palette/new" exact component={NewPaletteForm} />
								<PrivateRoute path="/palette/:paletteID" exact component={Palette} />
								<PrivateRoute
									path="/palette/:paletteID/:colorID"
									exact
									component={SingleColorPalette}
								/>
								{/* TODO: ADD 404 ROUTE */}
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		</BrowserRouter>
	);
}
