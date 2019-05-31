export default {
	root: {
		backgroundColor: 'blue',
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	container: {
		width: '50%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	nav: {
		padding: '40px 0',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'white',
		"& a": {
			color: 'white'
		}
	},
	palettes: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: '5%'
	}
}
