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
		axios
			.get("https://jenny-backend.herokuapp.com/score")
			.then((response) => {
				console.log(response.data);
				var match_status = response.data.match_status;
				var match_url = response.data.match_url.replace("www", "m");
				setInterval(() => {
					axios
						.get(
							`http://localhost:8000/cricket?match_url=${match_url}&match_status=${match_status}`
						)
						.then((response) => {
							console.log(response.data);
							setScore(response.data);
						});
				}, 10000);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="LiveScore">
			{score ? (
				<>
					<div className="teams">
						<div className="team__score">
							<div className="teamOne">
								<span style={{ fontWeight: "bold" }}>
									{score.teamOne.split("-")[0]}
									{/* Team Name */}
								</span>
								<br></br>
								{score.teamOne.split("-")[1]}
								{/* Score */}
							</div>
							<div className="match_status">
								<span>{score.match_status}</span>
							</div>
							<div className="teamTwo">
								<span style={{ fontWeight: "bold" }}>
									{score.teamTwo.split("-")[0]}
									{/* Team Name */}
								</span>
								<br></br>
								{score.teamTwo.split("-")[1]}
								{/* Score */}
							</div>
						</div>
						<div className="team__updates">
							{score && score.update}
							{/* Update */}
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
