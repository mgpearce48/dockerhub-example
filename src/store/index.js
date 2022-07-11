import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import notesReducer from "./notes";
import mainReducer from "./main";

const store = configureStore({
	reducer: { auth: authReducer, notes: notesReducer, main: mainReducer },
});

export default store;
