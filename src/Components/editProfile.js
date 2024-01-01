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


  const navigate = useNavigate();

  const editProfile = () => {
    if (!email || !city || gender === '0' || !country || !chant || !hear || !read || !serv) {
      alert('Please fill in all  fields!');
      return;
    }

    setIsLoading(true);

    fetch('http://localhost:8081/editProfile', {
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
    <div name="editProfile" className="md:max-w-md  lg:max-w-xl bg-gray-100 sm:max-w-sm  mx-auto mt-8 p-4 mb-14 border  rounded-lg  shadow-2xl">
      <center>
        {/* <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2> */}
      </center>

      <div className="mb-5 mt-6">
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          className="border border-gray-300 p-2 rounded-lg shadow-md shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </div>

      <div className="mb-5">
        <label htmlFor="city">City:</label>
        <input
          required
          type="text"
          id="city"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          className="border border-gray-300 p-2 rounded-lg mt-1 shadow-md shadow-orange-200 outline-none hover:bg-gray-100 w-full"
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
          className="border border-gray-300 p-2 rounded-lg shadow-md   mt-1 shadow-orange-200  outline-none   hover:bg-gray-100 w-full"
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
          
          className="border border-gray-300  p-2 rounded-lg shadow-md mb-4 mt-1 shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          value={friendEmails}
          onChange={(e) => setFriendEmails(e.target.value)}
        />
        <center><button className='bg-orange-200 rounded-xl text-sm p-2 pr-5 pl-5 hover:bg-orange-400 hover:text-white hover:scale-105' onClick={handleAddFriends}>Add Friends</button></center>

        <div className='hidden'>
          <h2>Friends List:</h2>
          <ul>
            {friends.map((friend, index) => (
              <li  key={index}>{friend}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* counselor section */}
            {/* Counselor Section */}
      <div className="mb-5">
        <label htmlFor="counselorEmails">Counselor's Email(s):</label>
        <input
          type="text"
          id="counselorEmails"
          className="border border-gray-300 p-2 rounded-lg shadow-md mb-4 mt-1 shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          value={counselorEmails}
          onChange={(e) => setCounselorEmails(e.target.value)}
        />
        <center>
          <button
            className='bg-orange-200 rounded-xl text-sm p-2 hover:bg-orange-400 hover:text-white hover:scale-105'
            onClick={handleAddCounselors}
          >
            Add Counselors
          </button>
        </center>

        <div className='hidden'>
          <h2>Counselors List:</h2>
          <ul>
            {counselors.map((counselor, index) => (
              <li key={index}>{counselor}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div className="mb-5">
        <label htmlFor="Sleep">Sleep</label>
        <input
          type="text"
          id="sleep"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setSleep(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="wakeup">Wake Up</label>
        <input
          type="text"
          id="wakeup"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setWakeup(e.target.value)}
        />
      </div> 
      <div className="mb-5">
        <label htmlFor="chant">Chant</label>
        <input
          type="text"
          id="chant"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setChant(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="hear">Hear</label>
        <input
          type="text"
          id="hear"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setHear(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="read">Read</label>
        <input
          type="text"
          id="read"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setRead(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="serve">Serve</label>
        <input
          type="text"
          id="serve"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setServe(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="city">Rest</label>
        <input
          type="text"
          id="rest"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setRest(e.target.value)}
        /> */}
      {/* </div> */}
      <div className="mb-5">
        <label htmlFor="chant">Chant</label>
        <input
          required
          type="text"
          id="chant"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setChant(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="hear">Hear</label>
        <input
          required
          type="text"
          id="hear"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setHear(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="read">Read</label>
        <input
          required
          type="text"
          id="read"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setRead(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="serve">Serve</label>
        <input
          required
          type="text"
          id="serv"
          className="border border-gray-300 p-2 rounded-lg shadow-md  shadow-orange-200 outline-none hover:bg-gray-100 w-full"
          onChange={(e) => setServ(e.target.value)}
        />
      </div>
      <center>
        <button
          className="bg-orange-500 text-white pl-4 pr-4 p-2 mb-2 hover:scale-105   rounded-md shadow-md shadow-orange-600 hover:bg-orange-700 cursor-pointer"
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
