import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuReact from './components/menu/MenuReact';
import TermsAndConditionsPage from './components/terms/terms'
import LogIn from './components/login/login'
import Register from './components/register/register'
import Admin from './components/adminDash/adminDash'
import UserLog from './components/userLog/userLog'

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
          <Route path="/register" element={<Register/>} />\
          <Route path="/userLog" element={<UserLog/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
