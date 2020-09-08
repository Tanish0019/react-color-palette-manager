import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@material-ui/core';

export default function NotFound() {
	return (
		<div
			style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
		>
			<Typography variant='h3'>
				<WarningIcon fontSize='large' /> 404 Not Found!
			</Typography>
		</div>
	);
}
