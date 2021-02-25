import React, { useEffect, useState } from 'react';
import axios from "axios";
import './News.css';

const sampleData = [
    {
        "News": "Covid Shots For 60+ And Over 45-With-Comorbidities From March 1 - NDTV",
        "URL": "http://google.com"
    },
    {
        "News": "Negative Covid test report is now mandatory to enter several states in India; check full list - Times of India",
        "URL": "39K"
    },
    {
        "News": "#INDvsENG",
        "URL": "39K"
    },
    {
        "News": "#INDvsENG",
        "URL": "39K"
    },
    {
        "News": "#INDvsENG",
        "URL": "39K"
    },
    {
        "News": "#INDvsENG",
        "URL": "39K"
    },
    {
        "News": "#INDvsENG",
        "URL": "39K"
    },
    {
        "News": "#INDvsENG 3",
        "URL": "39K"
    }
]

function News() {
    const [news, setNews] = useState(sampleData);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("http://localhost:5000/news") // API CALL 
            .then(response => {
                setNews(response);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };

	return (
		<div className="News">
            {console.log(news)}
            {
                news.length > 1 ? 
                    news.map(n => {
                        return (
                            <div className="news__marginbtm">
                                <a href={n.URL} target="_blank"><p>{n.News}</p></a>
                            </div>
                        )
                    })
                    :
                    setNews(sampleData)
            }
		</div>
	);
}

export default News;
