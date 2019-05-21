import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class Palette extends Component {
	
	state = {
		level: 500,
		format: 'hex'
	}

	changeLevel = (level) => {
		this.setState({ level });
	}

	handleFormatChange = (format) => {
		this.setState({ format });
	}

	render() {
		const { level, format } = this.state;
		const { colors } = this.props.palette;
		return (
			<div className="Palette">
				<Navbar 
					level={level} 
					changeLevel={this.changeLevel} 
					handleFormatChange={this.handleFormatChange}
				/>
				<div className="Palette-colors">
					{
						colors[level].map(color => (
							<ColorBox color={color[format]} name={color.name}/>
						))
					}
				</div>

			</div>
		)
	}
}

export default Palette;