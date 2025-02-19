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
import UsersListPage from "./pages/admin/user/AdminUsersListPage";
import AddUserPage from "./pages/admin/user/AdminAddUserPage";
import ErrorPage from "./pages/ErrorPage";
import TraineePracticalLifePage from "./pages/authentified_user/TraineePracticalLifePage";
import LivretPage from "./pages/authentified_user/LivretPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthContext from "./context/AuthContext";
import UserServices from "./services/UserServices";
import {
  FRONT_ADMIN_ADD_PROMOTION,
  FRONT_ADMIN_ADD_TRAINING,
  FRONT_ADMIN_ADD_USERS,
  FRONT_ADMIN_DASHBOARD,
  FRONT_ADMIN_EVALUATION,
  FRONT_ADMIN_PROMOTION,
  FRONT_ADMIN_PROMOTIONDETAILS,
  FRONT_ADMIN_TRAINING,
  FRONT_ADMIN_TRAININGDETAILS,
  FRONT_ADMIN_USERDETAILS,
  FRONT_ADMIN_USERS,
  FRONT_ERROR,
  FRONT_FORGOT_PASSWORD,
  FRONT_FORMATION_DETAIL,
  FRONT_FORMATION_DETAIL_PROMOTION_DETAIL,
  FRONT_HOME,
  FRONT_LOGIN,
  FRONT_RESET_PASSWORD,
  FRONT_TRAINER_PRATICAL_LIFE,
} from "./utils/frontUrl";
import NavbarAdmin from "./components/shared/navbar/AdminNavbar";
import AdminDashboardPage from "./pages/admin/dashboard/AdminDashboardPage";
import AdminPromotionPage from "./pages/admin/promotion/AdminPromotionPage";
import AdminTrainingPage from "./pages/admin/training/AdminTrainingPage";
import AdminEvaluationPage from "./pages/admin/evaluation/AdminEvaluationPage";
import Navbar from "./components/shared/navbar/Navbar";
import UserDetailsPage from "./pages/admin/user/AdminUserDetailsPage";
import AddTraining from "./pages/admin/training/AdminAddTraining";
import TrainingDetailPage from "./pages/admin/training/AdminTrainingDetailPage";
import PromotionDetailsPage from "./pages/admin/promotion/AdminPromotionDetailsPage";
import AdminAddPromotionPage from "./pages/admin/promotion/AdminAddPromotionPage";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  UserServices.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(
    UserServices.isAuthenticated
  );
  const [isAdmin, setIsAdmin] = useState(UserServices.isAdmin);
  const [isTrainer, setIsTrainer] = useState(UserServices.isTrainer);
  const [userName, setUserName] = useState(UserServices.userName);

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
        userName,
        setUserName

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

      <div className="main-content">
        <div className="page-content">
        <Navbar />
          <Routes>
            <Route path={FRONT_ERROR} element={<ErrorPage />} />
            <Route path={FRONT_LOGIN} element={<LoginPage />} />
            <Route path={FRONT_RESET_PASSWORD} element={<ResetPasswordPage />} />
            <Route path={FRONT_FORGOT_PASSWORD} element={<ForgetPassword/>} />
            {/* Routes accessibles aux utilisateurs authentifiés */}
            <Route path={FRONT_HOME} element={<HomePage />} />
            <Route
              path={FRONT_TRAINER_PRATICAL_LIFE}
              element={<TraineePracticalLifePage />}
            />
            <Route path={FRONT_FORMATION_DETAIL} element={<FormationDetailPage />} />
            <Route path={FRONT_FORMATION_DETAIL_PROMOTION_DETAIL} element={<LivretPage />} />

            {/* Routes accessibles uniquement aux administrateurs et formateurs */}
            {(isAdmin || isTrainer) && (
              <>
                <Route path={FRONT_ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
              
                <Route path={FRONT_ADMIN_USERS} element={<UsersListPage />} />
                <Route path={FRONT_ADMIN_ADD_USERS} element={<AddUserPage />} />
                <Route path={FRONT_ADMIN_USERDETAILS} element={<UserDetailsPage />} />
              
                <Route path={FRONT_ADMIN_TRAINING}  element={<AdminTrainingPage />} />
                <Route path={FRONT_ADMIN_TRAININGDETAILS} element={<TrainingDetailPage />} />
                <Route path={FRONT_ADMIN_ADD_TRAINING} element={<AddTraining />} />

                <Route path={FRONT_ADMIN_PROMOTION} element={<AdminPromotionPage />} />
                <Route path={FRONT_ADMIN_ADD_PROMOTION} element={<AdminAddPromotionPage />} />  
                <Route path={FRONT_ADMIN_PROMOTIONDETAILS} element={<PromotionDetailsPage />} />

                <Route path={FRONT_ADMIN_EVALUATION} element={<AdminEvaluationPage />} />
               

              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}



export default App;
