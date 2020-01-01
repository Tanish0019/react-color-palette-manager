import React from "react";
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from "@material-ui/icons/Delete"; 
import { withStyles } from "@material-ui/styles";

const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		position: "relative",
		display: "inline-block",
		textTransform: "uppercase",
		marginBottom: "-4px",
		cursor: "pointer",
		"&:hover svg": {
			color: "white",
			transform: "scale(1.2)"
		}
	},
	boxContent: {
		position: "absolute",
		padding: "10px",
		width: "100%",
		bottom: "0",
		left: "0",
		color: "rgba(0, 0, 0, 0.5)",
		letterSpacing: "1px",
		textTransform: "uppercase",
		fontSize: "10px",
		display: "flex",
		justifyContent: "space-between"
	},
	deleteIcon: {
		transition: "all 0.3s ease-in-out"
	}
};

const DraggableColorBox = SortableElement(props => {
	const { classes, color, name } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={props.handleClick}/> 
			</div>
		</div>
	);
})

export default withStyles(styles)(DraggableColorBox);
