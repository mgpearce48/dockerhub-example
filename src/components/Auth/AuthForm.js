import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/auth";

import classes from "./AuthForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthForm = () => {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector((state) => state.auth);
	const usernameInputRef = useRef();
	const passwordInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();
		const enteredUsername = usernameInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		dispatch(
			loginUser({
				username: enteredUsername,
				password: enteredPassword,
			})
		);
	};

	return (
		<section className={classes.auth}>
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="username">Your Username</label>
					<input ref={usernameInputRef} type="text" id="username" required />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						ref={passwordInputRef}
						type="password"
						id="password"
						required
					/>
				</div>
				<div className={classes.actions}>
					{error && <p className={classes.error_msg}>{error}</p>}
					{!isLoading && <button>Login</button>}
					{isLoading && <LoadingSpinner />}
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
