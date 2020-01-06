import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import axios from 'axios';
import Page from './components/Page';
import Home from './components/Home';
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from './components/NewPaletteForm';
import { generatePalette } from "./utils/colorHelper";
import defaultPalettes from "./defaultPalettes";


export default function App (props) {
	
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await axios.get('/api/user');
				const data = res.data;
				if (data.success) {
					setAuthenticated(true);
				}
			} catch(err) {
				setAuthenticated(false);
				// Handle Network Error
			}
		}
	}, []);

	state = {
		palettes: JSON.parse(window.localStorage.getItem("palettes")) || defaultPalettes
	};
	


	const findPalette = (id) => {
		return this.state.palettes.find(palette => {
			return palette.id === id;
		});
	}

	const savePalette = (newPalette) => {
		console.log(newPalette)
		this.setState({
			palettes: [...this.state.palettes, newPalette]
		}, this.syncLocalStorage);		
	};

	const deletePalette = (id) => {
		this.setState(prevState => ({
			palettes: prevState.palettes.filter(palette => palette.id !== id)
		}), this.syncLocalStorage);
	};

	const syncLocalStorage = () => {
		window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
	}

	return (
		<BrowserRouter>
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="page" timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path="/"
									render={routeProps => (
										// <PaletteList
										// 	{...routeProps}
										// 	palettes={this.state.palettes}
										// 	deletePalette={this.deletePalette}
										// />
										<Home/>
									)}
								/>
								<Route
									exact
									path="/palette/new"
									render={routeProps => (
										<Page>
											<NewPaletteForm
												{...routeProps}
												savePalette={this.savePalette}
												palettes={this.state.palettes}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:id"
									render={routeProps => (
										<Page>
											<Palette
												palette={generatePalette(this.findPalette(routeProps.match.params.id))}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:paletteid/:colorid"
									render={routeProps => (
										<Page>
											<SingleColorPalette
												colorid={routeProps.match.params.colorid}
												palette={generatePalette(
													this.findPalette(routeProps.match.params.paletteid)
												)}
												{...routeProps}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		</BrowserRouter>
	);
};


