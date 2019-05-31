import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from './components/NewPaletteForm';
import { generatePalette } from "./utils/colorHelper";
import defaultPalettes from "./defaultPalettes";

function App() {
	console.log(generatePalette(defaultPalettes[0]));
	return (
		<Switch>
			<Route
				exact
				path="/"
				render={routeProps => <PaletteList {...routeProps} palettes={defaultPalettes} />}
			/>
			<Route
				exact
				path="/palette/new"
				render={routeProps => (
					<NewPaletteForm {...routeProps}/>
				)}
			/>
			<Route
				exact
				path="/palette/:id"
				render={routeProps => (
					<Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
				)}
			/>
			<Route
				exact
				path="/palette/:paletteid/:colorid"
				render={routeProps => (
					<SingleColorPalette
            colorid={routeProps.match.params.colorid}
						palette={generatePalette(findPalette(routeProps.match.params.paletteid))}
						{...routeProps}
					/>
				)}
			/>
		</Switch>
	);
}

function findPalette(id) {
	return defaultPalettes.find(palette => {
		return palette.id === id;
	});
}

export default App;
