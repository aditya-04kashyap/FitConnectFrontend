// import React from 'react';

// import { Link } from 'react-router-dom'
// const SignUp = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center relative  bg-contain bg-gradient-to-bl from-red-100 to bg-amber-300" >
//       <div className="absolute top-2 animate__animated animate__fadeIn">
//         <h1 className="text-4xl font-extrabold text-center text-gray-700 tracking-wider transition transform scale-105">ISCKON Sadhana Sharing</h1>
//       </div>

//       <div className="bg-gradient-to-tl from-red-50 to bg-amber-50  rounded-lg p-8 shadow-xl w-96 mt-8">
//         <h2 className="text-2xl font-semibold mb-3 text-center text-gray-700">Register</h2>
//         <form>
//         <div className="mb-4">
//             <label htmlFor="name" className="block text-md font-medium text-gray-700">Name</label>
//             <input placeholder='Enter Name' type="name" id="name" name="name" className="mt-1 p-2 w-full rounded-md text-gray-700   shadow-lg hover:scale-105 duration-200"  />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-md font-medium text-gray-700">Email</label>
//             <input placeholder='Enter Email' type="email" id="email" name="email" className="mt-1 p-2 w-full rounded-md text-gray-700   shadow-lg hover:scale-105 duration-200"  />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-md font-medium text-gray-700">Password</label>
//             <input placeholder='Enter Password' type="password" id="password" name="password" className="mt-1 p-2 w-full  rounded-md shadow-lg hover:scale-105 duration-200" />
//           </div>
//           <button type="submit" className="bg-purple-500 text-white p-2 rounded-md w-full mt-3 hover:bg-purple-800  hover:scale-105 duration-200">Register</button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Already registered? <Link  to='/' smooth duration={500} className='text-purple-500 hover:text-purple-800'>Login </Link>or
//           <Link  to='/' smooth duration={500} className='text-purple-500 hover:text-purple-800'> Guest </Link>
//         </p>
//       </div>
      
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import lb1 from '../imags/lb1.png';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8081/signup', { name, email, password });

      if (response.data === 'Signup Successful') {
        setDisplayMessage('Registration successful');
       
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 2000);
      } else {
        setDisplayMessage('Registration failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during registration', error);
      setDisplayMessage('An error occurred during registration');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-6 bg-cover bg-center   md:bg-repeat lg:bg-cover bg-gradient-to-bl md:p-0 p-auto from-red-100 to bg-amber-300" style={{ backgroundImage: `url(${lb1})` }} >
      <div className="absolute top-2 animate__animated animate__fadeIn">
      <h1 className="md:text-5xl font-extrabold text-center text-4xl text-white font-LO tracking-wide transition  transform scale-105 mb-10">ISKCON Sadhana Sharing</h1>
      </div>

      <div className="bg-gradient-to-tl from-yellow-100 to bg-amber-300 rounded-xl p-8 shadow-xl shadow-amber-600  sm:w-96 w-72 md:w-96 mt-12">
        <h2 className="text-3xl font-semibold mb-3 text-center font-LO text-gray-700">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-md font-bold text-gray-700">Name</label>
            <input
              placeholder='Enter Name'
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-2 w-full outline-none rounded-md text-gray-700 shadow-lg hover:scale-105 duration-200"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-bold text-gray-700">Email</label>
            <input
              placeholder='Enter Email'
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 w-full rounded-md outline-none text-gray-700 shadow-lg hover:scale-105 duration-200"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-bold text-gray-700">Password</label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-2 w-full rounded-md shadow-lg outline-none hover:scale-105 duration-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-md w-full mt-3 hover:bg-orange-700 hover:scale-105 duration-200"
          >
            Register
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 font-extrabold w-10 border-t-2 border-b-2 border-orange-500"></div>
            <p className="ml-2 text-orange-500">Registering...</p>
          </div>
        )}
        {displayMessage && !loading && (
          <p className="text-center mt-4 font-LO text-extrabold">{displayMessage}</p>
        )}
        <p className="text-md text-center mt-4">
          Already registered? <Link to='/' className='text-orange-500  hover:text-orange-700'>Login </Link>
          
        </p>
      </div>
    </div>
  );
};

export default SignUp;

