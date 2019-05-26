import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};
	}

	changeCopyState = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	};

	render() {
		const { name, color, paletteId, colorId, showLink } = this.props;
		const { copied } = this.state;
		const isDarkColor = chroma(color).luminance() <= 0.085;
		const isLightColor = chroma(color).luminance() >= 0.7;
		return (
			<CopyToClipboard text={color} onCopy={this.changeCopyState}>
				<div style={{ backgroundColor: color }} className="ColorBox">
					<div style={{ backgroundColor: color }} className={`copy-overlay ${copied && "show"}`} />

					<div className={`copy-msg ${copied && "show"} ${isLightColor ? 'overlay-dark-text' : 'overlay-light-text'}`}>
						<h1>Copied!</h1>
						<p>{color}</p>
					</div>

					<div className={`copy-content`}>
						<div className={`box-content ${isDarkColor ? "light-text" : "dark-text"}`}>
							<span>
								{name}
							</span>
						</div>
						<button className={`copy-button ${isDarkColor ? "light-text" : "dark-text"}`}>
							Copy
						</button>
						{showLink && (
							<Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
								<span className={`see-more ${isDarkColor ? "light-text" : "dark-text"}`}>More</span>
							</Link>
						)}
					</div>
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
