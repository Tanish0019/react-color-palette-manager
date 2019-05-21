import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ColorBox from './ColorBox';

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
				{/* Navbar goes here */}
				<Slider 
					defaultValue={level} 
					min={100} max={1000} 
					onAfterChange={this.changeLevel}
					step="100"
					/>
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