import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TwitterTrends.css";

function TwitterTrends() {
	const [trends, setTrends] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get("https://jenny-backend.herokuapp.com/trends") // API CALL
			.then((response) => {
				console.log("Data Received!");
				setTrends(response.data);
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
	};

	return (
		<div className="TwitterTrends">
			{trends.length > 1 ? (
				trends?.map((trend, index) => {
					console.log(trend);
					return (
						<div className="trend">
							<p>
								{index + 1}.{" "}
								<a href={trend.url}>
									<b>{trend.tweet}</b>
								</a>
							</p>
							<p className="trend__numTweets">{trend.count}</p>
						</div>
					);
				})
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default TwitterTrends;
