import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/MiniPaletteStyles';

const useStyles = makeStyles(styles);

function MiniPalette(props) {
	const classes = useStyles();

	const deletePalette = (e) => {
		e.stopPropagation();
		props.openDialog(props.id);
	};

	const goToPalette = () => {
		const { _id } = props;
		props.history.push(`/palette/${_id}`);
	};

	const { paletteName, colors } = props;
	const miniColorBoxes = colors.map((color) => (
		<div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
	));
	return (
		<div className={classes.root} onClick={goToPalette}>
			<DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>{paletteName}</h5>
		</div>
	);
}

export default withRouter(MiniPalette);
