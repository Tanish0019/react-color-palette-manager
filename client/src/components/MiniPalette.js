import React from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from "@material-ui/icons/Delete"; 

function MiniPalette(props) {

	const deletePalette = e => {
		e.stopPropagation();
		props.openDialog(props.id);
	};

	const goToPalette = () => {
		const { _id } = props;
		props.history.push(`/palette/${_id}`);
	}

	const { classes, paletteName, colors } = props;
	const miniColorBoxes = colors.map(color => (
		<div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
	));
	return (
		<div className={classes.root} onClick={goToPalette}>
			<DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName}
			</h5>
		</div>
	);
}


export default withStyles(styles)(withRouter(MiniPalette));
