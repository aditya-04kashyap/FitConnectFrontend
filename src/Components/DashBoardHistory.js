import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faHistory, faComment, faUser, faInfoCircle, faSignOutAlt, faBars, faTimes,faUserFriends ,faEdit} from '@fortawesome/free-solid-svg-icons';
import { Link as llink, useNavigate } from 'react-router-dom';
import Background from '../imags/loginBackground.png';
import History from "./history.js";


const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  const handleHome = () => {
    
    navigate('/dashboard');
  };
  const handleEdit = () => {
    
    navigate('/editProfile');
  };

  const handleSadhana = () => {
    
    navigate('/sadhana');
  };

  const handleHistory = () => {
    
    navigate('/history');
  };

  const handleFriends = () => {
    
    navigate('/friends');
  };
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);
  const [showSidebar, setShowSidebar] = useState(!isSmallScreen);

  const quotes = [
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Push yourself because no one else is going to do it for you.",
    "Small steps every day add up to big results.",
    "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
    "The body achieves what the mind believes.",
    "It’s not about having time; it’s about making time—with your gym buddies.",
    "The pain you feel today will be the strength you feel tomorrow, and your friends will be there to see it.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle—and your friends believe it too.",
    "Your body can stand almost anything. It’s your mind that you have to convince.",
    "Success starts with self-discipline. Keep pushing forward.",
    "Don’t limit your challenges. Challenge your limits.",
    "Every workout is progress, no matter how small.",
    "You don’t have to be extreme, just consistent."
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
      if (!isSmallScreen) {
        setShowSidebar(true); 
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSmallScreen]);

  return (
    <div className="flex  ">
     {isSmallScreen && (
      <div className="lg:hidden fixed top-0 right-0 p-4">
        <button className='bg-lime-300 p-1 rounded-lg' onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? (
            <FontAwesomeIcon icon={faTimes} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faBars} size="2x" />
          )}
        </button>
      </div>
        )}

      <div className={`w-4/5 lg:z-10 z-20  shadow-gray-700  lg:w-64 p-4 shadow-lg rounded-tr-sm fixed top-0 left-0 h-full overflow-y-auto bg-cover ${isSmallScreen ? (showSidebar ? 'w-3/4' : 'hidden') : ''}`} style={{ backgroundImage: `url(${Background})` }}>
        <h2 className="sm:text-4xl z-1 text-5xl  font-LO  text-white mb-8 md:mb-16  ">FitConnect</h2>
        <ul>
        <li className="mb-7  md:mb-5  text-white hover:scale-105   hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
             <FontAwesomeIcon icon={faHome} className="mr-3" />
             <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleHome}>Home</button>
            
            
            </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105   hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
             <FontAwesomeIcon icon={faAddressCard} className="mr-3" />
             <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleSadhana}>Fitness Card</button>
            
          </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105 h hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
            
            <FontAwesomeIcon icon={faHistory} className="mr-3" />
            <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleHistory}>History</button>
            
          </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105   hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <FontAwesomeIcon icon={faUserFriends} className="mr-3" />
              <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleFriends}>Friends</button>
          </li>  

          {/* <li className='  backdrop-blur-md pl-4 p-1 mb-3 rounded-xl'>
            <p className='text-xl  font-bold text-gray-500 pb-1 pl-4 '>Others</p>
          </li> */}
          <li className="mb-7  md:mb-5  text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">

              <FontAwesomeIcon icon={faEdit} className="mr-3 " />
              <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleEdit}>Edit Profile</button>
              
            
          </li>
          <li className="mb-7  text-white hover:scale-105  hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1  pl-1 font-bold">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 pl-1" />
            <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className={`flex-1 ${isSmallScreen ? 'pl-1' : 'sm:pl-64 md:pl-64'} bg-gradient-to-l from-neutral-800 to-gray-800 `}>
      <Element name="historyView" className='  bg-gradient-to-l from-neutral-800 to-gray-800 pb-20'>
          <center><h2 className="text-4xl font-LO mb-8  pt-4 text-white">Fitness Record</h2></center>
          <History />
        </Element>
        <center>
          <p className=' bg-gradient-to-bl from-neutral-800 to-gray-800 md:text-2xl text-xl font-light font-sans  text-white  w-3/4 md:w-2/3 sm:mb-16 mb-72 lg:pb-52 pb-96 pt-52   sm:mt-40 mt-52'>
          "Reflecting on your Fitness journey is an essential part of for
           your fitness goals. Each entry in this history represents a step 
           forward in your personal growth and dedication. Whether you're celebrating 
           achievements or acknowledging areas for improvement, every moment spent in 
           mindful practice contributes to your evolution. Take a moment to honor your dedication 
           and commitment to self-discovery through workout, and may this journey continue to inspire and uplift you on your path."
          </p>
        </center>
        

      <footer className=" bg-gradient-to-r from-slate-950 to-zinc-950 p-4 fixed bottom-0 w-full pt-8   right-0">
            <p className="text-center text-lg  text-white">© 2024 FitConnect. All rights reserved.</p>
            <p className="text-center text-lg  text-white">Stay Fit and Healthy </p>
        </footer>
      </div>
      
    </div>
  );
};

export default Dashboard;


