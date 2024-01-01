import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './message.js';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user email from localStorage or your authentication system
    const authenticatedUserEmail = localStorage.getItem('userEmail');

    if (authenticatedUserEmail) {
      setUserEmail(authenticatedUserEmail);

      // Fetch friends data from your API endpoint using the authenticated user's email
      axios.get(`http://localhost:8081/friends/${authenticatedUserEmail}`)
        .then(response => {
          // Assuming the API response is an array of friend data
          setFriends(response.data);
        })
        .catch(error => console.error('Error fetching friends data:', error));

      // Fetch counselor data from your API endpoint using the authenticated user's email
      axios.get(`http://localhost:8081/counselors/${authenticatedUserEmail}`)
        .then(response => {
          // Assuming the API response is an array of counselor data
          setCounselors(response.data);
        })
        .catch(error => console.error('Error fetching counselor data:', error));
    }
  }, []);

  return (
    
      <div className="mt-8 md:w-3/4 w-auto p-4 m-5 bg-gray-100 shadow-xl rounded-2xl md:mb-14 mb-8">
        <center>
          <p className='text-lg font-bold'>Your Friends</p>
          <table className="w-4/5 border shadow-2xl p-3 m-3 mb-4 rounded-xl">
            <thead>
              <tr className="bg-gradient-to-t from-orange-200 to-orange-500">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((friend, index) => (
                <tr key={index} className={index % 2 === 0 ? 'backdrop-blur-sm' : 'backdrop-blur-lg backdrop-brightness-110'}>
                  <td className="py-2 px-4 border">{friend.name}</td>
                  <td className="py-2 px-4 border">{friend.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <p className='text-lg font-bold mt-2'>Your Counselors</p>
          <table className="w-4/5 border shadow-2xl p-3 m-3 rounded-xl">
            <thead>
              <tr className="bg-gradient-to-t from-orange-200 to-orange-500">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {counselors.map((counselor, index) => (
                <tr key={index} className={index % 2 === 0 ? ' backdrop-blur-lg backdrop-brightness-110' : 'backdrop-blur-sm '}>
                  <td className="py-2 px-4 border">{counselor.name}</td>
                  <td className="py-2 px-4 border">{counselor.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
      
    
  );
};

export default FriendsList;
