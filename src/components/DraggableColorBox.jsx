import React from "react";
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
		"&:hover button": {
			opacity: 1
		}
	}
};

function DraggableColorBox(props) {
	const { classes, color } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			{color}
		</div>
	);
}

export default withStyles(styles)(DraggableColorBox);
