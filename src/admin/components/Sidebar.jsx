// src/admin/components/Sidebar.jsx

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

import axios from "axios";

import "./sidebar.css";

export default function Sidebar() {

  /*
  =========================================
  NAVIGATE
  =========================================
  */

  const navigate =
    useNavigate();

  /*
  =========================================
  MOBILE MENU
  =========================================
  */

  const [open, setOpen] =
    useState(false);

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
        =========================================
        API LOGOUT
        =========================================
        */

        const response =
          await axios.post(
            "/api/admin/logout.php"
          );

        console.log(
          response.data
        );

      } catch (error) {

        console.error(
          "Logout Error:",
          error
        );

      } finally {

        /*
        =========================================
        CLEAR STORAGE
        =========================================
        */

        localStorage.removeItem(
          "admin"
        );

        /*
        =========================================
        CLOSE MOBILE MENU
        =========================================
        */

        setOpen(false);

        /*
        =========================================
        REDIRECT
        =========================================
        */

        navigate(
          "/admin/login"
        );

      }

    };

  /*
  =========================================
  ACTIVE CLASS
  =========================================
  */

  const navClass = ({
    isActive
  }) =>

    isActive

      ? "sidebar-link active"

      : "sidebar-link";

  /*
  =========================================
  RETURN
  =========================================
  */

  return (

    <>

      {/* MOBILE TOGGLE */}
      <button
        className={`mobile-toggle ${open ? "active" : ""}`}
        onClick={() =>
          setOpen(!open)
        }
        aria-label="Toggle Sidebar"
      >

        ☰

      </button>

      {/* SIDEBAR */}
      <aside
        className={`modern-sidebar ${open ? "open" : ""}`}
      >

        {/* HEADER */}
        <div className="sidebar-header">

          <div className="sidebar-logo">

            <div className="logo-circle">

              🌿

            </div>

            <div>

              <h2>
                Nadi Vaidya
              </h2>

              <span>
                Admin Panel
              </span>

            </div>

          </div>

        </div>

        {/* PROFILE */}
     

        {/* NAVIGATION */}
        <div className="sidebar-nav">

          <p className="nav-title">

            MAIN MENU

          </p>

          <nav>

            <NavLink
              to="/admin/dashboard"
              className={navClass}
              onClick={() =>
                setOpen(false)
              }
            >

              <span className="nav-icon">
                📊
              </span>

              Dashboard

            </NavLink>

            <NavLink
              to="/admin/blogs"
              className={navClass}
              onClick={() =>
                setOpen(false)
              }
            >

              <span className="nav-icon">
                📝
              </span>

              Blogs

            </NavLink>

            <NavLink
              to="/admin/add-blog"
              className={navClass}
              onClick={() =>
                setOpen(false)
              }
            >

              <span className="nav-icon">
                ➕
              </span>

              Add Blog

            </NavLink>

            <NavLink
              to="/admin/contact-forms"
              className={navClass}
              onClick={() =>
                setOpen(false)
              }
            >

              <span className="nav-icon">
                📩
              </span>

              Contact Forms

            </NavLink>

            <NavLink
              to="/admin/nadi-forms"
              className={navClass}
              onClick={() =>
                setOpen(false)
              }
            >

              <span className="nav-icon">
                🌿
              </span>

              Nadi Forms

            </NavLink>

            <NavLink
              to="/admin/dosha-forms"
              className={navClass}
              onClick={() =>
                setOpen(false)
              }
            >

              <span className="nav-icon">
                🧘
              </span>

              Dosha Forms

            </NavLink>

          </nav>

        </div>

        {/* FOOTER */}
        <div className="sidebar-footer">

          <button
            className="sidebar-logout-btn"
            onClick={handleLogout}
          >

            🚪 Logout

          </button>

        </div>

      </aside>

      {/* OVERLAY */}
      {open && (

        <div
          className="sidebar-overlay"
          onClick={() =>
            setOpen(false)
          }
        />

      )}

    </>

  );

}