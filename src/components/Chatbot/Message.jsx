import React from "react";
import "./Messages.css";

function Message({ message }) {
	return (
		<div className="Message" style={{ wordWrap: "break-word" }}>
			{message.sender === "Bot" ? (
				<div className="bot">
					<p className="bot__text">{message.text}</p>
				</div>
			) : (
				<div className="user">
					<p className="user__text">{message.text}</p>
				</div>
			)}
		</div>
	);
}

export default Message;
