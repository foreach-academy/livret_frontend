import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";

// Composants et pages
import HomePage from "./pages/authentified_user/HomePage";
import ForEachAcademy from "./pages/authentified_user/ForEachAcademy";
import FormationDetail from "./pages/authentified_user/FormationDetail";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import UsersList from "./pages/admin/UsersList";
import AddUser from "./pages/admin/AddUser";
import ErrorPage from "./pages/ErrorPage";
import TraineePracticalLife from "./pages/authentified_user/TraineePracticalLife";
import LivretPage from "./pages/authentified_user/LivretPage";
import ResetPassword from "./pages/ResetPassword";
import EvaluationPage from "./pages/authentified_user/EvaluationPage";
import AuthContext from "./context/AuthContext";
import UserServices from "./services/UserServices";
import {
  FRONT_ADMIN_ADD_USERS,
  FRONT_ADMIN_USERS,
  FRONT_ERROR,
  FRONT_HOME_PAGE,
  FRONT_TRAINER_PRATICAL_LIFE,
} from "./utils/frontUrl";

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
      <main>
        <Routes>
          <Route path={FRONT_ERROR} element={<ErrorPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/reset/password" element={<ResetPassword />} />
          {/* </>} */}
          {/* {isAuthenticated && <> */}
          <Route path={FRONT_HOME_PAGE} element={<HomePage />} />
          <Route path="/foreach-academy" element={<ForEachAcademy />} />
          <Route path="/formations/:id" element={<FormationDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path={FRONT_TRAINER_PRATICAL_LIFE}
            element={<TraineePracticalLife />}
          />
          <Route
            path="/formation/:formationId/students"
            element={<LivretPage />}
          />
          <Route
            path="/evaluation-form/:formationId/:moduleId/:studentId"
            element={<EvaluationPage />}
          />
          {isAdmin && (
            <>
              <Route path={FRONT_ADMIN_USERS} element={<UsersList />} />
              <Route path={FRONT_ADMIN_ADD_USERS} element={<AddUser />} />
            </>
          )}
          {/* </>} */}
        </Routes>
      </main>
    </>
  );
}

export default App;
