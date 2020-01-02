export default {
	root: {
		position: "relative",
		backgroundColor: "white",
		border: "1px solid black",
		borderRadius: "5px",
		padding: "0.5rem",
		overflow: "hidden",
		cursor: "pointer",
		"&:hover svg": {
			opacity: 1
		}
	},
	colors: {
		backgroundColor: "#dae1ef",
		height: "150px",
		width: "100%",
		borderRadius: "5px",
		overflow: "hidden"
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "0",
		color: "black",
		paddingTop: "0.5rem",
		fontSize: "1rem",
		position: "relative"
	},
	emoji: {
		marginLeft: "0.5rem",
		fontSize: "1.5rem"
	},
	miniColor: {
		height: "25%",
		width: "20%",
		display: "inline-block",
		margin: "0 auto",
		position: "relative",
		marginBottom: "-3.5px"
	},
	delete: {
		
	},
	deleteIcon: {
		color: "white",
		backgroundColor: "#eb3d30",
		width: "30px",
		height: "30px",
		position: "absolute",
		right: 0,
		top: 0,
		zIndex: 100,
		padding: "5px",
		opacity: 0,
		transition: "all 0.3s ease-in-out"
	}
};