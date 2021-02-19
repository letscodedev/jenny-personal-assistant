import React, { useState } from 'react';
import './Messages.css';

import Message from './Message'

function Messages ({ messages }) {
	return (
		<div className="Messages">
            { 
                messages?.map(message => {
                    return (
                        <Message message={message} />
                    )
                })
            }
		</div>
	);
}

export default Messages;