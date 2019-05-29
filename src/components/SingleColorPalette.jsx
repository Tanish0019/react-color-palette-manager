import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from '../styles/PaletteStyles';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: "hex"
		};
		const { palette, colorid } = this.props;
		this._shades = this.getShades(palette, colorid);
		console.log(this._shades);
	}

	getShades = (palette, colorid) => {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter(color => color.id === colorid));
		}
		return shades;
	};

	handleFormatChange = format => {
		this.setState({ format });
	};

	render() {
		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const colorBoxes = this._shades.map(shade => (
			<ColorBox name={shade.name} key={shade.name} color={shade[format]} />
		));
		return (
			<div className={classes.Palette}>
				<Navbar handleFormatChange={this.handleFormatChange} paletteid={id} />
				<div className={classes.paletteColors}>{colorBoxes}</div>
				<Footer paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
