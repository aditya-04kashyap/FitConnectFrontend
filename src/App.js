import React from 'react';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/signup';
import Dashboard from './Components/Dashboard';  

import { HashRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        
      </Routes>
    </HashRouter>
  );
}

export default App;
