import React from 'react'
import { withStyles } from "@material-ui/styles";

const styles = {
	paletteFooter: {
		height: '5vh',
		backgroundColor: 'rgba(34, 34,	34, 0.90)',
		display: 'flex',
		color: 'white',
		justifyContent: 'flex-end',
		alignItems: 'center',
		fontWeight: 'bold',
		paddingRight: '10px',
		textTransform: 'uppercase'
	}
}

function Footer(props) {
	const { paletteName, emoji, classes } = props;
	return (
		<footer className={classes.paletteFooter}>
			{paletteName}
			<span className="emoji">{emoji}</span>
		</footer>
	)
}

export default withStyles(styles)(Footer);