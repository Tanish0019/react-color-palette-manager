import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import styles from '../styles/ColorPickerFormStyles';

function ColorPickerForm(props) {
	const [currentColor, setCurrentColor] = useState("teal");
	const [newColorName, setNewColorName] = useState("");
	const { paletteFull, classes, colors, addNewColor } = props;

	useEffect(() => {
		// FIXME: VALIDATOR DOESN'T WORK WITH useEffect :/
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule("isColorCodeUnique", value =>
			colors.every(({ color }) => color !== currentColor)
		);
	}, []);

	const updateColor = color => {
		setCurrentColor(color.hex);
	}

	const handleSubmit = () => {
		const newColor = {
			color: currentColor,
			name: newColorName
		};
		addNewColor(newColor);
		setNewColorName("");
	};

	return (
		<div>
			<ChromePicker color={currentColor} onChange={updateColor} className={classes.picker} />
			<ValidatorForm instantValidate={false} onSubmit={handleSubmit}>
				<TextValidator
					value={newColorName}
					margin="normal"
					className={classes.colorInput}
					placeholder="Color Name"
					name="newColorName"
					variant="filled"
					onChange={e => setNewColorName(e.target.value)}
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
					className={classes.addColor}
					disabled={paletteFull}
				>
					{paletteFull ? "Palette Full" : "Add Color"}
				</Button>
			</ValidatorForm>
		</div>
	);
}

export default withStyles(styles)(ColorPickerForm);