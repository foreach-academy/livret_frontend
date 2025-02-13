import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


// Composants et pages
import Footer from "./components/shared/footer/Footer";
import HomePage from "./pages/authentified_user/HomePage";
import FormationDetailPage from "./pages/authentified_user/FormationDetailPage";
import LoginPage from "./pages/LoginPage";
import UsersListPage from "./pages/admin/UsersListPage";
import AddUserPage from "./pages/admin/AddUserPage";
import ErrorPage from "./pages/ErrorPage";
import TraineePracticalLifePage from "./pages/authentified_user/TraineePracticalLifePage";
import LivretPage from "./pages/authentified_user/LivretPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EvaluationPage from "./pages/authentified_user/EvaluationPage";
import AuthContext from "./context/AuthContext";
import UserServices from "./services/UserServices";
import {
  FRONT_ADMIN_ADD_TRAINING,
  FRONT_ADMIN_ADD_USERS,
  FRONT_ADMIN_DASHBOARD,
  FRONT_ADMIN_EVALUATION,
  FRONT_ADMIN_PROMOTION,
  FRONT_ADMIN_TRAINING,
  FRONT_ADMIN_TRAININGDETAILS,
  FRONT_ADMIN_USERDETAILS,
  FRONT_ADMIN_USERS,
  FRONT_ERROR,
  FRONT_FORMATION_DETAIL,
  FRONT_FORMATION_DETAIL_PROMOTION_DETAIL,
  FRONT_HOME,
  FRONT_LOGIN,
  FRONT_RESET_PASSWORD,
  FRONT_TRAINER_PRATICAL_LIFE,
} from "./utils/frontUrl";
import NavbarAdmin from "./components/shared/navbar/AdminNavbar";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPromotionPage from "./pages/admin/AdminPromotionPage";
import AdminTrainingPage from "./pages/admin/AdminTrainingPage";
import AdminEvaluationPage from "./pages/admin/AdminEvaluationPage";
import Navbar from "./components/shared/navbar/Navbar";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import AddTraining from "./pages/admin/AddTraining";
import TrainingDetailPage from "./pages/admin/AdminTrainingDetailPage";

function App() {
  UserServices.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(
    UserServices.isAuthenticated
  );
  const [isAdmin, setIsAdmin] = useState(UserServices.isAdmin);
  const [isTrainer, setIsTrainer] = useState(UserServices.isTrainer);

  const [token, setToken] = useState(
    window.localStorage.getItem("authToken")
      ? window.localStorage.getItem("authToken")
      : null
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        isAdmin,
        setIsAdmin,
        isTrainer,
        setIsTrainer,

      }}
    >
      <BrowserRouter>
        <MainContent isAuthenticated={isAuthenticated} isAdmin={isAdmin} isTrainer={isTrainer} />
       {isAdmin || isTrainer ? null : (<Footer />)} 
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

function MainContent({ isAuthenticated, isAdmin , isTrainer}) {
  return (
    <div className="app-layout">
      {(isAdmin || isTrainer) && <NavbarAdmin />} {/* Sidebar */}
      <div className="main-content">
        <Navbar /> {/* Topbar */}
        <div className="page-content">
          <Routes>
            <Route path={FRONT_ERROR} element={<ErrorPage />} />
            <Route path={FRONT_LOGIN} element={<LoginPage />} />
            <Route path={FRONT_RESET_PASSWORD} element={<ResetPasswordPage />} />
            {/* Routes accessibles aux utilisateurs authentifiés */}
            <Route path={FRONT_HOME} element={<HomePage />} />
            <Route
              path={FRONT_TRAINER_PRATICAL_LIFE}
              element={<TraineePracticalLifePage />}
            />
            <Route path={FRONT_FORMATION_DETAIL} element={<FormationDetailPage />} />
            <Route path={FRONT_FORMATION_DETAIL_PROMOTION_DETAIL} element={<LivretPage />} />
            <Route
              path="/evaluation-form/:formationId/:moduleId/:studentId"
              element={<EvaluationPage />}
            />
            {/* Routes accessibles uniquement aux administrateurs et formateurs */}
            {(isAdmin || isTrainer) && (
              <>
                <Route path={FRONT_ADMIN_USERS} element={<UsersListPage />} />
                <Route path={FRONT_ADMIN_ADD_USERS} element={<AddUserPage />} />
                <Route path={FRONT_ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
                <Route path={FRONT_ADMIN_TRAINING}  element={<AdminTrainingPage />} />
                <Route path={FRONT_ADMIN_ADD_TRAINING} element={<AddTraining />} />
                <Route path={FRONT_ADMIN_EVALUATION} element={<AdminEvaluationPage />} />
                <Route path={FRONT_ADMIN_PROMOTION} element={<AdminPromotionPage />} />
                <Route path={FRONT_ADMIN_USERDETAILS} element={<UserDetailsPage />} />
                <Route path={FRONT_ADMIN_TRAININGDETAILS} element={<TrainingDetailPage />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}



export default App;
