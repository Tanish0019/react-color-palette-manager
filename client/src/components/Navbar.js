import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import styles from '../styles/NavbarStyles';
import "rc-slider/assets/index.css";
import useToggle from '../hooks/useToggle';

function Navbar(props) {
	// TODO: REDUNDANT STATE CLEANUP
	const [format, setFormat] = useState("hex");
	const [snackbarOpen, toggleSnackbar] = useToggle(false);

	const handleSelectChange = event => {
		const format = event.target.value;
		props.handleFormatChange(format);
		setFormat(format);
		toggleSnackbar();
	}

	const { level, changeLevel, showingAllColors, paletteid, classes } = props;

	return (
		<nav className={classes.Navbar}>
			<div className={classes.logo}>
				<Link to="/">Logo</Link>
			</div>
			{showingAllColors && (
				<div>
					<span>Level: {level}</span>
					<div className={classes.slider}>
						<Slider
							defaultValue={level}
							min={100}
							max={1000}
							onChange={changeLevel}
							step={100}
						/>
					</div>
				</div>
			)}
			<div className={classes.rightContainer}>
				{!showingAllColors && (
					<Button
						variant="outlined"
						color="primary"
						component={Link}
						className={classes.button}
						to={`/palette/${paletteid}`}
					>
						Back
					</Button>
				)}
				<Select value={format} onChange={handleSelectChange}>
					<MenuItem value="hex">HEX - #ffffff</MenuItem>
					<MenuItem value="rgb">rgb - rgb(255, 255, 255)</MenuItem>
				</Select>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={snackbarOpen}
				autoHideDuration={3000}
				message={<span id="message-id">Format Changed!</span>}
				ContentProps={{
					"aria-describedby": "message-id"
				}}
				onClose={toggleSnackbar}
				action={[
					<IconButton onClick={toggleSnackbar} color="inherit" key="close" aria-label="close">
						<CloseIcon />
					</IconButton>
				]}
			/>
		</nav>
	);
}


// class Navbar extends Component {
// 	state = {
// 		format: "hex",
// 		snackbarOpen: false
// 	};

// 	handleSelectChange = event => {
// 		const format = event.target.value;
// 		this.props.handleFormatChange(format);
// 		this.setState({ format, snackbarOpen: true });
// 	};

// 	closeSnackbar = () => {
// 		this.setState({ snackbarOpen: false });
// 	};

// 	render() {
		
// 		const { level, changeLevel, showingAllColors, paletteid, classes } = props;

// 		return (
// 			<nav className={classes.Navbar}>
// 				<div className={classes.logo}>
// 					<Link to="/">Logo</Link>
// 				</div>
// 				{showingAllColors && (
// 					<div>
// 						<span>Level: {level}</span>
// 						<div className={classes.slider}>
// 							<Slider defaultValue={level} min={100} max={1000} onChange={changeLevel} step={100} />
// 						</div>
// 					</div>
// 				)}
// 				<div className={classes.rightContainer}>
// 					{!showingAllColors && (
// 						<Button
// 							variant="outlined"
// 							color="primary"
// 							component={Link}
// 							className={classes.button}
// 							to={`/palette/${paletteid}`}
// 						>
// 							Back
// 						</Button>
// 					)}
// 					<Select value={format} onChange={handleSelectChange}>
// 						<MenuItem value="hex">HEX - #ffffff</MenuItem>
// 						<MenuItem value="rgb">rgb - rgb(255, 255, 255)</MenuItem>
// 					</Select>
// 				</div>
// 				<Snackbar
// 					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
// 					open={snackbarOpen}
// 					autoHideDuration={3000}
// 					message={<span id="message-id">Format Changed!</span>}
// 					ContentProps={{
// 						"aria-describedby": "message-id"
// 					}}
// 					onClose={toggleSnackbar}
// 					action={[
// 						<IconButton onClick={toggleSnackbar} color="inherit" key="close" aria-label="close">
// 							<CloseIcon />
// 						</IconButton>
// 					]}
// 				/>
// 			</nav>
// 		);
// 	}
// };

export default withStyles(styles)(Navbar);
