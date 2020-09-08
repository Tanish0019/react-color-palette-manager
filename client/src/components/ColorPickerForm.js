import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import styles from '../styles/ColorPickerFormStyles';

const useStyles = makeStyles(styles);

export default function ColorPickerForm(props) {
	const [currentColor, setCurrentColor] = useState('teal');
	const [newColorName, setNewColorName] = useState('');
	const [errorText, setErrorText] = useState('');

	const classes = useStyles();

	const { paletteFull, colors, addNewColor } = props;

	useEffect(() => {
		setErrorText('');
	}, [newColorName, currentColor]);

	const uniqueColorName = () =>
		colors.every(({ name }) => name.toLowerCase() !== newColorName.toLowerCase());

	const uniqueColor = () => colors.every(({ color }) => color !== currentColor);

	const validate = () => {
		if (!uniqueColor()) {
			return 'Color already exists!';
		}
		if (newColorName === '') {
			return 'Color name cannot be empty!';
		}
		if (!uniqueColorName()) {
			return 'Color name already exists!';
		}
		return '';
	};

	const updateColor = (color) => {
		setCurrentColor(color.hex);
	};

	const handleSubmit = () => {
		const errorMessage = validate();
		if (errorMessage !== '') {
			setErrorText(errorMessage);
			return;
		}
		const newColor = {
			color: currentColor,
			name: newColorName,
		};
		setErrorText('');
		addNewColor(newColor);
		setNewColorName('');
	};
	const addButtonTextColor =
		chroma(currentColor).luminance() <= 0.15 ? 'rgba(240, 240, 240, 0.8)' : 'rgba(0, 0, 0, 0.8)';
	return (
		<div>
			<ChromePicker color={currentColor} onChange={updateColor} className={classes.picker} />
			<TextField
				value={newColorName}
				className={classes.colorInput}
				placeholder='Color Name'
				name='newColorName'
				onChange={(e) => setNewColorName(e.target.value)}
				error={errorText !== ''}
				helperText={errorText}
			/>
			<Button
				variant='contained'
				size='medium'
				style={{ backgroundColor: currentColor, color: addButtonTextColor }}
				type='submit'
				onClick={handleSubmit}
				className={classes.addColor}
				disabled={paletteFull}
			>
				{paletteFull ? 'Palette Full' : 'Add Color'}
			</Button>
		</div>
	);
}
