import React, { useState } from 'react';

function Message() {
  const [senderName, setSenderName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendMessage = () => {
    // Check if all fields are filled
    if (!senderName || !receiverEmail || !message) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Clear previous error message
    setErrorMessage('');

    // Send message
    fetch('http://localhost:8081/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderName,
        receiverEmail,
        message,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message');
      });
  };

  return (
    <div className="w-2/3 mx-auto mt-10 p-6 mb-6 bg-white rounded-lg shadow-2xl">
      

      {errorMessage && (
        <div className="mb-4 text-red-500">{errorMessage}</div>
      )}

      <div className="mb-4">
        <label htmlFor="senderName" className="block text-gray-600">Your Name:</label>
        <input
          type="text"
          id="senderName"
          className="border border-gray-300 p-2 rounded-lg shadow-md shadow-orange-200 outline-none hover:bg-gray-100 w-full "
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="receiverEmail" className="block text-gray-600">Receiver's Email:</label>
        <input
          type="email"
          id="receiverEmail"
          className="border border-gray-300 p-2 rounded-lg shadow-md shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-600">Message:</label>
        <textarea
          id="message"
          className="border border-gray-300 p-2 rounded-lg shadow-md shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button
        className="bg-orange-500 text-white p-2 rounded hover:bg-orange-700"
        onClick={sendMessage}
      >
        Send Message
      </button>

      
    </div>
  );
}

export default Message;
