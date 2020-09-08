import React from 'react';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

export default function Error() {
	return (
		<div
			style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
		>
			<Typography variant='h3'>
				Some Error Occured! <ErrorIcon fontSize='large' />
			</Typography>
		</div>
	);
}
