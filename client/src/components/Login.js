import React from 'react';
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


// TODO: LOGIN SCREEN
export default function login() {
	return (
		<a href="/api/auth/google">
			Sign In With Google
		</a>
	);
}