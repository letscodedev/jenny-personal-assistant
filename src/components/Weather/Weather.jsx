import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Weather.css';

function Weather() {
    const [weather, setWeather] = useState('');

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        axios
            .get("http://localhost:5000/API_ENDPOINT") // API CALL 
            .then(response => {
                console.log(response)
                setWeather(response);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };

	return (
		<div className="Weather">
            Hello Weather!
            <pre>{weather}</pre>
		</div>
	);
}

export default Weather;
