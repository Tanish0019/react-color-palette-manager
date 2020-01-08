import React from 'react';
import '../styles/page.css';

// TODO: BETTER WAY TO DO THIS
export default function Page(props) {
	const homePage = window.location.pathname === "/";
	const classes = homePage ? "page reverse" : "page";
	return (
		<section className={classes}>
			{props.children}
		</section>
	)
};