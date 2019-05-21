import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';


class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		}
	}

	changeCopyState = () => {
		this.setState({copied: true}, () => {
			setTimeout(() => this.setState({copied: false}), 1500)
		});
	}
	
	render() {
		const { name, color } = this.props;
		const { copied } = this.state;
		return (
			<CopyToClipboard text={color} onCopy={this.changeCopyState}>
				<div style={{backgroundColor: color}} className="ColorBox">
					<div style={{ backgroundColor: color }} className={`copy-overlay ${copied && 'show'}`} />
					
					<div className={`copy-msg ${copied && 'show'}`}>
						<h1>Copied!</h1>
						<p>{color}</p>
					</div>

					<div className="copy-content">
						<div className="box-content">
							<span>{name}</span>
						</div>
						<button className="copy-button">Copy</button>
						<span className="see-more">More</span>
					</div>
				</div>
			</CopyToClipboard>
		) 
	}
}

export default ColorBox;