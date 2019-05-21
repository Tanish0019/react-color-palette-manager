import React, { Component } from 'react'

class ColorBox extends Component {
	render() {
		return (
			<div style={{backgroundColor: this.props.color.color}} className="ColorBox">
				<span>{this.props.color.name}</span>
			</div>
		) 
	}
}

export default ColorBox;