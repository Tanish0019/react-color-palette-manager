import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from './components/NewPaletteForm';
import { generatePalette } from "./utils/colorHelper";
import defaultPalettes from "./defaultPalettes";

class App extends React.Component {
	
	state = {
		palettes: defaultPalettes
	};
	
	findPalette = (id) => {
		return this.state.palettes.find(palette => {
			return palette.id === id;
		});
	}

	savePalette = (newPalette) => {
		console.log(newPalette)
		this.setState({
			palettes: [...this.state.palettes, newPalette]
		})
	};

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={routeProps => <PaletteList {...routeProps} palettes={this.state.palettes} />}
				/>
				<Route
					exact
					path="/palette/new"
					render={routeProps => <NewPaletteForm {...routeProps} savePalette={this.savePalette} palettes={this.state.palettes}/>}
				/>
				<Route
					exact
					path="/palette/:id"
					render={routeProps => (
						<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
					)}
				/>
				<Route
					exact
					path="/palette/:paletteid/:colorid"
					render={routeProps => (
						<SingleColorPalette
							colorid={routeProps.match.params.colorid}
							palette={generatePalette(this.findPalette(routeProps.match.params.paletteid))}
							{...routeProps}
						/>
					)}
				/>
			</Switch>
		);
	}
};

export default App;
