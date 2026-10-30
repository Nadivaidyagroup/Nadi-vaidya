// src/admin/components/Topbar.jsx

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import "./topbar.css";

export default function Topbar() {

  const navigate =
    useNavigate();

  /*
  =========================================
  ADMIN DATA
  =========================================
  */

  const adminData =

    JSON.parse(
      localStorage.getItem("admin")
    ) || {};

  /*
  =========================================
  LOGOUT
  =========================================
  */

  const handleLogout =
    async () => {

      try {

        /*
        CALL LOGOUT API
        */

        await axios.get(
          "/api/auth/logout.php"
        );

      } catch (error) {

        console.error(error);

      } finally {

        /*
        CLEAR STORAGE
        */

        localStorage.removeItem(
          "admin"
        );

        /*
        REDIRECT
        */

        navigate(
          "/admin/login"
        );

      }

    };

  return (

    <header className="modern-topbar">

      {/* LEFT */}
      <div className="topbar-left-area">

        <div className="page-welcome">

          <span className="welcome-badge">

            Admin Panel

          </span>

        
        </div>

      </div>

      {/* RIGHT */}
      <div className="topbar-right-area">

        {/* SEARCH */}
      

        {/* NOTIFICATION */}
     
        {/* SETTINGS */}
       

        {/* PROFILE */}
      

        {/* LOGOUT */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

    </header>

  );

}