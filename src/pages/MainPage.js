import React, { useEffect } from "react";
import Main from "../components/Main/Main";

import { useSelector, useDispatch } from "react-redux";
import { refreshTokens } from "../store/auth";

const MainPage = () => {

	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(refreshTokens());
		}
	}, []);

  return <Main />;
};

export default MainPage;
