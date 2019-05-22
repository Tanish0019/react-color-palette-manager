import React, { Component } from "react";
import ColorBox from "./ColorBox";

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

	render() {
		const { format } = this.state;
		const colorBoxes = this._shades.map(shade => (
			<ColorBox name={shade.name} key={shade.name} color={shade[format]} />
		));
		return (
			<div className="Palette">
				<h1>Single Color Palette</h1>
				<div className="Palette-colors">{colorBoxes}</div>
			</div>
		);
	}
}

export default SingleColorPalette;
