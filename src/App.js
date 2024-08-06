import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ForEachAcademy from './ForEachAcademy';
import FormationDetail from './FormationDetail';
import Login from './Components/Login'
<<<<<<< HEAD
import Footer from './Footer';

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
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        <Footer>
          
        </Footer>
      </div>
</Router>
=======
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
>>>>>>> pageConnexion
  );
}

export default App;
