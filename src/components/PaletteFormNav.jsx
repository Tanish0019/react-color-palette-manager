import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 400;
const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: "row",
		justifyContent: "space-between"
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
	}
});

class PaletteFormNav extends React.Component {
	state = {
		newPaletteName: ""
	};

	componentDidMount() {
		ValidatorForm.addValidationRule("paletteNameUnique", value =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value)
		);
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { classes, open } = this.props;
		const { newPaletteName } = this.state;
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
							onClick={this.props.toggleDrawer}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create New Color Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<ValidatorForm onSubmit={() => this.handleSubmit(newPaletteName)}>
							<TextValidator
								label="Palette Name"
								name="newPaletteName"
								value={this.state.newPaletteName}
								onChange={this.handleChange}
								validators={["required", "paletteNameUnique"]}
								errorMessages={["Enter Palette Name", "Name Already Used"]}
							/>
							<Button type="submit" variant="contained" color="secondary">
								Save Palette
							</Button>
						</ValidatorForm>
						<Link>
							<Button variant="contained" color="primary">
								Go Back
							</Button>
						</Link>
					</div>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);