import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader({ size, thickness }) {
	return (
		<div
			style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
		>
			<CircularProgress size={size} thickness={thickness} style={{ color: '#20a8f6' }} />
		</div>
	);
}
