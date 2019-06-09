import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	content: {
		height: "calc(100vh - 64px)",
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
});

class NewPaletteForm extends React.Component {
	state = {
		open: true,
		currentColor: "teal",
		colors: [],
		newName: ""
	};

	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);

		ValidatorForm.addValidationRule("isColorCodeUnique", value =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	toggleDrawer = () => {
		this.setState(prevState => ({ open: !prevState.open }));
	};

	updateColor = color => {
		console.log(color);
		this.setState({ currentColor: color.hex });
	};

	addNewColor = () => {
		const { newName, currentColor } = this.state;
		console.log(newName, currentColor);
		const newColor = {
			color: currentColor,
			name: newName
		};
		this.setState(prevState => ({ colors: [...prevState.colors, newColor], newName: '' }));
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { classes, theme } = this.props;
		const { open, currentColor, colors, newName } = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.toggleDrawer}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create New Color Palette
						</Typography>
					</Toolbar>
				</AppBar>
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
					<Typography variant="h4">Design Your Palette</Typography>
					<div>
						<Button variant="contained" color="secondary">
							Clear Palette
						</Button>
						<Button variant="contained" color="primary">
							Random Color
						</Button>
					</div>
					<ChromePicker color={currentColor} onChange={this.updateColor} />
					<ValidatorForm onSubmit={this.addNewColor} ref="form">
						<TextValidator
							value={newName}
							name="newName"
							onChange={this.handleChange}
							validators={["required", "isColorNameUnique", "isColorCodeUnique"]}
							errorMessages={[
								"This field is required",
								"Color Name Already Exists!",
								"Color Already Exists!"
							]}
						/>
						<Button
							variant="contained"
							color="primary"
							style={{ background: currentColor }}
							type="submit"
						>
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					{colors.map(color => (
						<DraggableColorBox key={color.name} color={color.color} name={color.name} />
					))}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
