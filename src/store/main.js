import { createSlice } from "@reduxjs/toolkit";

const LAUNCH_DATE = "12/31/2022";

const initialMainState = {
	launchDate: +new Date(LAUNCH_DATE),
};

const mainSlice = createSlice({
	name: "main",
	initialState: initialMainState,
	reducers: {
		setLaunchDate(state, action) {
			state.launchDate = action.payload;
		},
	},
});

export const mainActions = mainSlice.actions;

export default mainSlice.reducer;
