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
	},

	boxContent: {
		position: 'absolute',
		padding: '10px',
		width: '100%',
		bottom: '0',
		left: '0',
		letterSpacing: '1px',
		fontSize: '10px',
	},

	copyOverlay: {
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		opacity: '0',
		width: '100%',
		height: '100%',
		zIndex: '10',
		transform: 'scale(0.1)',
		transition: 'all 0.5s ease-in-out',

		'&.show': {
			opacity: '1',
			transform: 'scale(10)',
		}
	},

	copyMessage: {
		position: 'fixed',
		width: '100%',
		left: '0',
		top: '0',
		right: '0',
		bottom: '0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '3.5rem',
		opacity: '0',
		transform: 'scale(0.01)',

		'& h1': {
			fontWeight: '400',
			background: 'rgba(255, 255, 255, 0.2)',
			width: '100%',
			textShadow: props => chroma(props.color).luminance() <= 0.7 && '1px 2px black',
			textAlign: 'center',
			marginBottom: '0',
			padding: '1rem',
		},

		'& p': {
			fontSize: '2rem',
		},

		'&.show': {
			transform: 'scale(1)',
			opacity: '1',
			zIndex: '20',
			transition: 'all 0.4s ease-in-out',
			transitionDelay: '0.2s',
		}
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
		
		return (
			<CopyToClipboard text={color} onCopy={this.changeCopyState}>
				<div style={{ backgroundColor: color }} className={classes.ColorBox}>
					<div style={{ backgroundColor: color }} className={`${classes.copyOverlay} ${copied && "show"}`} />

					<div className={`${classes.copyMessage} ${copied && "show"} ${classes.copyText}`}>
						<h1>Copied!</h1>
						<p>{color}</p>
					</div>

					<div>
						<div className={classes.boxContent}>
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
