import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuReact from './components/menu/MenuReact.js';
import TermsAndConditionsPage from './components/terms/terms.js'
import LogIn from './components/login/login.js'
import Register from './components/register/register.js'
import Admin from './components/adminDash/adminDash.js'
import UserLog from './components/userDash/userLog.js'
import Pqrsf from './components/PQRSF/PQRSF'
import ActivationPage from './components/activateAcount/activateAcount.js';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MenuReact />
              </>
            }
          />
          <Route path="/terms" element={<TermsAndConditionsPage/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/userDash" element={<UserLog/>} />
          <Route path="/help" element={<Pqrsf/>} />
          <Route path="/activate/:activationToken" element={<ActivationPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
