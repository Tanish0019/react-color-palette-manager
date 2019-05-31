import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from '../styles/ColorBoxStyles';
import { CopyToClipboard } from "react-copy-to-clipboard";

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
