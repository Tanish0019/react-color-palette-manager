import React, { Component } from 'react'
import ColorBox from './ColorBox';

class Palette extends Component {
	render() {
		const colors = this.props.colors;
		return (
			<div className="Palette">
				{/* Navbar goes here */}

				<div className="Palette-colors">
					{
						colors.map(color => (
							<ColorBox color={color} />
						))
					}
				</div>

			</div>
		)
	}
}

export default Palette;