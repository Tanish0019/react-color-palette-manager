import React, { useState } from 'react';
import chroma from 'chroma-js';
import classNames from 'classnames';
import Axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { arrayMove } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/core/styles';
import Page from './Page';
import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import useToggle from '../hooks/useToggle';
import styles from '../styles/NewPaletteFormStyles';
import { MAX_COLORS, DEFAULT_PALETTES } from '../constants';

function NewPaletteForm(props) {
	// TODO: Decide wether to use default palette or not
	const [colors, setColors] = useState(DEFAULT_PALETTES[0].colors);
	const [open, toggleDrawer] = useToggle(true);

	const { classes } = props;

	const paletteFull = colors.length >= MAX_COLORS;

	const addNewColor = (newColor) => {
		const newColors = [...colors, newColor];
		setColors(newColors);
	};

	const removeColor = (colorName) => {
		const newColors = colors.filter((color) => color.name !== colorName);
		setColors(newColors);
	};

	const clearColors = () => {
		setColors([]);
	};

	const generateRandomColor = () => {
		let hexCode = chroma.random().hex();
		const newColor = {
			name: hexCode,
			color: hexCode,
		};
		return newColor;
	};

	const addRandomColor = () => {
		let duplicateColor = true;
		let randomColor;
		while (duplicateColor) {
			randomColor = generateRandomColor();
			// eslint-disable-next-line no-loop-func
			duplicateColor = colors.some(
				// eslint-disable-next-line
				(color) => color.color.toLowerCase() === randomColor.color.toLowerCase()
			);
		}
		const newColors = [...colors, randomColor];
		setColors(newColors);
	};

	// TODO: ADD PALETTE SAVE METHOD IN DISPATCH
	const handleSubmit = async (newPaletteName) => {
		const newPalette = {
			paletteName: newPaletteName,
			colors: colors,
		};
		try {
			const res = await Axios.post('/api/palette/new', newPalette);
			if (res.data.success) {
				props.history.push('/');
			}
		} catch (err) {
			// TODO: HANDLE ERROR
			console.log(err);
		}
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		const newColors = arrayMove(colors, oldIndex, newIndex);
		setColors(newColors);
	};

	return (
		<Page>
			<div className={classes.root}>
				<PaletteFormNav open={open} handleSubmit={handleSubmit} toggleDrawer={toggleDrawer} />
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant='h4' gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button variant='contained' color='secondary' onClick={clearColors}>
								Clear Palette
							</Button>
							<Button
								variant='contained'
								color='primary'
								onClick={addRandomColor}
								disabled={paletteFull}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm paletteFull={paletteFull} colors={colors} addNewColor={addNewColor} />
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={removeColor}
						axis={'xy'}
						distance={10}
						onSortEnd={onSortEnd}
					/>
				</main>
			</div>
		</Page>
	);
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
