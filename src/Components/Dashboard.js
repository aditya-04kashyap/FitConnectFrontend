import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faHistory, faComment, faUser, faInfoCircle, faSignOutAlt, faBars, faTimes,faUserFriends ,faEdit} from '@fortawesome/free-solid-svg-icons';
import { Link as llink, useNavigate } from 'react-router-dom';
import Background from '../imags/loginBackground.png';
import logo from '../imags/FitConnect.png';


const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
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
    <div className="flex  bg-white">
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

      <div className={`w-4/5 lg:z-0 z-10  shadow-gray-700  lg:w-64 p-4 shadow-lg rounded-tr-sm fixed top-0 left-0 h-full overflow-y-auto bg-cover ${isSmallScreen ? (showSidebar ? 'w-3/4' : 'hidden') : ''}`} style={{ backgroundImage: `url(${Background})` }}>
        <h2 className="sm:text-4xl z-1 text-5xl  font-LO  text-white mb-8 md:mb-16  ">FitConnect</h2>
        <ul>
          <li className="mb-7  md:mb-5   text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="home" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Home
            </ScrollLink>
          </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
             <FontAwesomeIcon icon={faAddressCard} className="mr-3" />
             <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleSadhana}>Fitness Card</button>
            
          </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
            
            <FontAwesomeIcon icon={faHistory} className="mr-3" />
            <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleHistory}>History</button>
            
          </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <FontAwesomeIcon icon={faUserFriends} className="mr-3" />
              <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleFriends}>Friends</button>
          </li>  


          <li className="mb-7  md:mb-5  text-white hover:scale-105  rounded-lg pt-1 pb-1 pl-1 hover:bg-lime-400 hover:text-slate-900  font-bold">

              <FontAwesomeIcon icon={faEdit} className="mr-3 " />
              <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleEdit}>Edit Profile</button>
              
            
          </li>
          <li className="mb-7  md:mb-5  text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1 pl-1  font-bold">
            <ScrollLink to="aboutUs" smooth={true} duration={500} className='  cursor-pointer text-2xl md:text-xl'>
              <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
              About Us
            </ScrollLink>
          </li>
          <li className="mb-7  text-white hover:scale-105 hover:bg-lime-400 hover:text-slate-900 rounded-lg pt-1 pb-1  pl-1 font-bold">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 pl-1" />
            <button  className='text-2xl cursor-pointer md:text-xl' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className={`flex-1 ${isSmallScreen ? 'pl-0' : 'sm:pl-64 md:pl-64'}`}>
      <Element name="home" className=" text-white   bg-gradient-to-l from-neutral-800 to-gray-800">
          <div className="flex flex-col ml-10 justify-center ">
            <p className="text-4xl font-LO  mb-4 tracking-wider mt-8">Welcome</p>
            <div className='flex flex-row '>
              <p className="md:text-2xl text-xl font-light font-sans w-3/4 md:w-2/3 ">
              
              Track progress, set goals, and stay motivated with us. This isn't just a 
              workout tracker; it's a community. Explore your dashboard, challenge limits, 
              and see friends' progress for inspiration. Let's push boundaries, break records, 
              and celebrate victories together. Ready to start your fitness journey? Let's progress together!
              </p>
              <img src={logo} className='md:flex hidden  mr-8 w-32 h-32 ml-14 rounded-xl' alt="Logo" />
            </div>
            <div className="border-t-4 mt-16 mb-8 md:mb-16 border border-lime-400 bg-gradient-to-r from-slate-950 to-zinc-900 mr-8 border-b-4 border-1 rounded-lg">
            <center>
              <p className="md:text-4xl text-2xl text-white font-LO mt-4 mb-4">Stay Fit</p>
             
              <div
                className="md:text-2xl text-white text-sm w-full  overflow-hidden md:w-3/4 mt-4 mb-6"
                style={{
                  height: isSmallScreen ? '10em' : '7em', 
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
          </div>
        </Element>
        <Element name="aboutUs" className='bg-gradient-to-l from-neutral-800 to-gray-800'>
          <div className=" text-white text-xl p-8 tracking-wide">
            <center><h2 className="text-4xl font-LO mb-8">About Us</h2></center>
            <p className='font-light font-sans'>
              At<span className="font-bold font-LO"> FitConnect</span> we believe that achieving fitness goals is not just about individual effort , it's about being part of a supportive community that encourages and celebrates every step of your journey. Our platform goes beyond traditional fitness trackers by incorporating a holistic approach to wellness, including sleep and wake-up time tracking, personalized goal setting, progress visualization, and social interaction with friends.
            </p>
            
           
            <p className='mb-3 mt-3'>
              <span className="">Track Your Fitness Goals:</span> <span className='font-light font-sans'>FitConnect empowers you to set personalized fitness goals tailored to your lifestyle and aspirations. Whether you're aiming to run a marathon, build muscle, or simply improve your overall health, our intuitive interface makes it easy to track your progress and stay accountable.</span>
            </p>
            <p className='mb-3'>
              <span className="font-bold">Earn Your Fitness Score:</span> <span className='font-light font-sans'>Our unique Fitness Score algorithm evaluates various factors, including activity level, sleep quality, and goal adherence, to provide you with a comprehensive assessment of your overall fitness. Aim for a higher score to unlock achievements and milestones on your fitness journey.</span>
            </p>
           
            <p  className='mb-3'>
              <span className="font-bold">Connect with Friends:</span> <span className='font-light font-sans'>Fitness is more fun with friends! FitConnect allows you to connect with like-minded individuals, share your progress, and provide mutual support and motivation. Whether you're cheering each other on or competing for milestones, our community fosters camaraderie and encouragement.</span>
            </p>
            <p className='mb-3'>
              <span className="font-bold">Monitor Sleep and Wake-up Time:</span> <span className='font-light font-sans'>Understanding the importance of rest and recovery, FitConnect allows you to monitor your sleep patterns and wake-up times. By providing insights into your sleep quality and duration, we help you optimize your rest to enhance your overall well-being and performance.</span>
            </p>
            <p className='mb-3 font-light font-sans'>
                 Join the <span className='font-bold font-LO'>FitConnect</span> community today and embark on a journey to a healthier, happier you!
            </p>
          </div>
        </Element>
        

        <footer className=" bg-gradient-to-r from-slate-950 to-zinc-950 p-4">
            <p className="text-center text-lg  text-white">© 2024 FitConnect. All rights reserved.</p>
            <p className="text-center text-lg  text-white">Stay Fit and Healthy </p>
          </footer>
      </div>
    </div>
  );
};

export default Dashboard;


