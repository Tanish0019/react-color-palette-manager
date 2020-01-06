import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import styles from '../styles/PaletteStyles';
import Page from './Page';
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import Footer from "./Footer";
import { usePalette } from "../contexts/PaletteContext";
import { generatePalette } from "../utils/colorHelper";

function SingleColorPalette(props) {
	const [format, setFormat] = useState("hex");
	const { palettes } = usePalette();
	const { classes } = props;
	
	const handleFormatChange = format => {
		setFormat(format);
	}

	const getShades = (palette, colorid) => {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter(color => color.id === colorid));
		}
		return shades;
	};
	
	const currentPalette = palettes.filter(
			palette => palette._id === props.match.params.paletteID
	)[0];

	if (!currentPalette) {
		return <h1>NOT FOUND</h1>
	}
	
	const palette = generatePalette(currentPalette);
	const colorID = props.match.params.colorID;
	const shades = getShades(palette, colorID);
	const { paletteName, _id } = palette

	return (
		<Page>
			<div className={classes.Palette}>
				<Navbar handleFormatChange={handleFormatChange} paletteid={_id} />
				<div className={classes.paletteColors}>
					{shades.map(shade => (
						<ColorBox name={shade.name} key={shade.name} color={shade[format]} />
					))}
				</div>
				<Footer paletteName={paletteName} />
			</div>
		</Page>
	);
}

export default withStyles(styles)(SingleColorPalette);
