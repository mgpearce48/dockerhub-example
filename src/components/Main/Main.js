import React, { Fragment } from "react";
import Countdown from "./Countdown";

import classes from "./Main.module.css";

const Main = () => {
	return (
		<Fragment>
			<div className={classes.banner}>Coming Soon</div>
			<p>My website is under construction</p>
			<Countdown />
		</Fragment>
	);
};

export default Main;
