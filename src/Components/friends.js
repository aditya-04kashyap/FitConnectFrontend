import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [sadhanas, setSadhanas] = useState([]);
  const [selectedFriendEmail, setSelectedFriendEmail] = useState('');
  const [showSadhanaModal, setShowSadhanaModal] = useState(false);

  useEffect(() => {
    const authenticatedUserEmail = localStorage.getItem('userEmail');

    if (authenticatedUserEmail) {
      setUserEmail(authenticatedUserEmail);

      axios.get(`https://fitconnectbackend.onrender.com/friends/${authenticatedUserEmail}`)
        .then(response => {
          setFriends(response.data);
        })
        .catch(error => console.error('Error fetching friends data:', error));

      axios.get(`https://fitconnectbackend.onrender.com/counselors/${authenticatedUserEmail}`)
        .then(response => {
          setCounselors(response.data);
        })
        .catch(error => console.error('Error fetching counselor data:', error));
    }
  }, []);

  const viewSadhanaHistory = (friendEmail) => {
    setSelectedFriendEmail(friendEmail);
    axios.get(`https://fitconnectbackend.onrender.com/friends/sadhana/${friendEmail}`)
      .then(response => {
        setSadhanas(response.data);
        setShowSadhanaModal(true);
      })
      .catch(error => console.error('Error fetching sadhana history:', error));
  };

  const formatDateString = (numericDate) => {
    const baseDate = new Date('2016-01-01');
    const formattedDate = new Date(baseDate);
    formattedDate.setDate(formattedDate.getDate() + parseInt(numericDate) - 1);
    return formattedDate.toLocaleDateString('en-US');
  };

  const formatTime = (value) => {
    const isPM = value >= 120;
    const hour = Math.floor(value / 10) % 12 || 12;
    const minute = (value % 10) * 6;
    return `${hour}:${minute < 10 ? '0' : ''}${minute} ${isPM ? 'PM' : 'AM'}`;
  };
  const getScoreBackgroundColor = (score) => {
    if (score >= 0 && score <= 33) {
      return 'bg-red-400';
    } else if (score > 33 && score <= 66) {
      return 'bg-amber-300';
    } else if (score > 66 && score <= 100) {
      return 'bg-green-500';
    } else {
      return ''; // Default background color
    }
  };

  return (
    <div className=" border-2 border-lime-400 md:w-3/4 w-auto p-4 m-5 bg-gradient-to-r from-slate-950 to-zinc-900 text-white shadow-xl rounded-2xl  ">
      <style>
        {`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(5px); /* Apply blur effect */
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        .sadhanas-table td {
          padding: 8px;
        }

        .scrollable-table {
          max-height: 300px; /* Set the maximum height for the scrollable section */
          overflow-y: auto; /* Enable vertical scrolling */
        }

        .scrollable-table-horizontal {
          overflow-x: auto; 
        }
        `}
      </style>
      <center>
        <p className='text-lg font-bold '>Your Friends</p>
        <table className="w-4/5 border-1 shadow-lime-300 shadow-md p-3 m-3 mb-4 rounded-xl">
          <thead>
            <tr className="bg-gradient-to-t from-lime-200 to-lime-500 text-slate-900">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border"></th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend, index) => (
              <tr key={index} className={index % 2 === 0 ? 'backdrop-blur-sm' : 'backdrop-blur-sm backdrop-brightness-105'}>
                <td className="py-2 px-4 border">{friend.name}</td>
                <td className="py-2 px-4 border">{friend.email}</td>
                <td className="py-2 px-4 border">
                  <button className=' bg-lime-300 hover:bg-lime-600 hover:shadow-md hover:shadow-lime-300 hover:scale-105 p-1 rounded-lg text-slate-900' onClick={() => viewSadhanaHistory(friend.email)}>Track Fitness</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showSadhanaModal && (
          <div className="modal-overlay">
            <div className="border-2 border-lime-400 modal-content md:w-3/4 w-2/3 z-50 bg-gradient-to-l from-slate-950 to-zinc-900 shadow-slate-300 shadow-sm">
              <span className="close bg-red-400 hover:bg-red-700 hover:scale-105 p-3 rounded-lg" onClick={() => setShowSadhanaModal(false)}>Close</span>
              <h2 className='text-xl font-bold m-3 tracking-wide'>{selectedFriendEmail}'s Recorded fitness data</h2>
              <p className=' font-sans font-light text-white sm:hidden mb-2'>(Scroll to see other columns if not visible)</p>
              <div className="scrollable-table">
                <div className="scrollable-table-horizontal">
                  <table className='sadhanas-table table-auto w-full text-center border-4  border-lime-300'>
                    <thead className='text-lg border-2'>
                      <tr>
                        <th className='border border-lime-300'>Date</th>
                        <th className='border border-lime-300'>Score</th>
                        <th className='border border-lime-300'>Sleep</th>
                        <th className='border border-lime-300'>Wake</th>
                        
                        <th className='border border-lime-300 p-1'>Meditation</th>
                        <th className='border border-lime-300'>Steps</th>
                        <th className='border border-lime-300'>Calories</th>
                        <th className='border border-lime-300'>Exercise</th>
                        <th className='border border-lime-300'>Waste</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sadhanas.map((sadhana, index) => (
                        <tr className='border-2 border-lime-300' key={index}>
                          <td className='border border-lime-300'>{formatDateString(sadhana.date)}</td>
                          <td className={`border border-lime-300 ${getScoreBackgroundColor(sadhana.score)}`}>
                              {sadhana.score}
                          </td>
                          <td className='border border-lime-300'>{formatTime(sadhana.tSleep)}</td>
                          <td className='border border-lime-300'>{formatTime(sadhana.tWakeup)}</td>
                          {/* <td className={`border border-lime-300 ${sadhana.mangal === 0 ? 'bg-red-400' : ' bg-green-500'}`}>
                              {sadhana.mangal === 1 ? 'Yes' : 'No'}
                          </td> */}
                          <td className='border border-lime-300'>{sadhana.chantRnd} Mins</td>
                          <td className='border border-lime-300'>{sadhana.tHear} </td>
                          <td className='border border-lime-300'>{sadhana.tRead} </td>
                          <td className='border border-lime-300'>{sadhana.tService} Mins</td>
                          <td className='border border-lime-300'>{sadhana.tDayRest} Mins</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </center>
      {/* <Message />
      <ReceivedMessages /> */}
    </div>
  );
};

export default FriendsList;
