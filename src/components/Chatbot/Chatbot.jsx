import React, { useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
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
			.post("https://jenny-backend.herokuapp.com/send-msg", data)
			.then((response) => {
				const responseData = {
					text: response.data.reply,
					sender: "Bot",
				};
				setResponses((responses) => [...responses, responseData]);
				if (response.data.reply === "Processing Please wait") {
					setTimeout(() => {
						const datas = {
							message: "reply",
						};
						axios
							.post(
								"https://jenny-backend.herokuapp.com/send-msg",
								datas
							)
							.then((response) => {
								var obj = JSON.parse(response.data.reply);
								var table_data = (
									<div>
										<h5>Your Booking Details</h5>
										<table>
											<tr>
												<td>bookingId</td>
												<td>{obj.bookingId}</td>
											</tr>
											<tr>
												<td>CarNumber</td>
												<td>{obj.CarNumber}</td>
											</tr>
											<tr>
												<td>carName</td>
												<td>{obj.carName}</td>
											</tr>
											<tr>
												<td>Start Place</td>
												<td>{obj.Start}</td>
											</tr>
											<tr>
												<td>Stop Place</td>
												<td>{obj.Stop}</td>
											</tr>
											<tr>
												<td>PickupLocation</td>
												<td>{obj.PickupLocation}</td>
											</tr>
											<tr>
												<td>PickupTime</td>
												<td>{obj.PickupTime}</td>
											</tr>
											<tr>
												<td>DropTime</td>
												<td>{obj.DropTime}</td>
											</tr>
										</table>
									</div>
								);
								const responseData = {
									text: table_data,
									sender: "Bot",
								};

								console.log("Response car rent ", obj);
								setResponses((responses) => [
									...responses,
									responseData,
								]);
							})
							.catch((error) => {
								console.log("Error: ", error);
							});
					}, 15000);
				}
				if (
					response.data.reply === "Amazon service is being processed"
				) {
					setTimeout(() => {
						const datas = {
							message: "Amazon reply",
						};
						axios
							.post(
								"https://jenny-backend.herokuapp.com/send-msg",
								datas
							)
							.then((response) => {
								console.log(response.data.reply);
								const responseData = {
									text: ReactHtmlParser(response.data.reply),
									sender: "Bot",
								};
								setResponses((responses) => [
									...responses,
									responseData,
								]);
							})
							.catch((error) => {
								console.log(error);
							});
					}, 10000);
				}
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
