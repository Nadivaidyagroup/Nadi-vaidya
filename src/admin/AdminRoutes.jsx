// src/admin/AdminRoutes.jsx

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* DASHBOARD */
import Dashboard from "./pages/Dashboard";

/* BLOGS */
import Blogs from "./pages/Blogs";
import BlogEditor from "./pages/BlogEditor";

/* FORMS */
import ContactForms from "./pages/ContactForms";
import NadiForms from "./pages/NadiForms";
import DoshaForms from "./pages/DoshaForms";
import Appointments from "./pages/Appointments";

/* PROTECTED ROUTE */
import ProtectedRoute from "./components/ProtectedRoute";

export default function AdminRoutes() {

  return (

    <Routes>

      {/* =========================
          DEFAULT REDIRECT
      ========================= */}
      <Route
        path="/"
        element={
          <Navigate
            to="/admin/login"
            replace
          />
        }
      />

      {/* =========================
          LOGIN
      ========================= */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* =========================
          REGISTER
      ========================= */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* =========================
          DASHBOARD
      ========================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* =========================
          BLOGS
      ========================= */}
      <Route
        path="/blogs"
        element={
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        }
      />

      {/* =========================
          ADD BLOG
      ========================= */}
      <Route
        path="/add-blog"
        element={
          <ProtectedRoute>
            <BlogEditor />
          </ProtectedRoute>
        }
      />

      {/* =========================
          EDIT BLOG
      ========================= */}
      <Route
        path="/edit-blog/:id"
        element={
          <ProtectedRoute>
            <BlogEditor />
          </ProtectedRoute>
        }
      />

      {/* =========================
          CONTACT FORMS
      ========================= */}
      <Route
        path="/contact-forms"
        element={
          <ProtectedRoute>
            <ContactForms />
          </ProtectedRoute>
        }
      />

      {/* =========================
          NADI FORMS
      ========================= */}
      <Route
        path="/nadi-forms"
        element={
          <ProtectedRoute>
            <NadiForms />
          </ProtectedRoute>
        }
      />

      {/* =========================
          APPOINTMENTS
      ========================= */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />

      {/* =========================
          DOSHA FORMS
      ========================= */}
      <Route
        path="/dosha-forms"
        element={
          <ProtectedRoute>
            <DoshaForms />
          </ProtectedRoute>
        }
      />

      {/* =========================
          404 REDIRECT
      ========================= */}
      <Route
        path="*"
        element={
          <Navigate
            to="/admin/login"
            replace
          />
        }
      />

    </Routes>

  );

}