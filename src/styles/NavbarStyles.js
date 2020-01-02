import sizes from './sizes';
export default (theme) => ({
	button: {
		margin: theme.spacing.unit,
		marginRight: '20px',
		height: '80%'
	},
	Navbar: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '7vh',
	},
	logo: {
		marginRight: '20px',
		padding: '0 20px',
		fontSize: '22px',
		backgroundColor: 'rgba(34, 34,	34, 0.90)',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		"& a": {
			textDecoration: 'none',
			color: 'white',
		},
		[sizes.down("xs")]: {
			display: "none"	
		}
	},

	rightContainer: {
		marginLeft: 'auto',
		marginRight: '10px',
	},

	slider: {
		width: '340px',
		margin: '0 30px',
		display: 'inline-block',
		
		"& .rc-slider-track": {
			'backgroundColor': 'transparent'
		},

		'& .rc-slider-rail': {
			height: '10px',
		},

		"& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus": {
			backgroundColor: 'green',
			outline: 'none',
			border: '2px solid green',
			boxShadow: 'none',
			width: '16px',
			height:'16px',
			marginTop: '-3px',
		},
		[sizes.down("md")]: {
			width: '150px'
		}
	}
});