import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TwitterTrends.css";
import { Spinner } from "react-bootstrap";

function TwitterTrends() {
	const [trends, setTrends] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get("https://jenny-backend.herokuapp.com/trends") // API CALL
			.then((response) => {
				console.log("Trends Received!");
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
					return (
						<div className="trend" key={index}>
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
				<div style={{ textAlign: "center", height: "50px" }}>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			)}
		</div>
	);
}

export default TwitterTrends;
