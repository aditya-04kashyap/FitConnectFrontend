// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import lb1 from '../imags/lb1.png'

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [displayMessage, setDisplayMessage] = useState('');
//   const [loading, setLoading] = useState(false); 
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();

  
//     setLoading(true);

//     axios.post('http://localhost:8081/login', { email, password })
//       .then(res => {
//         console.log(res);
//         if (res.data === 'Login Successful') {
//           setDisplayMessage('Hare Krishna');
          

//           setTimeout(() => {
//             setLoading(false);
//             navigate('/dashboard');
//           }, 2000);
//         }else{
//           setDisplayMessage('Invalid Credentials'); 
//           setLoading(false);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         setDisplayMessage('An error occurred');
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center relative p-6 bg-cover bg-center  md:bg-repeat lg:bg-cover bg-gradient-to-bl md:p-0 p-auto from-red-100 to bg-amber-300" style={{ backgroundImage: `url(${lb1})` }} >
//       <div className="absolute top-2">
//       <h1 className="md:text-5xl font-extrabold text-center text-4xl text-white font-LO tracking-wide transition  transform scale-105 mb-10">ISKCON Sadhana Sharing</h1>
//       </div>

//       <div className="bg-gradient-to-tl from-yellow-100 to bg-amber-300 shadow-xl shadow-amber-600 p-8 rounded-xl sm:w-96 w-72 md:w-96">
//         <h2 className="text-3xl font-extrabold mb-3 text-center font-LO  text-gray-700">Login</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-md font-bold text-gray-700">Email</label>
//             <input placeholder='Enter Email' type="email" id="email" name="email"   required  className="mt-1 p-2 w-full rounded-md outline-none text-gray-700   shadow-lg hover:scale-105 duration-200" 
//             onChange={e => setEmail(e.target.value)} />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-md font-bold text-gray-700">Password</label>
//             <input placeholder='Enter Password' type="password" id="password"   required name="password" className="mt-1 p-2 w-full outline-none  rounded-md shadow-lg hover:scale-105 duration-200"
//             onChange={e => setPassword(e.target.value)} />
//           </div>
//           <button type="submit" className=" bg-orange-500 text-white p-2 rounded-md w-full mt-3 hover:bg-orange-800  hover:scale-105 duration-200">Login</button>
//         </form>

//         {loading && (
//           <div className="flex justify-center items-center mt-4">
//             <div className="animate-spin rounded-full h-10 font-extrabold w-10 border-t-2 border-b-2 border-orange-500"></div>
//             <p className="ml-2 text-orange-500">Logging in...</p>
//           </div>
//         )}

//         {displayMessage && !loading && (
//           <p className="text-center mt-4 text-red-800 text-xl font-LO text-extrabold">{displayMessage}</p>
//         )}

//         <p className="text-md text-center mt-4">
//           New user? <Link to='/SignUp' smooth duration={500} className='text-orange-500 hover:text-orange-700'>SignUp </Link> 
          
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


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
    // Store the user's email in localStorage
    localStorage.setItem('userEmail', userEmail);
    // Navigate to the dashboard
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data === 'Login Successful') {
          setDisplayMessage('Hare Krishna');
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
    <div className="min-h-screen flex flex-col items-center justify-center relative p-6 bg-cover bg-center md:bg-repeat lg:bg-cover bg-gradient-to-bl md:p-0 p-auto from-red-100 to bg-amber-300" style={{ backgroundImage: `url(${lb1})` }} >
      <div className="absolute top-2">
        <h1 className="md:text-5xl font-extrabold text-center text-4xl text-white font-LO tracking-wide transition  transform scale-105 mb-10">ISKCON Sadhana Sharing</h1>
      </div>

      <div className="bg-gradient-to-tl from-yellow-100 to bg-amber-300 shadow-xl shadow-amber-600 p-8 rounded-xl sm:w-96 w-72 md:w-96">
        <h2 className="text-3xl font-extrabold mb-3 text-center font-LO  text-gray-700">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-bold text-gray-700">Email</label>
            <input
              placeholder='Enter Email'
              type="email"
              id="email"
              name="email"
              value={email}
              required
              className="mt-1 p-2 w-full rounded-md outline-none text-gray-700   shadow-lg hover:scale-105 duration-200"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-bold text-gray-700">Password</label>
            <input
              placeholder='Enter Password'
              type="password"
              id="password"
              required
              name="password"
              className="mt-1 p-2 w-full outline-none  rounded-md shadow-lg hover:scale-105 duration-200"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-md w-full mt-3 hover:bg-orange-800  hover:scale-105 duration-200"
          >
            Login
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-10 font-extrabold w-10 border-t-2 border-b-2 border-orange-500"></div>
            <p className="ml-2 text-orange-500">Logging in...</p>
          </div>
        )}

        {displayMessage && !loading && (
          <p className="text-center mt-4 text-red-600 text-xl font-LO text-extrabold">{displayMessage}</p>
        )}

        <p className="text-md text-center mt-4">
          New user? <Link to='/SignUp' smooth duration={500} className='text-orange-500 hover:text-orange-700'>SignUp </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;










