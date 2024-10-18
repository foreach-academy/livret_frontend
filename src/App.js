import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css'; 

// Composants et pages
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ForEachAcademy from './pages/ForEachAcademy/ForEachAcademy';
import FormationDetail from './pages/FormationDetail/FormationDetail';
import Footer from './components/Footer/Footer';
import DataConnexion from './pages/DataConnexion/DataConnexion';
import Login from './pages/Login/Login';
import UserList from './pages/ListeUtilisateurAddByAdmin/listeUtilisateurAdd';
import AddUser from './pages/AddUser/AddUser';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import TraineePracticalLife from './pages/TraineePracticalLife/TraineePracticalLife';
import LivretPage from './pages/LivretPage/LivretPage';
import ResetPassword from './pages/ResetPassword';
import EvaluationPage from './pages/LivretPage/EvaluationPage';
import AuthContext from './Context/AuthContext';
import UserServices from './Services/UserServices';

function App() {
  UserServices.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(UserServices.isAuthenticated);
  const [isAdmin, setIsAdmin] = useState(UserServices.isAdmin);
  const [token, setToken] = useState(window.localStorage.getItem('authToken') ? window.localStorage.getItem('authToken') : null);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, isAdmin, setIsAdmin }}>
      <BrowserRouter>
        <MainContent 
          isAuthenticated={isAuthenticated} 
          isAdmin={isAdmin} 
        />
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

function MainContent({ isAuthenticated, isAdmin }) {
  const location = useLocation();

  // Vérifiez si nous sommes sur la page EvaluationPage
  const isEvaluationPage = location.pathname.startsWith('/evaluation-form');

  return (
    <>
      {!isEvaluationPage && <Navbar />}
      <main>
        <Routes>
          {!isAuthenticated && <> 
            <Route path="/" element={<Login />} />
            <Route path="/reset/password" element={<ResetPassword />} />
          </>}
          {isAuthenticated && <>
            <Route path="/" element={<HomePage />} />
            <Route path="/foreach-academy" element={<ForEachAcademy />} />
            <Route path="/formations/:id" element={<FormationDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:role" element={<DataConnexion />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/trainer-practical-life" element={<TraineePracticalLife />} />
            <Route path="/formation/:formationId/students" element={<LivretPage />} />
            <Route path="/evaluation-form/:formationId/:moduleId/:studentId" element={<EvaluationPage />} />
            {isAdmin && <>
              <Route path='/users' element={<UserList />} />
              <Route path='/add' element={<AddUser />} />
            </>}
          </>}
        </Routes>
      </main>
    </>
  );
}

export default App;
