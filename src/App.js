<<<<<<< HEAD
// src/App.js

import React from 'react';
import Footer from './Footer';
 

function App() {
  return (
    <div className="App">
      <Footer />
    </div>
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ForEachAcademy from './ForEachAcademy';
import FormationDetail from './FormationDetail';
import './App.css'; 

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/foreach-academy" element={<ForEachAcademy />} />
            <Route path="/formations/:id" element={<FormationDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
>>>>>>> homepage
  );
}

export default App;
