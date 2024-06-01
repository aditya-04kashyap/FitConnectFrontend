import React, { useState, useEffect } from 'react';

const ReceivedMessages = ({ userEmail }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    // Fetch received messages when the component mounts
    fetch(`https://fitconnectbackend.onrender.com/received-messages/${userEmail}`)
      .then(response => response.json())
      .then(data => {
        // Ensure data is an array before setting the state
        if (Array.isArray(data)) {
          setReceivedMessages(data);
        } else {
          console.error('Received invalid data format:', data);
        }
      })
      .catch(error => console.error('Error fetching received messages:', error));
  }, [userEmail]);

  useEffect(() => {
    console.log('Received Messages:', receivedMessages);
  }, [receivedMessages]);

  const displayedMessages = showAllMessages
    ? receivedMessages
    : receivedMessages.slice(0, 2);

  return (
    <div className="p-4 bg-gradient-to-bl from-neutral-800 to-gray-800 rounded-lg shadow-md">
      
      {displayedMessages.length === 0 ? (
        <p className="text-white">No messages received.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {displayedMessages.map((message, index) => (
              <li key={index} className="border border-lime-400 p-4 rounded-md">
                <p className="text-white font-semibold mb-1">Sender: {message.sndrName}</p>
                <p className="text-white">Date: {message.date.substring(0, 10)}</p>
                <p className="text-white">Message: {message.msg}</p>
              </li>
            ))}
          </ul>
          {receivedMessages.length > 2 && (
            <button
              className="mt-4 text-lime-400 cursor-pointer hover:underline"
              onClick={() => setShowAllMessages(!showAllMessages)}
            >
              {showAllMessages ? 'Show Less' : 'Show More'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ReceivedMessages;
