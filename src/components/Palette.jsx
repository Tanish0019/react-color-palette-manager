import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from './Footer';

class Palette extends Component {
	state = {
		level: 500,
		format: "hex"
	};

	changeLevel = level => {
		this.setState({ level });
	};

	handleFormatChange = format => {
		this.setState({ format });
	};

	render() {
		const { level, format } = this.state;
		const { colors, paletteName, emoji, id } = this.props.palette;
		console.log("rendered");
		return (
			<div className="Palette">
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleFormatChange={this.handleFormatChange}
					showingAllColors
				/>
				<div className="Palette-colors">
					{colors[level].map(color => (
						<ColorBox
							color={color[format]}
							name={color.name}
							paletteId={id}
							colorId={color.id}
							key={color.id}
							showFullPalette={true}
						/>
					))}
				</div>
				<Footer paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default Palette;
