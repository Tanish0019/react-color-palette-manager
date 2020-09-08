import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/ColorBoxStyles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles(styles);

export default function ColorBox(props) {
	const [copied, setCopied] = useState(false);
	const [useEffectHandler, setUseEffectHandler] = useState(false);

	const classes = useStyles(props);

	const changeCopyState = () => {
		setUseEffectHandler(!useEffectHandler);
		setCopied(true);
	};

	useEffect(() => {
		setTimeout(() => setCopied(false), 1000);
	}, [useEffectHandler]);

	const { name, color, colorId, showFullPalette, selectColor } = props;

	return (
		<CopyToClipboard text={color} onCopy={changeCopyState}>
			<div style={{ backgroundColor: color }} className={classes.ColorBox}>
				<div
					style={{ backgroundColor: color }}
					className={`${classes.copyOverlay} ${copied && 'show'}`}
				/>
				<div className={`${classes.copyMessage} ${copied && 'show'} ${classes.copyText}`}>
					<h1>Copied!</h1>
					<p>{color}</p>
				</div>
				<div>
					<div className={classes.boxContent}>
						<span className={classes.colorName}>{name}</span>
					</div>
					<button className={classes.copyButton}>Copy</button>
					{showFullPalette && (
						<button onClick={() => selectColor(colorId)} className={classes.seeMore}>
							More
						</button>
					)}
				</div>
			</div>
		</CopyToClipboard>
	);
}
