import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faHistory, faComment, faUser, faInfoCircle, faSignOutAlt, faBars, faTimes,faUserFriends ,faEdit} from '@fortawesome/free-solid-svg-icons';
import { Link as llink, useNavigate } from 'react-router-dom';
import Background from '../imags/loginBackground.png';
import Calendar from './calender.js';
import EventCalendarData from './calender.json';
import logo from '../imags/logo.png';
import Edit from './editProfile.js';
import FriendsList from './friends.js';
import Sadhana from './sadhanaCard.js';
import Message from './message.js';
import Rec from './recievedMessage.js';
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
  const [showSidebar, setShowSidebar] = useState(!isSmallScreen);

  const quotes = [
    "The purpose of chanting is to purify the heart. As gold when it is put into fire, all the impurities are taken away. Similarly, when you chant Hare Krishna, your heart is cleansed of all material nonsense. ",
    "Krishna consciousness means to be always satisfied and happy in any condition of life. The devotee does not care whether he is in heaven or in hell: he is satisfied in any condition. ",
    "Chanting is the process of cleansing the mirror of the mind. ",
    "The more you increase your attachment for Krishna, the more you become free from material entanglement.",
    "Krishna is the eternal, all-blissful, all-knowing Personality of Godhead. He is the reservoir of all pleasure.",
    "The process of Krishna consciousness is the process of transcending the modes of material nature and coming to the platform of pure goodness." ,
    "Krishna is the ultimate goal of life, and the process of Krishna consciousness is the process of attaining that goal." ,
    "Krishna consciousness is not an artificial imposition on the mind. This consciousness is the original energy of the living entity." ,
    "The chanting of the holy name of Krishna expands the blissful ocean of transcendental life." ,
    "In Krishna consciousness, one comes directly into communion with Krishna, and thus all directions from Krishna may be understood in that transcendental state.",
    "Krishna consciousness is not an ordinary, mundane activity. It is the most valuable engagement that anyone can participate in." ,
    "The process of Krishna consciousness is the process of understanding one's real identity." ,
    "Devotees of Krishna have a sincere and natural interest in the welfare of all living entities." ,
    "In the material world, one’s attempts to render service to others are all ailing." ,
    "Krishna consciousness is not theoretical. It is practical application of the science of the soul." ,
    "Chanting is the waxing moon that spreads the white lotus of good fortune for all living entities." ,
    "One who has unflinching devotion for the Personality of Godhead has all the good qualities of the demigods." ,
    "The highest perfection of human life, achieved either by complete knowledge of matter and spirit, by practice of mystic powers, or by perfect discharge of occupational duty, is to remember the Personality of Godhead at the end of life." ,
    "In the material world, everyone is envious of everyone else, and therefore there is competition." ,
    "Krishna consciousness means to be always situated in the perfect order of bhakti-yoga, free from all material contamination." 
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
      setIsSmallScreen(window.innerWidth <= 640);
      if (!isSmallScreen) {
        setShowSidebar(true); // Reset sidebar visibility on resize for larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSmallScreen]);

  return (
    <div className="flex h-screen bg-white">
      {isSmallScreen && (
        <div className="sm:hidden fixed top-0 right-0 p-4">
          <button className=' backdrop-blur-3xl bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg ' onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? (
              <FontAwesomeIcon icon={faTimes} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2x" />
            )}
          </button>
        </div>
      )}

      <div className={`w-4/5 sm:z-0 z-50 sm:w-64 shadow-yellow-300  md:w-64 p-4 shadow-lg rounded-tr-lg fixed top-0 left-0 h-full overflow-y-auto bg-cover ${isSmallScreen ? (showSidebar ? 'w-3/4' : 'hidden') : ''}`} style={{ backgroundImage: `url(${Background})` }}>
        <h2 className="sm:text-4xl text-5xl  font-LO text-zinc-800 mb-8 md:mb-16  ">Hare Krishna</h2>
        <ul>
          <li className="mb-7  md:mb-5  text-zinc-800 hover:scale-105 hover:text-white  hover:bg-orange-700 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="home" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Home
            </ScrollLink>
          </li>
          <li className="mb-7  md:mb-5 text-zinc-800 hover:scale-105 hover:text-white  hover:bg-orange-700 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="fillSadhanaCard" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faAddressCard} className="mr-3" />
              Sadhana Card
            </ScrollLink>
          </li>
          <li className="mb-7  md:mb-5 text-zinc-800 hover:scale-105 hover:text-white  hover:bg-orange-700 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="historyView" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faHistory} className="mr-3" />
              History View
            </ScrollLink>
          </li>
          <li className="mb-7  md:mb-5 text-zinc-800 hover:scale-105 hover:text-white  hover:bg-orange-700 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="messageSection" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faUserFriends} className="mr-3" />
              Friends 
            </ScrollLink>
          </li>
          
          
          
          {/* <li className='  backdrop-blur-md pl-4 p-1 mb-3 rounded-xl'>
            <p className='text-xl  font-bold text-gray-500 pb-1 pl-4 '>Others</p>
          </li> */}
          <li className="mb-7  md:mb-5 text-gray-800 hover:scale-105 hover:bg-orange-700 rounded-lg pt-1 pb-1 pl-1 hover:text-white  font-bold">
            <ScrollLink to="editProfile" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faEdit} className="mr-3 " />
              Edit Profile
            </ScrollLink>
          </li>
          <li className="mb-7  md:mb-5 text-gray-800 hover:scale-105 hover:text-white   hover:bg-orange-700 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="aboutUs" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
              About Us
            </ScrollLink>
          </li>
          <li className="mb-7 text-gray-800 hover:scale-105 hover:text-white hover:bg-orange-700 rounded-lg pt-1 pb-1  pl-1 font-bold">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 pl-1" />
            <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className={`flex-1 ${isSmallScreen ? 'pl-1' : 'sm:pl-64 md:pl-64'}`}>
      <Element name="home" className="text-gray-800 mb-8">
          <div className="flex flex-col ml-10 justify-center mt-8">
            <p className="text-4xl font-LO  mb-4 tracking-wider">Welcome!</p>
            <div className='flex flex-row '>
              <p className="md:text-2xl text-xl font-light font-sans w-3/4 md:w-2/3 ">
                Step into your sacred space on the Sadhana Dashboard. Embrace the tranquility of this spiritual journey that awaits you. May each moment here bring you closer to inner peace and deepen your connection with your spiritual self. Hari bol!
              </p>
              <img src={logo} className='md:flex hidden  mr-8 w-32 h-32 ml-14 rounded-xl' alt="Logo" />
            </div>
            <div className="border-t-8 mt-16 mb-8 md:mb-16 border-amber-800    bg-gradient-to-r from-yellow-500 to to-orange-500 mr-8 border-b-8 border-1 rounded-lg">
            <center>
              <p className="md:text-4xl text-2xl text-white font-LO mt-4 mb-4">Spiritual Insights</p>
              {/* <p className=' text-sm md:hidden flex m-4'>"Chanting is the process of cleansing the mirror of the mind. "</p> */}
              
              {/* <div className="md:text-2xl text-white text-xs w-2/3 md:flex hidden  md:w-3/4 mt-4 mb-6" style={{ height: '7em', overflow: 'hidden', position: 'relative' }}> */}
              <div
                className="md:text-2xl text-white text-sm w-full  overflow-hidden md:w-3/4 mt-4 mb-6"
                style={{
                  height: isSmallScreen ? '10em' : '7em', // Adjust height based on screen size
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                {quotes.map((quote, index) => (
                  <p
                    key={index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: currentQuoteIndex === index ? 1 : 0,
                      transition: 'opacity 2s ease-in-out',
                    }}
                    className="mb-2"
                  >
                    <span className="mr-1" style={{ fontWeight: 'bold', fontFamily: 'initial', fontSize: '1.5em' }}>&ldquo;</span>{quote}<span className="ml-1" style={{ fontWeight: 'bold', fontFamily: 'initial', fontSize: '1.5em' }}>&rdquo;</span>
                  </p>
                ))}
              </div>
            </center>
          </div>          
            <div className="mt-8 border-1 border-t-8 border-b-8 shadow-xl z- shadow-orange-50  border-amber-800  rounded-lg  bg-orange-100 mr-6 ">
              <center><p className="text-4xl  font-LO tracking-wide text-gray-800 mb-2 m-8">Vaishnava Calendar (Gourabda 537)</p></center>
              <Calendar  data={EventCalendarData} />
            </div>
          </div>
        </Element>
        <Element name="fillSadhanaCard" className='h-screen'>
          <center><h2 className="text-4xl font-LO mb-8 mt-8"> Sadhana Card</h2></center>
          
        </Element>
        <Element name="historyView" className='h-screen'>
          <center><h2 className="text-4xl font-LO mb-8">Your History</h2></center>
        </Element>
        <Element name="messageSection" className=' '>
          <center><h2 className="text-4xl font-LO mb-8">Friends</h2></center>
          <div className=' flex flex-col items-center'>
            
            <FriendsList />

          </div>
        </Element>
        <Element className=''>
          <center>
          <div className='mt-8 md:w-3/4 w-auto p-4 m-5  bg-gray-100 shadow-xl rounded-2xl md:mb-14 mb-8'>
          <h1 className="text-2xl font-bold mb-4 ">Connect with your Friends</h1>
            <Message />
          <h1 className="text-2xl font-bold mb-4 ">Connect with your Friends</h1>
            <Rec />
          </div>

          </center>
        </Element>
        <Element>
        <center><h2 className="text-4xl font-LO mb-8">Edit Profile</h2></center>
          <Edit />
        </Element>
        <Element name="aboutUs" className=''>
          <div className="text-gray-800 text-xl p-8 tracking-wide">
            <center><h2 className="text-4xl font-LO mb-8">About Us</h2></center>
            <p>
              Welcome to <span className="text-yellow-500 font-bold">ISKCON Sadhana Sharing</span>, your spiritual companion for effortless Sadhana sharing.
            </p>
            <h3 className="text-2xl font-bold mt-6 mb-3">Our Vision:</h3>
            <p>
              Envisioning a world where spirituality seamlessly integrates into daily life. Transform your Sadhana journey with our accessible and connected platform.
            </p>
            <h3 className="text-2xl font-bold mt-6 mb-3">Why ISKCON Sadhana Sharing?</h3>
            <p className='mb-3'>
              <span className="font-bold">Effortless Connectivity:</span> Automate Sadhana sharing with your Guide and a devoted friend, bidding farewell to manual reporting.
            </p>
            <p className='mb-3'>
              <span className="font-bold">Community and Support:</span> Join a community of like-minded spiritual seekers, sharing experiences and encouragement.
            </p>
            <p  className='mb-3'>
              <span className="font-bold">Privacy Matters:</span> Prioritize the security and confidentiality of your Sadhana data, respecting the sacredness of your practice.
            </p>
            <p className='mb-3'>
              <span className="font-bold">Guidance for Growth:</span> Receive personalized insights and guidance, making ISKCON Sadhana Sharing your supportive companion on your spiritual journey.
            </p>
            <p className='mb-3'>
              Embark on this journey with <span className="text-yellow-500 font-bold">ISKCON Sadhana Sharing</span> and make Sadhana sharing a joyful and enriching experience. Embrace the transformative power of daily spiritual practice.
            </p>
          </div>
        </Element>
        
        {/* <center><hr className="border-t-2 border-dotted border-yellow-400 h-10  w-10" /></center> */}
        <footer className=" bg-gradient-to-b from-yellow-300 to bg-amber-500 p-4">
            <p className="text-center text-lg text-gray-800">© 2023 ISKCON Sadhana Sharing. All rights reserved.</p>
            <p className="text-center text-lg text-gray-800">Hare Krishna</p>
          </footer>
      </div>
    </div>
  );
};

export default Dashboard;



