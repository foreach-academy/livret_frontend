import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css'; 

// Composants et pages
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ForEachAcademy from './pages/ForEachAcademy/ForEachAcademy';
import FormationDetail from './pages/FormationDetail/FormationDetail';
import Footer from './components/Footer/Footer'
import DataConnexion from './pages/DataConnexion/DataConnexion';
import Login from './pages/Login/Login';
import UserList from './pages/ListeUtilisateurAddByAdmin/listeUtilisateurAdd';
import AddUser from './pages/AddUser/AddUser';
import ErrorPage from './pages/ErrorPage/ErrorPage'
import TraineePracticalLife from './pages/TraineePracticalLife/TraineePracticalLife';

// Contexte
import AuthContext from './Context/AuthContext';
import UserServices from './Services/UserServices';

function App() {
  UserServices.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(UserServices.isAuthenticated)
  const [isAdmin, setIsAdmin] = useState(UserServices.isAdmin);
  const [token, setToken] = useState(window.localStorage.getItem('authToken') ? window.localStorage.getItem('authToken') : null);
  return <>
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken, isAdmin, setIsAdmin}}>
      <BrowserRouter>
          <Navbar />
          <main>
            <Routes>       
              <Route path="/" element={<HomePage />} />
              <Route path="/foreach-academy" element={<ForEachAcademy />} />
              <Route path="/formations/:id" element={<FormationDetail />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/users/:role" element={<DataConnexion />} />
              <Route path="/*" element={<ErrorPage />} />
              <Route path="/trainee-practical-life" element={<TraineePracticalLife/>} />
              {isAuthenticated && isAdmin && <>
                <Route path='/users' element={<UserList/>} />
                <Route path='/add' element={<AddUser/>} />
              </>}
            </Routes>
          </main>
          <Footer></Footer>
          <ToastContainer
            position="bottom-right"
            autoClose={20000}
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
  </>;
}

export default App;
