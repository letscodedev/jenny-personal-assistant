import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

import Messages from "./Messages";

function Chatbot() {
	const [responses, setResponses] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");

	const handleMessageSubmit = (message) => {
		const data = {
			message,
		};
		axios
			.post("http://localhost:5000/send-msg", data)
			.then((response) => {
				const responseData = {
					text: response.data.reply,
					sender: "Bot",
				};
				setResponses((responses) => [...responses, responseData]);
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
	};

	const handleMessageChange = (event) => {
		setCurrentMessage(event.target.value);
	};

	const handleSubmit = (event) => {
		const message = {
			text: currentMessage,
			isBot: false,
		};
		if (event.key === "Enter") {
			setResponses((responses) => [...responses, message]);
			handleMessageSubmit(message.text);
			setCurrentMessage("");
		}
	};

	return (
		<div className="Chatbot">
			<div className="chat">
				<Messages messages={responses} />
			</div>
			<input
				type="text"
				value={currentMessage}
				onChange={handleMessageChange}
				onKeyDown={handleSubmit}
				placeholder="Say something..."
				className="message__input"
			/>
		</div>
	);
}

export default Chatbot;
