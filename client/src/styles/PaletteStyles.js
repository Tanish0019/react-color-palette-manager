import sizes from './sizes';

export default {
	root: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
	paletteColors: {
		backgroundColor: '#fff',
		height: '90%',
		width: '100%',
	},
	goBack: {
		width: '20%',
		height: '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		opacity: 1,
		backgroundColor: 'black',
		'& a': {
			color: 'white',
			width: '100px',
			height: '30px',
			position: 'absolute',
			display: 'inline-block',
			top: '50%',
			left: '50%',
			marginLeft: '-50%',
			marginTop: '-15px',
			textAlign: 'center',
			outline: 'none',
			background: 'rgba(255, 255, 255, 0.3)',
			fontSize: '1rem',
			lineHeight: '30px',
			textTransform: 'uppercase',
			border: 'none',
			textDecoration: 'none',
		},
	},

	[sizes.down('md')]: {
		width: '25%',
		height: '33.3333%',
	},

	[sizes.down('md')]: {
		width: '100%',
		height: '20%',
	},
	[sizes.down('xs')]: {
		width: '100%',
		height: '10%',
	},
};
