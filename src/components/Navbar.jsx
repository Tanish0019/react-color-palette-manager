import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Navbar extends Component {
	render() {
		const { level, changeLevel } = this.props;
		
		return (
			<nav className="Navbar">
				<div className="logo">
					<a href="#">Logo</a>
				</div>
				<div className="slider-container">
					<span>Level: { level }</span>
					<div className="slider">
						<Slider
							defaultValue={level}
							min={100} max={1000}
							onChange={changeLevel}
							step={100}
						/>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar;