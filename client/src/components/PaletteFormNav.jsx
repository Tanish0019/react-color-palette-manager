import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PaletteMetaForm from './PaletteMetaForm';
import styles from '../styles/PaletteFormNavStyles';

class PaletteFormNav extends React.Component {
	state = {
		formShowing: false,
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	formToggle = () => {
		this.setState({ formShowing: !this.state.formShowing });
	}

	render() {
		const { classes, open, palettes, handleSubmit } = this.props;
		const { formShowing } = this.state;
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
							Create New Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={this.formToggle}
						>
							Save
						</Button>
						<Link to="/">
							<Button 
								className={classes.button} 
								variant="contained"
								color="primary"
							>
								Back
							</Button>
						</Link>
					</div>
				</AppBar>
				<PaletteMetaForm
					formShowing={formShowing}
					palettes={palettes}
					handleSubmit={handleSubmit}
					formToggle={this.formToggle}
				/>
			</div>
		);
	}
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);