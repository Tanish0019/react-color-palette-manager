import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import Page from "./Page";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import Footer from './Footer';
import styles from "../styles/PaletteStyles";
import { generatePalette } from '../utils/colorHelper';
import { usePalette } from "../contexts/PaletteContext";

function Palette(props) {
	const [format, setFormat] = useState("hex");
	const [level, setLevel] = useState(500);
	const { palettes } = usePalette();
	
	const { classes } = props;

	const changeLevel = level => {
		setLevel(level);
	};

	const handleFormatChange = format => {
		setFormat(format);
	};

	const currentPalette = palettes.filter(palette => palette._id === props.match.params.paletteID)[0];
		
	if (!currentPalette) {
		return <h1> Not found </h1>
	}
	
	const palette = generatePalette(currentPalette);
	const { colors, paletteName, _id } = palette;
			
	return (
		<Page>
			<div className={classes.Palette}>
				<Navbar
					level={level}
					changeLevel={changeLevel}
					handleFormatChange={handleFormatChange}
					showingAllColors
				/>
				<div className={classes.paletteColors}>
					{colors[level].map(color => (
						<ColorBox
							color={color[format]}
							name={color.name}
							paletteId={_id}
							colorId={color.id}
							key={color.id}
							showFullPalette={true}
						/>
					))}
				</div>
				<Footer paletteName={paletteName} />
			</div>
		</Page>
	);
}

export default withStyles(styles)(withRouter(Palette));
