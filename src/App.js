import React from 'react';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/signup';
import Dashboard from './Components/Dashboard';
import EditProfile from './Components/editProfile';
import Sadhana from './Components/sadhanaCard';
import History from './Components/history.js';
import Friends from './Components/friends.js';
import DashboardFriends from './Components/DashBoardFriends.js';
import DashboardSadhana from './Components/DashBoardSadhana.js';
import DashboardHistory from './Components/DashBoardHistory.js';
import DashboardEdit from './Components/DashBoardEdit.js';

import { HashRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/sadhana" element={<DashboardSadhana/>}/>
        <Route path="/history" element={<DashboardHistory/>}/>
        <Route path="/friends" element={<DashboardFriends/>}/>
        <Route path="/editProfile" element={<DashboardEdit/>}/>

      </Routes>
    </HashRouter>
  );
}

export default App;
