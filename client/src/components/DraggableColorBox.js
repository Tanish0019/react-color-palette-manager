import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/DraggableColorBoxStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(styles);

const DraggableColorBox = SortableElement((props) => {
	const classes = useStyles(props);
	const { color, name } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={props.handleClick} />
			</div>
		</div>
	);
});

export default DraggableColorBox;
