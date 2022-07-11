import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authActions } from "./auth";

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000";

export const getNotes = createAsyncThunk(
	"notes/getNotes",
	async (arg, { getState, dispatch }) => {
		const state = getState();

		const axiosInstance = axios.create({
			baseURL,
			headers: { Authorization: `Bearer ${state.auth.authTokens.access}` },
		});

		axiosInstance.interceptors.request.use(async (request) => {
			const user_access = jwt_decode(state.auth.authTokens.access);
			const accessIsExpired = dayjs.unix(user_access.exp).diff(dayjs()) < 1;

			if (!accessIsExpired) return request;

			try {
				const response = await axios.post(`${baseURL}/api/token/refresh/`, {
					refresh: state.auth.authTokens.refresh,
				});

				localStorage.setItem("authTokens", JSON.stringify(response.data));
				dispatch(authActions.setAuthTokens(response.data));
				dispatch(authActions.setUser(jwt_decode(response.data.access)));

				request.headers.Authorization = `Bearer ${response.data.access}`;

				return request;
			} catch (error) {
				throw new Error(error.message);
			}
		});

		try {
			const response = await axiosInstance.get(`${baseURL}/api/note/`);
			return await response.data;
		} catch (error) {
			dispatch(authActions.logoutUser());
			throw new Error("Unable to retrieve notes!");
		}
	}
);

const initialNotesState = {
	notes: [],
	isLoading: false,
};

const notesSlice = createSlice({
	name: "notes",
	initialState: initialNotesState,
	reducers: {
		setNotes(state, action) {
			state.notes = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.fulfilled, (state, action) => {
				state.notes = action.payload;
				state.isLoading = false;
			})
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNotes.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const notesActions = notesSlice.actions;

export default notesSlice.reducer;
