// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ForEachAcademy from './ForEachAcademy';
import FormationDetail from './FormationDetail';
import Login from './Components/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foreach-academy" element={<ForEachAcademy />} />
        <Route path="/formations/:id" element={<FormationDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;


