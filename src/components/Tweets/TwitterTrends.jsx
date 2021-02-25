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
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
          .get("http://localhost:5000/trends") // API CALL 
          .then(response => {
              console.log('Data Received!')
            setTrends(response.data);
          })
          .catch(error => {
            console.log("Error: ", error);
        });
    };

	return (
		<div className="TwitterTrends">
            {
                trends.length > 1 ? 
                    trends?.map((trend, index) => {
                        console.log(trend)
                        return (
                            <div className="trend">
                                <p>{index + 1}. <a href={trend.url}><b>{trend.tweet}</b></a></p>
                                <p className="trend__numTweets">{trend.count}</p>
                            </div>
                        )
                    })
                : <p>Loading</p>
            }
		</div>
	);
}

export default TwitterTrends;
