import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteMetaForm extends React.Component {
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
		const { newPaletteName } = this.state;
		const { handleSubmit, formToggle, formShowing } = this.props;
		return (
			<Dialog open={formShowing} aria-labelledby="form-dialog-title" onClose={formToggle}>
				<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
					<DialogContent>
						<DialogContentText>
							Please enter a name for your palette.
						</DialogContentText>
						<TextValidator
							label="Palette Name"
							name="newPaletteName"
							fullWidth
							autoFocus
							margin="normal"
							value={this.state.newPaletteName}
							onChange={this.handleChange}
							validators={["required", "paletteNameUnique"]}
							errorMessages={["Enter Palette Name", "Name Already Used"]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={formToggle} color="primary">
							Cancel
						</Button>
						<Button type="submit" variant="contained" color="secondary">
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		);
	}
};

export default PaletteMetaForm;