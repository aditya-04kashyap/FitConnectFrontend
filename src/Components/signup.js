

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
      const response = await axios.post('https://fitconnectbackend.onrender.com/signup', { name, email, password });

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
      <div className='flex flex-col'>
        <h1 className="md:text-6xl font-extrabold text-center text-4xl text-white font-D tracking-wide transition  transform  ">FitConnect</h1>
        <center><p className='font-light font-sans text-xl text-white mb-5'>Progress Together</p></center>
        </div>

      <div className=" rounded-xl p-8    sm:w-96 w-72 md:w-96 ">
        <h2 className="text-4xl font-semibold mb-3 text-center font-D text-white">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-md font-bold text-white">Name</label>
            <input
              placeholder='Enter Name'
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-2 w-full outline-none rounded-md text-slate-900 shadow-lg hover:scale-105 duration-200"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-bold text-white">Email</label>
            <input
              placeholder='Enter Email'
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 w-full rounded-md outline-none text-slate-900 shadow-lg hover:scale-105 duration-200"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-bold text-white">Password</label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-2 w-full rounded-md shadow-lg outline-none hover:scale-105 duration-200 text-slate-900"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-lime-600 text-white p-2 rounded-md w-full mt-3 hover:text-slate-900 hover:bg-lime-300  hover:scale-110 duration-200"
          >
            Register
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 font-extrabold w-10 border-t-2 border-b-2 border-lime-400"></div>
            <p className="ml-2 text-lime-400">Registering...</p>
          </div>
        )}
        {displayMessage && !loading && (
          <p className="text-center mt-4 font-LO text-extrabold text-red-500">{displayMessage}</p>
        )}
        <p className="text-md text-center mt-4 text-white">
          Already registered? <Link to='/' className='text-lime-400  hover:text-lime-600'>Login </Link>
          
        </p>
      </div>
    </div>
  );
};

export default SignUp;

