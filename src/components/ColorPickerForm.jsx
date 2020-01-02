import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import styles from '../styles/ColorPickerFormStyles';

class ColorPickerForm extends React.Component {
	
	state = {
		currentColor: "teal",
		newColorName: ""
	};

	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule("isColorCodeUnique", value =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	updateColor = color => {
		this.setState({ currentColor: color.hex });
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = () => {
		const { newColorName, currentColor } = this.state;
		const newColor = {
			color: currentColor,
			name: newColorName
		};
		this.props.addNewColor(newColor);
		this.setState({ newColorName: "" });
	};

	render() {
		const { paletteFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker color={currentColor} onChange={this.updateColor} className={classes.picker}/>
				<ValidatorForm onSubmit={this.handleSubmit} ref="form">
					<TextValidator
						value={newColorName}
						margin="normal"
						className={classes.colorInput}
						placeholder="Color Name"
						name="newColorName"
						variant="filled"
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
						className={classes.addColor}
						disabled={paletteFull}
					>
						{paletteFull ? "Palette Full" : "Add Color"}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);