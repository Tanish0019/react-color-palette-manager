import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from '@material-ui/core/colors/blue';
import red from "@material-ui/core/colors/red";
import styles from '../styles/PaletteListStyles';
import useToggle from '../hooks/useToggle';
import Page from "./Page";
import MiniPalette from "./MiniPalette";
import { usePalette, usePaletteDispatch } from '../contexts/PaletteContext';

function PaletteList(props) {
	console.log("PALETTEEEEE LIST")
	const [open, setOpen] = useToggle();
	const [deletingID, setDeletingID] = useState('');
	const { palettes, loading, error } = usePalette();
	const { deletePalette } = usePaletteDispatch();
	
	console.log(palettes, loading, error);

	const openDeleteDialog = (id) => {
		setOpen(true);
		setDeletingID(id)
	}

	const closeDeleteDialog = () => {
		setOpen(false);
		setDeletingID("");
	};

	const handleDelete = () => {
		deletePalette(deletingID);
		closeDeleteDialog();
	};

	const loader = (
		<h1>Loading</h1>
	)

	const { classes } = props;
	return (
		<Page>
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">Create Palette</Link>
					</nav>
					{loading ? (
						loader
					) : (
						<TransitionGroup className={classes.palettes}>
							{palettes.map(palette => (
								<CSSTransition key={palette._id} classNames="fade" timeout={500}>
									<MiniPalette {...palette} id={palette._id} openDialog={openDeleteDialog} />
								</CSSTransition>
							))}
						</TransitionGroup>
					)}
				</div>
				<Dialog open={open} aria-labelledby="delete-dialog-title" onClose={closeDeleteDialog}>
					<DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
					<List>
						<ListItem button onClick={handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={closeDeleteDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		</Page>
	);
}

export default withStyles(styles)(PaletteList);


