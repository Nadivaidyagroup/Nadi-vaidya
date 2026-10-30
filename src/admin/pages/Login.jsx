// src/admin/pages/Login.jsx

import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import axios from "axios";

import "./auth.css";

export default function Login() {

  /*
    NAVIGATION
  */
  const navigate =
    useNavigate();

  /*
    FORM STATE
  */
  const [form, setForm] =
    useState({

      email: "",

      password: ""

    });

  /*
    LOADING
  */
  const [loading, setLoading] =
    useState(false);

  /*
    ERROR
  */
  const [error, setError] =
    useState("");

  /*
    SUCCESS
  */
  const [success, setSuccess] =
    useState("");

  /*
    HANDLE INPUT
  */
  const handleChange =
    (e) => {

      const {

        name,

        value

      } = e.target;

      setForm({

        ...form,

        [name]: value

      });

    };

  /*
    HANDLE LOGIN
  */
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      setSuccess("");

      try {

        /*
          API LOGIN
          USING VITE PROXY
        */
        const response =
          await axios.post(
            "/api/admin/login.php",
            form
          );

        /*
          SUCCESS
        */
        if (
          response.data?.success
        ) {

          /*
            SAVE ADMIN
          */
          localStorage.setItem(

            "admin",

            JSON.stringify({

              id:
                response.data.user?.id,

              name:
                response.data.user?.name,

              email:
                response.data.user?.email

            })

          );

          setSuccess(
            "Login successful."
          );

          /*
            REDIRECT
          */
          setTimeout(() => {

            navigate(
              "/admin/dashboard"
            );

          }, 1000);

        } else {

          setError(

            response.data?.message ||

            "Invalid email or password."

          );

        }

      } catch (error) {

        console.error(error);

        setError(
          "Server error. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <div className="auth-overlay"></div>

        <div className="auth-content">

          <div className="auth-badge">

            Nadi Vaidya Admin

          </div>

          <h1>

            Welcome Back

          </h1>

          <p>

            Login to manage blogs,
            Ayurvedic content,
            contact forms,
            workshop registrations
            and dashboard analytics.

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="auth-card">

          {/* HEADER */}
          <div className="auth-header">

            <h2>
              Admin Login
            </h2>

            <p>
              Enter your credentials
              to access dashboard
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">

                Email Address

              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="abcd@gmail.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <label htmlFor="password">

                Password

              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

            </div>

            {/* ERROR */}
            {error && (

              <div className="auth-error">

                {error}

              </div>

            )}

            {/* SUCCESS */}
            {success && (

              <div className="auth-success">

                {success}

              </div>

            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading
                ? "Logging In..."
                : "Login"}

            </button>

          </form>

          {/* FOOTER */}
          <div className="auth-footer">

            <p>

              Don't have an account?

              {" "}

              <Link
                to="/admin/register"
              >

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}