import sizes from './sizes';
export default (theme) => ({
	button: {
		margin: theme.spacing(1),
		marginRight: '20px',
		height: '80%',
	},
	navbar: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '7vh',
		backgroundColor: '#fff',
	},
	logo: {
		marginRight: '20px',
		padding: '0 20px',
		fontSize: '22px',
		backgroundColor: 'rgba(34, 34,	34, 0.90)',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		'& a': {
			textDecoration: 'none',
			color: 'white',
		},
		[sizes.down('xs')]: {
			display: 'none',
		},
	},

	rightContainer: {
		marginLeft: 'auto',
		marginRight: '10px',
	},

	slider: {
		width: '340px',
		display: 'flex',
		alignItems: 'flex-end',
		margin: '0 20px',
		[sizes.down('sm')]: {
			width: '200px',
		},
	},
});
