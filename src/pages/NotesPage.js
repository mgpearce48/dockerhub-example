import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotes } from "../store/notes";

import Notes from '../components/Notes/Notes'

const NotesPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotes());
	}, []);

	return <Notes />;
};

export default NotesPage;
