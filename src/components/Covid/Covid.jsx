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

  return <div className="covid">{covid.cases}</div>;
}

export default Covid;
