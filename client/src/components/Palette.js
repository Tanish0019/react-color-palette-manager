import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Page from './Page';
import Navbar from './Navbar';
import Loader from './Loader';
import Error from './Error';
import NotFound from './NotFound';
import ColorBox from './ColorBox';
import Footer from './Footer';
import styles from '../styles/PaletteStyles';
import useFetchData from '../hooks/useFetchData';
import { generatePalette, getShades } from '../utils/colorHelper';

const useStyles = makeStyles(styles);

function Palette(props) {
	const [format, setFormat] = useState('hex');
	const [level, setLevel] = useState(500);
	const [selectedColorId, setSelectedColorId] = useState(null);
	const [paletteData, loading, error] = useFetchData(
		`/api/palette/${props.match.params.paletteID}`
	);
	const classes = useStyles();

	const changeLevel = (_, level) => {
		setLevel(level);
	};

	const handleFormatChange = (format) => {
		setFormat(format);
	};

	const renderContent = (showingAllColors) => {
		if (loading) {
			return <Loader size={60} thickness={3.6} />;
		}
		if (error) {
			return <Error />;
		}
		if (!paletteData) {
			return <NotFound />;
		}

		const palette = generatePalette(paletteData.palette);
		const { colors } = palette;
		const shades = selectedColorId ? getShades(palette, selectedColorId) : [];

		if (showingAllColors) {
			return colors[level].map((color) => (
				<ColorBox
					key={color.id}
					color={color[format]}
					name={color.name}
					colorId={color.id}
					selectColor={(colorId) => setSelectedColorId(colorId)}
					showFullPalette={true}
				/>
			));
		} else {
			return shades.map((shade) => (
				<ColorBox name={shade.name} key={shade.name} color={shade[format]} />
			));
		}
	};

	const showingAllColors = selectedColorId ? false : true;

	return (
		<Page>
			<div className={classes.root}>
				<Navbar
					level={level}
					changeLevel={changeLevel}
					handleFormatChange={handleFormatChange}
					showingAllColors={showingAllColors}
					loading={loading}
					handleBack={() => setSelectedColorId(null)}
				/>
				<div className={classes.paletteColors}>{renderContent(showingAllColors)}</div>
				<Footer paletteName={paletteData ? paletteData.palette.paletteName : ''} />
			</div>
		</Page>
	);
}

export default withRouter(Palette);
