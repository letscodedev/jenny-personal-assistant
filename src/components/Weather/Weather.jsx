import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
	const [weather, setWeather] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get("https://jenny-backend.herokuapp.com/weather") // API CALL
			.then((response) => {
				console.log(response.data);
				setWeather(response.data);
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
	};

	return (
		<div className="Weather">
			<div className="row">
				<div className="col-md-4 align">
					<div className="temp__img">
						<img
							alt="weather"
							src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
						/>
					</div>
				</div>
				<div className="col-md-3 align">
					<div className="temp__deg">{weather.temparature}°</div>
				</div>
				<div className="col-md-5 align list">
					<table>
						<tr>
							<td>
								<i class="fa fa-wind"></i>
							</td>
							<td>
								<span>{weather.wind} k/h</span>
							</td>
						</tr>
						<tr>
							<td>
								<i class="fas fa-tint"></i>
							</td>
							<td>
								<span>{weather.humidity}%</span>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div className="temp__loc">
				{weather.city}, {weather.state}
			</div>
		</div>
	);
}

export default Weather;
