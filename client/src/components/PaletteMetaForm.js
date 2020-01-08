import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function PaletteMetaForm(props) {
	const [newPaletteName, setNewPaletteName] = useState("");

	useEffect(() => {
		// FIXME: DOESN'T WORK WITH useEFFECT
		ValidatorForm.addValidationRule("paletteNameUnique", value =>
			props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value)
		);
	}, []);

	const { handleSubmit, toggleForm, formShowing } = props;
	return (
		<Dialog open={formShowing} aria-labelledby="form-dialog-title" onClose={toggleForm}>
			<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
			<ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
				<DialogContent>
					<DialogContentText>Please enter a name for your palette.</DialogContentText>
					<TextValidator
						label="Palette Name"
						name="newPaletteName"
						fullWidth
						autoFocus
						margin="normal"
						value={newPaletteName}
						onChange={(e) => setNewPaletteName(e.target.value)}
						validators={["required", "paletteNameUnique"]}
						errorMessages={["Enter Palette Name", "Name Already Used"]}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleForm} color="primary">
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="secondary">
						Save Palette
					</Button>
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	);
};
 