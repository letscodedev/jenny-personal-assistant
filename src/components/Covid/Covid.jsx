import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Covid.css";
import { Spinner } from "react-bootstrap";

function Covid() {
	const [covid, setCovidData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		axios
			.get("https://coronavirus-19-api.herokuapp.com/countries/India") // API CALL
			.then((response) => {
				console.log(response);
				console.log("Covid Data Recieved");
				setCovidData(response.data);
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
	};

	const format = (num) => {
		if (num > 999 && num < 1000000) {
			return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
		} else if (num > 1000000) {
			return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
		} else if (num < 900) {
			return num;
		}
	};

	return (
		<div className="covid">
			{covid ? (
				<>
					<div className="active">
						<div className="covid__status">Total Cases</div>
						<div className="covid__number">
							{format(covid.cases)}
						</div>
					</div>
					<div className="recovered">
						<div className="covid__status">Recovered</div>
						<div className="covid__number">
							{format(covid.recovered)}
						</div>
					</div>
					<div className="death">
						<div className="covid__status">Deaths</div>
						<div className="covid__number">
							{format(covid.deaths)}
						</div>
					</div>
				</>
			) : (
				<div style={{ textAlign: "center" }}>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			)}
		</div>
	);
}

export default Covid;
