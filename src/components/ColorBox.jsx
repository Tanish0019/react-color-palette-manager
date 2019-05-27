import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";

const styles = theme => ({
	ColorBox: {
		width: '20%',
		height: props => props.showFullPalette ? '25%' : '50%',
		margin: '0 auto',
		position: 'relative',
		display: 'inline-block',
		textTransform: 'uppercase',
		marginBottom: '-4px',
		cursor: 'pointer',
		"&:hover button": {
			opacity: 1
		}
	},
	copyText: {
		color: props => chroma(props.color).luminance() >= 0.7 ? 'black' : 'white',
		'&h1': {
			textShadow: props => chroma(props.color).luminance() >= 0.7 && '1px 2px black'
		}
	},
	colorName: {
		color: props => chroma(props.color).luminance() <= 0.085 ? 'rgba(240, 240, 240, 0.9)' : 'black'
	},
	seeMore: {
		color: props => chroma(props.color).luminance() <= 0.085 ? 'rgba(240, 240, 240, 0.8)' : 'rgba(0, 0, 0, 0.8)',
		position: 'absolute',
		bottom: '0',
		right: '0',
		fontSize: '0.85rem',
		background: 'rgba(255, 255, 255, 0.3)',
		width: '55px',
		height: '30px',
		textAlign: 'center',
		letterSpacing: '0.8px',
		lineHeight: '30px',
	},
	copyButton: {
		color: props => chroma(props.color).luminance() <= 0.085 ? 'white' : '#222',
		display: 'inline-block',
		width: '100px',
		height: '30px',
		position: 'absolute',
		top: '50%',
		cursor: 'pointer',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		textAlign: 'center',
		outline: 'none',
		background: 'rgba(255, 255, 255, 0.3)',
		fontSize: '1rem',
		lineHeight: '30px',
		border: 'none',
		opacity: '0',
		transition: 'opacity 0.5s ease',
	}

});

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
		const { name, color, paletteId, colorId, showFullPalette, classes } = this.props;
		const { copied } = this.state;
		// const isDarkColor = chroma(color).luminance() <= 0.085;
		// const isLightColor = chroma(color).luminance() >= 0.7;
		return (
			<CopyToClipboard text={color} onCopy={this.changeCopyState}>
				<div style={{ backgroundColor: color }} className={classes.ColorBox}>
					<div style={{ backgroundColor: color }} className={`copy-overlay ${copied && "show"}`} />

					<div className={`copy-msg ${copied && "show"} ${classes.copyText}`}>
						<h1>Copied!</h1>
						<p>{color}</p>
					</div>

					<div className={`copy-content`}>
						<div className={`box-content`}>
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
						{showFullPalette && (
							<Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
								<span className={classes.seeMore}>More</span>
							</Link>
						)}
					</div>
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
