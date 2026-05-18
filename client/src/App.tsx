import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import UsersPage from "./pages/UsersPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route
          index
          element={<DashboardPage />}
        />

        <Route
          path="leads"
          element={<LeadsPage />}
        />

        <Route
          path="users"
          element={<UsersPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;