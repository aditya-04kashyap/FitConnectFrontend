import React, { useState } from 'react';

function Message() {
  const [senderName, setSenderName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendMessage = () => {
    if (!senderName || !receiverEmail || !message) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setErrorMessage('');

    fetch('https://fitconnectbackend.onrender.com/send-message', {
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
    <div className="w-2/3 mx-auto mt-10 p-6  bg-gradient-to-bl from-neutral-800 to-gray-800 rounded-lg shadow-md shadow-lime-300">
      

      {errorMessage && (
        <div className="mb-4  text-red-500">{errorMessage}</div>
      )}

      <div className="mb-4">
        <label htmlFor="senderName" className="block text-white">Your Name:</label>
        <input
          type="text"
          id="senderName"
          className="border border-gray-300 p-2 rounded-lg shadow-sm shadow-lime-100 outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full "
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="receiverEmail" className="block text-white">Receiver's Email:</label>
        <input
          type="email"
          id="receiverEmail"
          className="border border-gray-300 p-2 rounded-lg shadow-sm shadow-lime-100 outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-white">Message:</label>
        <textarea
          id="message"
          className="border border-gray-300 p-2 rounded-lg shadow-sm shadow-lime-100 outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-lime-400 text-slate-900 hover:shadow-md hover:shadow-lime-300 p-2 rounded hover:scale-105  hover:bg-lime-600"
        onClick={sendMessage}
      >
        Send Message
      </button>

      
    </div>
  );
}

export default Message;
