import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import PaletteMetaForm from './PaletteMetaForm';
import useToggle from '../hooks/useToggle';
import styles from "../styles/PaletteFormNavStyles";


function PaletteFormNav(props) {
	const [formShowing, toggleForm] = useToggle();

	const { classes, open, palettes, handleSubmit } = props;
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
						onClick={props.toggleDrawer}
						className={classNames(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Create New Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={toggleForm}
					>
						Save
					</Button>
					<Link to="/">
						<Button className={classes.button} variant="contained" color="primary">
							Back
						</Button>
					</Link>
				</div>
			</AppBar>
			<PaletteMetaForm
				formShowing={formShowing}
				palettes={palettes}
				handleSubmit={handleSubmit}
				toggleForm={toggleForm}
			/>
		</div>
	);
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);