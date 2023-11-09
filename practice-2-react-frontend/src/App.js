import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuReact from './components/menu/MenuReact';
import TermsAndConditionsPage from './components/terms/terms'
import TranslucentMenu from './components/translucentMenu/translucentManu.js'

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
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          {/* Otras rutas aquí */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
