// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // Importez le composant Footer
import HomePage from './HomePage';
import ForEachAcademy from './ForEachAcademy';
import FormationDetail from './FormationDetail';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foreach-academy" element={<ForEachAcademy />} />
          <Route path="/formations/:id" element={<FormationDetail />} />
        </Routes>
        <Footer /> {/* Inclure le Footer ici pour qu'il soit visible sur toutes les pages */}
      </div>
    </Router>
  );
}

export default App;
