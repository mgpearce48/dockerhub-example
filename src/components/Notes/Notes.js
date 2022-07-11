import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Notes.module.css";

const Notes = () => {
	const { notes, isLoading } = useSelector((state) => state.notes);

	return (
		<div>
			{isLoading && <p>Waiting for notes to load...</p>}
			{!isLoading && <p>You are logged to the notes page!</p>}
			{!isLoading && (
				<ul>
					{notes.map((note) => (
						<li key={note.id}>{note.body}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Notes;
