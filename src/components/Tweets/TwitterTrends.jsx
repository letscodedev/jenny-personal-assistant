import React, { useEffect, useState } from 'react';
import axios from "axios";
import './TwitterTrends.css';

const sampleData = [
    {
        "Trending": "1",
        "Tweet": "#INDvsENG",
        "NumberOfTweets": "39K"
    },
    {
        "Trending": "2",
        "Tweet": "#MoteraCricketStadium",
        "NumberOfTweets": "33K"
    },
    {
        "Trending": "3",
        "Tweet": "#nseindia",
        "NumberOfTweets": "8,609"
    },
    {
        "Trending": "4",
        "Tweet": "Ishant",
        "NumberOfTweets": "11.9K"
    },
    {
        "Trending": "5",
        "Tweet": "Bairstow",
        "NumberOfTweets": "3,209"
    }
]

function TwitterTrends() {
    const [trends, setTrends] = useState(sampleData);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
          .get("http://localhost:5000/API_ENDPOINT") // API CALL 
          .then(response => {
            setTrends(response);
          })
          .catch(error => {
            console.log("Error: ", error);
        });
    };

	return (
		<div className="TwitterTrends">
            
            {
                trends.map(trend => {
                    return (
                        <div className="trend">
                            <p>{trend.Trending}. <b>{trend.Tweet}</b></p>
                            <p className="trend__numTweets">{trend.NumberOfTweets} Tweets</p>
                        </div>
                    )
                })
            }
		</div>
	);
}

export default TwitterTrends;
