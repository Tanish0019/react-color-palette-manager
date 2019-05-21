import React, { Component } from 'react'

class ColorBox extends Component {
	render() {
	
		const { color, name } = this.props.color;
	
		return (
			<div style={{backgroundColor: color}} className="ColorBox">
				<div className="copy-content">
					<div className="box-content">
						<span>{name}</span>
					</div>
					<button className="copy-button">Copy</button>
					<span className="see-more">More</span>
				</div>
			</div>
		) 
	}
}

export default ColorBox;