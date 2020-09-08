import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles, Typography, Button } from '@material-ui/core';
import styles from '../styles/PaletteListStyles';
import useToggle from '../hooks/useToggle';
import Page from './Page';
import MiniPalette from './MiniPalette';
import Loader from './Loader';
import MainNavbar from './MainNavbar';
import { Link } from 'react-router-dom';

function PaletteList(props) {
	const [open, setOpen] = useToggle();
	const [deletingID, setDeletingID] = useState('');
	const [loading, setLoading] = useState(true);
	const [palettes, setPalettes] = useState([]);
	const { classes } = props;
	const openDeleteDialog = (id) => {
		setOpen(true);
		setDeletingID(id);
	};

	const closeDeleteDialog = () => {
		setOpen(false);
		setDeletingID('');
	};

	const handleDelete = async () => {
		try {
			const res = await Axios.delete(`/api/palette/${deletingID}`, { withCredentials: true });
			if (res.data.success) {
				setPalettes((prevPalettes) => prevPalettes.filter((palette) => palette._id !== deletingID));
			} else {
				throw Error(res.data.message);
			}
		} catch (err) {
			console.log(err);
			toast.error('Some Error Occurred!');
		} finally {
			closeDeleteDialog();
		}
	};

	useEffect(() => {
		const fetchPalettes = async () => {
			setLoading(true);
			try {
				const res = await Axios.get('/api/palette', { withCredentials: true });
				if (res.data.success) {
					setPalettes(res.data.palettes);
				} else {
					throw new Error(res.data.message);
				}
			} catch (err) {
				// TODO: Handle Error
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchPalettes();
	}, []);

	const renderMiniPalettes = () => {
		if (palettes.length === 0) {
			return (
				<div className={classes.emptyPalette}>
					<Typography variant='h3'>You don't have any color palettes yet!</Typography>
					<Link to={'/palette/new'}>
						<Button variant='outlined' size='large'>
							Get Started!
						</Button>
					</Link>
				</div>
			);
		} else {
			return (
				<TransitionGroup className={classes.palettes}>
					{palettes.map((palette) => (
						<CSSTransition key={palette._id} classNames='fade' timeout={500}>
							<MiniPalette {...palette} id={palette._id} openDialog={openDeleteDialog} />
						</CSSTransition>
					))}
				</TransitionGroup>
			);
		}
	};

	return (
		<Page>
			<MainNavbar />
			<div className={classes.root}>
				<div className={classes.container}>
					{loading ? <Loader size={100} thickness={3.6} /> : renderMiniPalettes()}
				</div>
				<Dialog open={open} aria-labelledby='delete-dialog-title' onClose={closeDeleteDialog}>
					<DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
					<List>
						<ListItem button onClick={handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Delete' />
						</ListItem>
						<ListItem button onClick={closeDeleteDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Cancel' />
						</ListItem>
					</List>
				</Dialog>
			</div>
		</Page>
	);
}

export default withStyles(styles)(PaletteList);
