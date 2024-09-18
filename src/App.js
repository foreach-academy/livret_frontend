import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/HomePage';
import ForEachAcademy from './pages/ForEachAcademy';
import FormationDetail from './pages/FormationDetail';
import Footer from './Footer/Footer';
import DataConnexion from './pages/DataConnexion';
import Login from './pages/Login/Login';
import UserList from './pages/ListeUtilisateurAddByAdmin/listeUtilisateurAdd';

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
            <Route path="/users/:role" element={<DataConnexion />} />
            <Route path='/users' element={<UserList/>} />

          </Routes>
        </main>
        <Footer>
          
        </Footer>
      </div>
</Router>
  );
}

export default App;
