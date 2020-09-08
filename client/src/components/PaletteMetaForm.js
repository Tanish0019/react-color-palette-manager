import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, FormControl } from '@material-ui/core';

export default function PaletteMetaForm(props) {
	const [newPaletteName, setNewPaletteName] = useState('');
	const [nameValidation, setNameValidation] = useState('');
	const initialRender = useRef(true);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			if (newPaletteName === '') {
				setNameValidation('Palette name cannot be empty!');
			} else {
				setNameValidation('');
			}
		}
	}, [newPaletteName]);

	const { handleSubmit, toggleForm, formShowing } = props;
	return (
		<Dialog open={formShowing} aria-labelledby='form-dialog-title' onClose={toggleForm}>
			<DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
			<FormControl>
				<DialogContent>
					<DialogContentText>Please enter a name for your palette.</DialogContentText>
					<TextField
						label='Palette Name'
						error={nameValidation !== ''}
						helperText={nameValidation}
						fullWidth
						autoFocus
						margin='normal'
						value={newPaletteName}
						onChange={(e) => setNewPaletteName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleForm} color='primary'>
						Cancel
					</Button>
					<Button
						variant='contained'
						color='secondary'
						disabled={newPaletteName === ''}
						onClick={() => handleSubmit(newPaletteName)}
					>
						Save Palette
					</Button>
				</DialogActions>
			</FormControl>
		</Dialog>
	);
}
