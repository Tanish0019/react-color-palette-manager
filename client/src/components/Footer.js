import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	paletteFooter: {
		height: '5vh',
		backgroundColor: '#181618',
		display: 'flex',
		color: 'white',
		justifyContent: 'flex-end',
		alignItems: 'center',
		fontWeight: 'bold',
		paddingRight: '10px',
		textTransform: 'uppercase',
	},
});

export default function Footer(props) {
	const { paletteName } = props;
	const classes = useStyles();
	return <footer className={classes.paletteFooter}>{paletteName}</footer>;
}
