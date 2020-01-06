import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from '../styles/ColorBoxStyles';
import { CopyToClipboard } from "react-copy-to-clipboard";

function ColorBox(props) {
	const [copied, setCopied] = useState(false);
	// TODO: FIND BETTER WAY OF DOING THIS
	const [useEffectHandler, setUseEffectHandler] = useState(false);
	
	const changeCopyState = () => {
		setUseEffectHandler(!useEffectHandler);
		setCopied(true);
	}

	useEffect(() => {
		setTimeout(() => setCopied(false), 1500);
	}, [useEffectHandler]);

	const { name, color, paletteId, colorId, showFullPalette, classes } = props;
	
	return (
		<CopyToClipboard text={color} onCopy={changeCopyState}>
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

export default withStyles(styles)(ColorBox);
