import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const initialAuthState = {
	authTokens: localStorage.getItem("authTokens")
		? JSON.parse(localStorage.getItem("authTokens"))
		: null,

	user: localStorage.getItem("authTokens")
		? jwt_decode(localStorage.getItem("authTokens"))
		: null,

	isLoggedIn: localStorage.getItem("authTokens") ? true : false,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ username, password }, { getState, dispatch }) => {
		try {
			const response = await axios.post(`${baseURL}/api/token/`, {
				username: username,
				password: password,
			});

			return await response.data;
		} catch (error) {
			throw new Error("Authentication failed!");
		}
	}
);

export const refreshTokens = createAsyncThunk(
	"auth/refreshTokens",
	async (arg, { getState, dispatch }) => {
		const state = getState();

		const user = jwt_decode(state.auth.authTokens.access);
		const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

		if (!isExpired) return state.auth.authTokens;

		try {
			const response = await axios.post(
				`${baseURL}/api/token/refresh/`,
				{
					refresh: state.auth.authTokens.refresh,
				}
			);

			return await response.data;
		} catch (error) {
			throw new Error("Token verification failed!");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		logoutUser(state) {
			localStorage.removeItem("authTokens");
			state.authTokens = null;
			state.user = null;
			state.isLoggedIn = false;
			state.isLoading = false;
			state.error = null;
		},
		setAuthTokens(state, action) {
			state.authTokens = action.payload ? action.payload : null;
		},
		setUser(state, action) {
			state.user = action.payload ? action.payload : null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				loginUser.fulfilled,
				(state, action) => {
					localStorage.setItem("authTokens", JSON.stringify(action.payload));
					state.authTokens = action.payload;
					state.user = jwt_decode(action.payload.access);
					state.isLoggedIn = true;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				loginUser.rejected,
				(state, action) => {
					localStorage.removeItem("authTokens");
					state.authTokens = null;
					state.user = null;
					state.isLoggedIn = false;
					state.isLoading = false;
					state.error = action.error.message;
				}
			)
			.addCase(
				refreshTokens.fulfilled,
				(state, action) => {
					localStorage.setItem("authTokens", JSON.stringify(action.payload));
					state.authTokens = action.payload;
					state.user = jwt_decode(action.payload.access);
					state.isLoggedIn = true;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(refreshTokens.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				refreshTokens.rejected,
				(state) => {
					localStorage.removeItem("authTokens");
					state.authTokens = null;
					state.user = null;
					state.isLoggedIn = false;
					state.isLoading = false;
					state.error = null;
				}
			);
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
