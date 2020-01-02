import sizes from './sizes';
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
		},
		[sizes.down("lg")]: {
			width: "25%",
			height: "20%"
		},
		[sizes.down("md")]: {
			width: "50%",
			height: "20%"
		},
		[sizes.down("sm")]: {
			width: "100%",
			height: "5%"
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

export default styles;