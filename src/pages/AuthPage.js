import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshTokens } from "../store/auth";

import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(refreshTokens());
		}
	}, []);

	return <AuthForm />;
};

export default AuthPage;
