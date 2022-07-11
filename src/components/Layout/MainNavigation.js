import React from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const logoutHandler = () => {
		dispatch(authActions.logoutUser());
	};

	return (
		<header className={classes.header}>
			<NavLink to="/">
				<div className={classes.logo}>michaelpearce.me</div>
			</NavLink>
			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<NavLink
								to="/auth"
								className={({ isActive }) => (isActive ? classes.active : "")}
							>
								Login
							</NavLink>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<NavLink
								to="/launchdate"
								className={({ isActive }) => (isActive ? classes.active : "")}
							>
								Launch Date
							</NavLink>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<NavLink
								to="/notes"
								className={({ isActive }) => (isActive ? classes.active : "")}
							>
								Notes
							</NavLink>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
