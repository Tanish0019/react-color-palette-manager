import React from "react";
import classNames from "classnames";
import PaletteFormNav from './PaletteFormNav';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { arrayMove } from "react-sortable-hoc";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from "./ColorPickerForm";
import styles from '../styles/NewPaletteFormStyles';

class NewPaletteForm extends React.Component {
	static defaultProps = {
		maxColors: 20
	}
	
	state = {
		open: true,
		colors: this.props.palettes[0].colors,
	};

	toggleDrawer = () => {
		this.setState(prevState => ({ open: !prevState.open }));
	};

	addNewColor = (newColor) => {
		this.setState(prevState => ({ colors: [...prevState.colors, newColor], newColorName: '' }));
	};

	handleSubmit = (newPaletteName) => {
		const newPalette = {
			id: newPaletteName.toLowerCase().replace(/ /g, "-"),
			paletteName: newPaletteName,
			colors: this.state.colors
		};
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}

	removeColor = (colorName) => {
		this.setState({
			colors: this.state.colors.filter(color => color.name !== colorName)
		});
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({colors}) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	}

	clearColors = () => {
		this.setState({
			colors: []
		});
	}

	addRandomColor = () => {
		const allColors = this.props.palettes.map(palette => palette.colors).flat();
		const random = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[random];
		this.setState({colors: [...this.state.colors, randomColor] })
	}

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;

		const paletteFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					toggleDrawer={this.toggleDrawer}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant="h4" gutterBottom>Design Your Palette</Typography>
						<div className={classes.buttons}>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								onClick={this.clearColors}
							>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								onClick={this.addRandomColor}
								disabled={paletteFull}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm
							paletteFull={paletteFull}
							colors={colors}
							addNewColor={this.addNewColor}
						/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={this.state.colors}
						removeColor={this.removeColor}
						axis={"xy"}
						distance={10}
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
