import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const NotesPage = React.lazy(() => import("./pages/NotesPage"));
const LaunchDatePage = React.lazy(() => import("./pages/LaunchDatePage"));

const App = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);

	return (
		<Layout>
			<Suspense
				fallback={
					<div className="centered">
						<LoadingSpinner />
					</div>
				}
			>
				<Routes>
					<Route path="/" element={<MainPage />} />
					{!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
					<Route
						path="/notes"
						element={isLoggedIn ? <NotesPage /> : <AuthPage />}
					/>
					<Route
						path="/launchdate"
						element={isLoggedIn ? <LaunchDatePage /> : <AuthPage />}
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Suspense>
		</Layout>
	);
};

export default App;
