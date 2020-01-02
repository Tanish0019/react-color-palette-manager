import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import blue from '@material-ui/core/colors/blue';
import red from "@material-ui/core/colors/red";
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
	
	state = {
		openDeleteDialog: false,
		deletingID: ''
	}

	openDialog = (id) => {
		this.setState({
			openDeleteDialog: true,
			deletingID: id
		})
	}

	closeDialog = () => {
		this.setState({ openDeleteDialog: false, deletingID: '' });
	}

	handleDelete = () => {
		this.props.deletePalette(this.state.deletingID);
		this.closeDialog();
	}

	goToPalette = (id) => {
		this.props.history.push(`/palette/${id}`);
	}
	
	render() {
		const { openDeleteDialog, deletingID } = this.state;
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">Create Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map(palette => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									{...palette}
									id={palette.id}
									handleClick={() => this.goToPalette(palette.id)}
									openDialog={this.openDialog}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
					<DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
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
		);
	}
}

export default withStyles(styles)(PaletteList);
