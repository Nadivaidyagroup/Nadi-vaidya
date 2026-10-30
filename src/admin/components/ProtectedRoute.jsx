// src/admin/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

import "./protectedRoute.css";

export default function ProtectedRoute({
  children
}) {

  /*
    GET ADMIN
  */
  const admin =
    localStorage.getItem("admin");

  /*
    NOT LOGIN
  */
  if (!admin) {

    return (

      <div className="admin-protected-page">

        <div className="admin-protected-box">

          <div className="admin-protected-icon">
            🔒
          </div>

          <h2>
            Access Denied
          </h2>

          <p>
            Please login to access
            the admin dashboard.
          </p>

        </div>

        <Navigate
          to="/admin/login"
          replace
        />

      </div>

    );

  }

  /*
    ALLOW PAGE
  */
  return children;

}