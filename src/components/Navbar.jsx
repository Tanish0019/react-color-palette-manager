import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Navbar extends Component {
	
	state = {
		format: 'hex',
		snackbarOpen: false
	}
	
	handleSelectChange = (event) => {
		const format = event.target.value;
		this.props.handleFormatChange(format);
		this.setState({ format, snackbarOpen: true });
	}

	closeSnackbar = () => {
		this.setState({snackbarOpen: false});
	}

	render() {
		const { format, snackbarOpen } = this.state;
		const { level, changeLevel } = this.props;
		
		return (
			<nav className="Navbar">
				<div className="logo">
					<a href="#">Logo</a>
				</div>
				<div className="slider-container">
					<span>Level: { level }</span>
					<div className="slider">
						<Slider
							defaultValue={level}
							min={100} max={1000}
							onChange={changeLevel}
							step={100}
						/>
					</div>
				</div>
				<div className="select-container">
					<Select value={format} onChange={this.handleSelectChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">rgb - rgb(255, 255, 255)</MenuItem>
					</Select>
				</div>
				<Snackbar 
					anchorOrigin={{vertical: "bottom", horizontal: "left"}}
					open={snackbarOpen}
					autoHideDuration={3000}
					message={<span id="message-id">Format Changed!</span>}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton 
							onClick={this.closeSnackbar} 
							color="inherit" 
							key="close"
							aria-label='close'
						>
							<CloseIcon/>
						</IconButton>
					]}
				/>
			</nav>
		)
	}
}

export default Navbar;