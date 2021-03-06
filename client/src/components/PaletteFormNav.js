import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import PaletteMetaForm from './PaletteMetaForm';
import useToggle from '../hooks/useToggle';
import styles from '../styles/PaletteFormNavStyles';

const useStyles = makeStyles(styles);

export default function PaletteFormNav(props) {
	const [formShowing, toggleForm] = useToggle();
	const classes = useStyles();
	const { open, handleSubmit } = props;
	return (
		<div className={classes.root}>
			<AppBar
				position='fixed'
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color='inherit'
						aria-label='Open drawer'
						onClick={props.toggleDrawer}
						className={classNames(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' color='inherit' noWrap>
						Create New Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Button
						className={classes.button}
						variant='contained'
						color='primary'
						onClick={toggleForm}
					>
						Save
					</Button>
					<Link to='/'>
						<Button className={classes.button} variant='contained' color='default'>
							Back
						</Button>
					</Link>
				</div>
			</AppBar>
			<PaletteMetaForm
				formShowing={formShowing}
				handleSubmit={handleSubmit}
				toggleForm={toggleForm}
			/>
		</div>
	);
}
