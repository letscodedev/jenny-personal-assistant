import React, { useState } from 'react';
// import axios from "axios";
import './Chatbot.css';

import Messages from './Messages'

const MessageBox = [
  {
    sender: 'Bot',
    text: 'Hello World!'
  },
  {
    sender: 'User',
    text: 'Hello World! (2)'
  },
  {
    sender: 'Bot',
    text: 'Hello World!'
  }
]

function Chatbot() {
	const [responses, setResponses] = useState(MessageBox);
    const [currentMessage, setCurrentMessage] = useState("");

    const handleMessageSubmit = message => {
        const data = {
          message
        };
    
        // axios
        //   .post("YOUR_BACKEND_URL", data)
        //   .then(response => {
        //     const responseData = {
        //       text: response.data["message"]["fulfillmentText"] != "" ? response.data["message"]["fulfillmentText"] : "Sorry, I can't get it. Can you please repeat once?",
        //       isBot: true
        //     };
    
        //     setResponses(responses => [...responses, responseData]);
        //   })
        //   .catch(error => {
        //     console.log("Error: ", error);
        // });
    };

    const handleMessageChange = event => {
        setCurrentMessage(event.target.value);
    };
    
    const handleSubmit = event => {
        const message = {
          text: currentMessage,
          isBot: false
        };
        if (event.key == "Enter") {
          setResponses(responses => [...responses, message]);
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
