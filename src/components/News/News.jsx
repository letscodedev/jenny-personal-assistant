import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css";

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
				<p>Loading</p>
			)}
		</div>
	);
}

export default News;
