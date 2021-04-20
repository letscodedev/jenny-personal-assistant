import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css";
import { Spinner } from "react-bootstrap";

function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		axios
			.get("https://jenny-backend.herokuapp.com/news") // API CALL
			.then((response) => {
				console.log("News Received");
				setNews(response.data);
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
	};

	return (
		<div className="News">
			{news.length > 1 ? (
				news.map((n, index) => {
					return (
						<div className="news__marginbtm" key={index}>
							<a
								href={n.NewsUrl}
								target="_blank"
								rel="noreferrer"
							>
								<p>{n.NewsTitle}</p>
							</a>
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

export default News;
