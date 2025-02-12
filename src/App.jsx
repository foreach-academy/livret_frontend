import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";

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
  FRONT_ADMIN_ADD_USERS,
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

function App() {
  UserServices.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(
    UserServices.isAuthenticated
  );
  const [isAdmin, setIsAdmin] = useState(UserServices.isAdmin);
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
      }}
    >
      <BrowserRouter>
        <MainContent isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
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
  return (
    <>
      {isAdmin && <NavbarAdmin />}
      <main>
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
          {/* Routes accessibles uniquement aux administrateurs */}
          {isAdmin && (
            <>
              <Route path={FRONT_ADMIN_USERS} element={<UsersListPage />} />
              <Route path={FRONT_ADMIN_ADD_USERS} element={<AddUserPage />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}


export default App;
