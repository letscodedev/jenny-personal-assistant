import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveScore.css";

function LiveScore() {
	const [score, setScore] = useState();
	useEffect(() => {
		console.log("Just Once");
		getScore();
	}, []);

	const getScore = () => {
		// setInterval(() => {
		console.log("Refresh");
		axios
			.get(
				"https://cricket-api.vercel.app/cri.php?url=https://www.cricbuzz.com/live-cricket-scores/35618/3rd-match-indian-premier-league-2021"
			)
			.then((response) => {
				console.log(response.data);
				setScore(response.data);
			});
		// }, 10000);
	};

	return (
		<div className="LiveScore">
			{score ? (
				<>
					<div className="teams">
						<div className="teams__score">
							<div className="team__name">
								{score.livescore.teamone}
							</div>
							<div className="team__name">
								{score && score.livescore.teamtwo}
							</div>
						</div>
						<div className="team__updates">
							{score && score.livescore.update}
						</div>
					</div>
				</>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default LiveScore;
