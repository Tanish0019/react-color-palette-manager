import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
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
};

function Footer(props) {
	const { paletteName, classes } = props;
	return <footer className={classes.paletteFooter}>{paletteName}</footer>;
}

export default withStyles(styles)(Footer);
