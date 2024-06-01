

import React, { useState, useEffect } from 'react';

const SadhanaHistory = () => {
  const [sadhanas, setSadhanas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSadhanaHistory = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          throw new Error('User email not found in local storage');
        }

        const response = await fetch(`https://fitconnectbackend.onrender.com/get-sadhana-history/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch Sadhana history');
        }
        
        const data = await response.json();
        console.log('Sadhana history data:', data); // Debugging: Log data to console
        setSadhanas(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false even in case of error
      }
    };

    fetchSadhanaHistory();
  }, []);

  useEffect(() => {
    console.log('Sadhana History:', sadhanas);
  }, [sadhanas]);

  const handleDelete = async (index) => {
    try {
      const sadhanaToDelete = sadhanas[index];
      // Send a request to delete the sadhana record from the backend
      const response = await fetch(`https://fitconnectbackend.onrender.com/delete-sadhana/${sadhanaToDelete.date}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the record');
      }

      // Remove the deleted record from the sadhanas state
      const updatedSadhanas = sadhanas.filter((_, i) => i !== index);
      setSadhanas(updatedSadhanas);
    } catch (error) {
      console.error('Error deleting the record:', error);
    }
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
    return ''; 
  }
};

  return (
    <div className=" p-4 bg-gradient-to-r from-slate-950 to-zinc-900 text-white">
      <center><p className='text-xl  text-white mb-4'>Your Fitness Journey: Progress and Reflections</p></center>
      {loading ? (
        <center>
        <div className="flex justify-center items-center mt-4">
        <div className=" animate-spin rounded-full  h-12 font-extrabold w-10 border-t-2 border-b-2 border-lime-400"></div>
        <p className="ml-2 text-lime-400">Loading Your Fitness Record...</p>
        </div>
        </center>
      ) : (
        <table className="table-auto w-full  border-4 border-lime-400">
          <thead className='text-lg border-2 '>
            <tr>
              <th className='border border-lime-400'>Date</th>
              <th className='border border-lime-400'>Score</th>
              <th className='border border-lime-400'>Sleep</th>
              <th className='border border-lime-400'>Wake</th>
              {/* <th className='border border-lime-400'>Aarti</th> */}
              <th className='border border-lime-400'>Meditation</th>
              <th className='border border-lime-400'>Steps</th>
              <th className='border border-lime-400'>Calories</th>
              <th className='border border-lime-400'>Exercise</th>
              <th className='border border-lime-400'>Waste</th>
              <th className='border border-lime-400'>Delete</th>
            </tr>
          </thead>
          <tbody className='text-center '>
            {sadhanas.map((sadhana, index) => (
              <tr className='border-2 border-lime-300' key={index}>
                <td className='border border-lime-400'>{formatDateString(sadhana.date)}</td>
                <td className={`border border-lime-400 ${getScoreBackgroundColor(sadhana.score)}`}>
                    {sadhana.score}
                </td>

                <td className='border border-lime-400'>{formatTime(sadhana.tSleep)}</td>
                <td className='border border-lime-400'>{formatTime(sadhana.tWakeup)}</td>
                {/* <td className={`border border-lime-400 ${sadhana.mangal === 0 ? 'bg-red-500' : ' bg-green-500'}`}>
                      {sadhana.mangal === 1 ? 'Yes' : 'No'}
                </td> */}
                <td className='border border-lime-400'>{sadhana.chantRnd} Mins</td>
                <td className='border border-lime-400'>{sadhana.tHear} </td>
                <td className='border border-lime-400'>{sadhana.tRead} </td>
                <td className='border border-lime-400'>{sadhana.tService} Mins</td>
                <td className='border border-lime-400'>{sadhana.tDayRest} Mins</td>
                <td className='border border-lime-400'>
                  <button className='bg-red-600 p-1 mb-1 mt-1 text-white hover:scale-105 hover:bg-red-800 rounded-lg' onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default SadhanaHistory;



