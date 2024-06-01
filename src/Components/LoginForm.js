import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import lb1 from '../imags/lb1.png';
const LoginForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (userEmail) => {
    localStorage.setItem('userEmail', userEmail);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    axios.post('https://fitconnectbackend.onrender.com/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data === 'Login Successful') {
          setDisplayMessage('Welcome');
          handleLoginSuccess(email);
        } else {
          setDisplayMessage('Invalid Credentials');
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setDisplayMessage('An error occurred');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-6 bg-cover bg-center md:bg-repeat lg:bg-cover  md:p-0 p-auto " style={{ backgroundImage: `url(${lb1})` }} >
      
        <div className='flex flex-col'>
        <h1 className="md:text-6xl font-extrabold text-center text-4xl text-white font-D tracking-wide transition  transform  ">FitConnect</h1>
        <center><p className='font-light font-sans text-xl text-white mb-5'>Progress Together</p></center>
        </div>
      
        
      

      <div className=" shadow-xl p-8 rounded-xl sm:w-96 w-72 md:w-96">
        <h2 className="text-3xl font-extrabold mb-3 text-center font-D  text-white">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-bold text-white">Email</label>
            <input
              placeholder='Enter Email'
              type="email"
              id="email"
              name="email"
              value={email}
              required
              className="mt-1 p-2 w-full rounded-md outline-none text-slate-900   shadow-lg hover:scale-105 duration-200"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-bold text-white">Password</label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              required
              name="password"
              className="mt-1 p-2 w-full outline-none text-slate-900 rounded-md shadow-lg hover:scale-105 duration-200"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-lime-600 text-white p-2 rounded-md w-full mt-3 hover:text-slate-900 hover:bg-lime-300  hover:scale-110 duration-200"
          >
            Login
          </button>
        </form>
        
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 font-extrabold w-10 border-t-2 border-b-2 border-lime-400"></div>
            <p className="ml-2 text-lime-400">Logging in...</p>
          </div>
        )}

        {displayMessage && !loading && (
          <p className="text-center mt-4 text-red-500 text-xl font-LO text-extrabold">{displayMessage}</p>
        )}

        <p className="text-md text-center mt-4 text-white">
          New user? <Link to='/SignUp' smooth duration={500} className='text-lime-400 hover:text-lime-600 cursor-pointer'>SignUp </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;










