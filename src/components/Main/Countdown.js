import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Countdown.module.css";

const calculateTimeLeft = (launchDate) => {
	let difference = launchDate - +new Date();

	let timeLeft = {};

	if (difference > 0) {
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	}

	return timeLeft;
};

const Countdown = () => {
	const { launchDate } = useSelector((state) => state.main);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(launchDate));

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft(launchDate));
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft]);

	const timeExpired = Object.keys(timeLeft).length === 0;

	return (
		<Fragment>
			{timeExpired && <p>Time's up!</p>}
			{!timeExpired && (
				<div className={classes.container}>
					<div className={classes.container__item}>
						<span className={classes.container__item__value}>
							{timeLeft.days}
						</span>
						<span className={classes.container__item__label}>Days</span>
					</div>

					<div className={classes.container__item}>
						<span className={classes.container__item__value}>
							{timeLeft.hours}
						</span>
						<span className={classes.container__item__label}>Hours</span>
					</div>

					<div className={classes.container__item}>
						<span className={classes.container__item__value}>
							{timeLeft.minutes}
						</span>
						<span className={classes.container__item__label}>Minutes</span>
					</div>

					<div className={classes.container__item}>
						<span className={classes.container__item__value}>
							{timeLeft.seconds}
						</span>
						<span className={classes.container__item__label}>Seconds</span>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Countdown;
