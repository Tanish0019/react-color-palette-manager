import React, { Component } from 'react'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core';

class PaletteList extends Component {
	
	goToPalette = (id) => {
		this.props.history.push(`/palette/${id}`);
	}
	
	render() {
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>React Colors</nav>
					<div className={classes.palettes}>
						{palettes.map(palette => (
								<MiniPalette {...palette} key={palette.id} handleClick={() => this.goToPalette(palette.id)}/>
							))}		
					</div>
				</div>
			</div>
		)
	}
}

const styles = {
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
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between'
	},
	palettes: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: '5%'
	}
}

export default withStyles(styles)(PaletteList);
