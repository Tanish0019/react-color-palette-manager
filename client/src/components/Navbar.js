import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';
import styles from '../styles/NavbarStyles';
import useToggle from '../hooks/useToggle';

const Navbar = (props) => {
	const [format, setFormat] = useState('hex');
	const [snackbarOpen, toggleSnackbar] = useToggle(false);

	const handleSelectChange = (event) => {
		const format = event.target.value;
		props.handleFormatChange(format);
		setFormat(format);
		toggleSnackbar();
	};

	const ValueLabelComponent = (props) => {
		const { children, open, value } = props;

		return (
			<Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
				{children}
			</Tooltip>
		);
	};

	const { level, changeLevel, showingAllColors, classes, handleBack, loading } = props;

	const renderNavbarContent = () => {
		if (loading) {
			return null;
		}
		return (
			<>
				<Select value={format} onChange={handleSelectChange}>
					<MenuItem value='hex'>HEX - #ffffff</MenuItem>
					<MenuItem value='rgb'>rgb - rgb(255, 255, 255)</MenuItem>
				</Select>
				{showingAllColors && (
					<div className={classes.slider}>
						<span>Level: {level}</span>
						<Slider
							defaultValue={500}
							value={level}
							ValueLabelComponent={ValueLabelComponent}
							getAriaValueText={() => `Color Intensity Level: ${level}`}
							aria-labelledby='discrete-slider'
							step={100}
							onChange={changeLevel}
							min={100}
							max={1000}
						/>
					</div>
				)}
				<div className={classes.rightContainer}>
					{!showingAllColors && (
						<IconButton
							aria-label='Back Button'
							aria-controls='menu-appbar'
							onClick={handleBack}
							color='inherit'
						>
							<ArrowBackIcon fontSize='large' />
						</IconButton>
					)}
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={snackbarOpen}
					autoHideDuration={3000}
					message={<span id='message-id'>Format Changed!</span>}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					onClose={toggleSnackbar}
					action={[
						<IconButton onClick={toggleSnackbar} color='inherit' key='close' aria-label='close'>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</>
		);
	};

	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<Link to='/'>React Color</Link>
			</div>
			{renderNavbarContent()}
		</nav>
	);
};

export default withStyles(styles)(Navbar);
