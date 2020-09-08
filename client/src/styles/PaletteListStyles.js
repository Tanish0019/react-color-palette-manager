import sizes from './sizes';

export default {
	'@global': {
		'.fade-exit': {
			opacity: 1,
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 500ms ease-out',
		},
	},
	root: {
		height: '100%',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		overflowY: 'auto',
	},
	container: {
		width: '50%',
		height: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'flex-start',
		[sizes.down('lg')]: {
			width: '65%',
		},
		[sizes.down('md')]: {
			width: '60%',
		},
		[sizes.down('xs')]: {
			width: '50%',
		},
	},
	palettes: {
		width: '100%',
		paddingTop: '20px',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '2.5rem',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)',
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)',
			gridGap: '1.4rem',
		},
	},
	emptyPalette: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		'& a': {
			marginTop: '5px',
			textDecoration: 'none',
		},
	},
};
