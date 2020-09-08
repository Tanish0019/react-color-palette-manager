import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { common } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		'& .MuiPaper-root.MuiAppBar-root': {
			backgroundColor: '#20a8f6',
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		'& img': {
			height: '60px',
			width: '120px',
		},
	},
}));

export default function MainNavbar() {
	const classes = useStyles();
	const { userData, logout } = useUser();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Palette Star
					</Typography>
					{userData && (
						<div>
							<Link to={'/palette/new'}>
								<IconButton className={classes.menuButton} aria-label='menu'>
									<AddIcon fontSize='large' style={{ color: common.white }} />
								</IconButton>
							</Link>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<Avatar alt='user display image' src={userData.picture} />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={logout}>Logout</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
