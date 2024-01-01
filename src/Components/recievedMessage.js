import React, { useEffect, useState } from 'react';

const ReceivedMessagesDashboard = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch received messages when the component mounts
    fetch(`http://localhost:8081/received-messages/${userId}`)
      .then(response => response.json())
      .then(data => {
        setReceivedMessages(data);
      })
      .catch(error => {
        console.error('Error fetching received messages:', error);
      });
  }, [userId]); // Dependency array ensures the effect runs whenever userId changes

  return (
    <div>
      <h2>Received Messages</h2>
      <ul>
        {receivedMessages.map(message => (
          <li key={message.messageId}>
            <p>{message.msg}</p>
            <p>Sent by: {message.sndrName}</p>
            <p>Sent on: {message.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedMessagesDashboard;
