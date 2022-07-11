import React, { useEffect } from "react";
import LaunchDateForm from "../components/LaunchDate/LaunchDateForm";

import { useSelector, useDispatch } from "react-redux";
import { refreshTokens } from "../store/auth";

const LaunchDatePage = () => {
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(refreshTokens());
		}
	}, []);

	return <LaunchDateForm />;
};

export default LaunchDatePage;
