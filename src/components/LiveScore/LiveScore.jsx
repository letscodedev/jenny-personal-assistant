import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveScore.css";

function LiveScore() {
	const [score, setScore] = useState();
	useEffect(() => {
		getScore();
	}, []);

	const getScore = () => {
		axios
			.get("https://jenny-backend.herokuapp.com/score")
			.then((response) => {
				var match_status = response.data.match_status;
				var match_url = response.data.match_url.replace("www", "m");
				setInterval(() => {
					axios
						.get(
							`https://cricket-python-api.herokuapp.com/cricket?match_url=${match_url}&match_status=${match_status}`
						)
						.then((response) => {
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
						{score.teamOne === "No Data Found" ? (
							<>
								<div
									style={{
										textAlign: "center",
										marginBottom: "10px",
									}}
								>
									{score.title.split(",")[0]}
								</div>
								<div
									className="match_status"
									style={{
										marginBottom: "10px",
									}}
								>
									<span>{score.match_status}</span>
								</div>
								{score.update === "No Data Found" ? null : (
									<div>{score.update}</div>
								)}
							</>
						) : (
							<>
								<div className="team__score">
									<div className="teamOne">
										<span style={{ fontWeight: "bold" }}>
											{score.teamOne.split("-")[0]}
										</span>
										<br></br>
										{score.teamOne.split("-")[1]}
									</div>
									<div className="match_status">
										<span>{score.match_status}</span>
									</div>
									<div className="teamTwo">
										<span style={{ fontWeight: "bold" }}>
											{score.teamTwo.split("-")[0]}
										</span>
										<br></br>
										{score.teamTwo.split("-")[1]}
									</div>
								</div>
								<div className="team__updates">
									{score && score.update}
								</div>
							</>
						)}
					</div>
				</>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default LiveScore;
