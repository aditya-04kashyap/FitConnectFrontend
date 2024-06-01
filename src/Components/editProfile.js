import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('0');
  const [country, setCountry] = useState('');
  const [friendEmails, setFriendEmails] = useState('');
  const [friends, setFriends] = useState([]);
  const [counselorEmails, setCounselorEmails] = useState('');
  const [counselors, setCounselors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chant, setChant] = useState('');
  const [hear, setHear] = useState('');
  const [read, setRead] = useState('');
  const [serv, setServ] = useState('');
  const [mtw, setMtw] = useState('');

  const [sleepHour, setSleepHour] = useState('');
  const [sleepMinute, setSleepMinute] = useState('');
  const [sleepAmPm, setSleepAmPm] = useState('');

  const [wakeupHour, setWakeupHour] = useState('');
  const [wakeupMinute, setWakeupMinute] = useState('');
  const [wakeupAmPm, setWakeupAmPm] = useState('');
  
  const navigate = useNavigate();
  const convertTimeToValue = (hour, minute, amPm) => {
    let value = 0;
    if (amPm === 'pm') {
      value += 120;
    }

    value += hour * 10 + (minute / 6);

    return value;
  };

  const editProfile = () => {
    if (!email || !city || gender === '0' || !country ) {
      alert('Please fill in all  fields!');
      return;
    }

    setIsLoading(true);
  
    fetch('https://fitconnectbackend.onrender.com/editProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        city,
        gender,
        country,
        friends,
        counselors,
        chant,
        hear,
        read,
        serv,
        mtw,
        sleepTime: convertTimeToValue(sleepHour, sleepMinute, sleepAmPm),
        wakeupTime: convertTimeToValue(wakeupHour, wakeupMinute, wakeupAmPm),
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.error('Error:', error);

        setIsLoading(false);
        alert('An error occurred. Please try again.');
      });
  };

  const handleAddFriends = () => {
    const emailList = friendEmails.split(',').map(email => email.trim());
    setFriends(prevFriends => [...prevFriends, ...emailList]);
    setFriendEmails('');
  };
  const handleAddCounselors = () => {
    const emailList = counselorEmails.split(',').map(email => email.trim());
    setCounselors(prevCounselors => [...prevCounselors, ...emailList]);
    setCounselorEmails('');
  };



  return (
    <div name="editProfile" className="md:max-w-md  lg:max-w-xl bg-gradient-to-r text-white from-slate-950 to-zinc-900  sm:max-w-sm  mx-auto mt-8 p-4  border border-lime-400  rounded-lg  shadow-2xl">
      <center>
        {/* <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2> */}
      </center>

      <div className="mb-5 mt-6">
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          className="border p-2 rounded-lg outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </div>

      <div className="mb-5">
        <label htmlFor="city">City:</label>
        <input
          required
          type="text"
          id="city"
          className="border p-2 rounded-lg outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          className="border p-2 rounded-lg outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">Select Here</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="country">Country:</label>
        <input
          
          type="text"
          id="country"
          className="border p-2 rounded-lg outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      
      {/* Friends Section */}
      <div className="mb-5">
        <label htmlFor="friendEmails">Friend's Email(s):</label>
        <input
          type="text"
          id="friendEmails"
          
          className="border p-2 rounded-lg outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 w-full"
          value={friendEmails}
          onChange={(e) => setFriendEmails(e.target.value)}
        />
        <center><button className='bg-lime-300 hover:shadow-md hover:shadow-lime-200 hover:bg-lime-400 rounded-xl text-slate-900 text-sm p-2 pr-5 pl-5 mt-2 hover:bg-y-600  hover:scale-105' onClick={handleAddFriends}>Add Friends</button></center>

        <div className='hidden'>
          <h2>Friends List:</h2>
          <ul>
            {friends.map((friend, index) => (
              <li  key={index}>{friend}</li>
            ))}
          </ul>
        </div>
      </div>
      <center></center>
      <center>
        <button
          className="bg-lime-500 hover:shadow-md hover:shadow-lime-300 text-slate-900 pl-4 pr-4 p-2 mb-2 hover:scale-105   rounded-md shadow-sm shadow-lime-400 hover:bg-lime-700 cursor-pointer"
          onClick={editProfile}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              <span>Updating...</span>
            </div>
          ) : (
            'Update '
          )}
        </button>
      </center>
    </div>
  );
};
export default EditProfile;
