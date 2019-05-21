import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class Palette extends Component {
	
	state = {
		level: 500
	}

	changeLevel = (level) => {
		this.setState({ level });
	}

	render() {
		const { level } = this.state;
		const { colors } = this.props.palette;
		return (
			<div className="Palette">
				<Navbar level={level} changeLevel={this.changeLevel} />
				<div className="Palette-colors">
					{
						colors[level].map(color => (
							<ColorBox color={color} />
						))
					}
				</div>

			</div>
		)
	}
}

export default Palette;