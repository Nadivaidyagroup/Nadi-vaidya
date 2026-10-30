// src/admin/pages/Register.jsx

import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import axios from "axios";

import "./auth.css";

export default function Register() {

  /*
  =========================================
  NAVIGATION
  =========================================
  */

  const navigate =
    useNavigate();

  /*
  =========================================
  FORM STATE
  =========================================
  */

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      password: "",

      confirmPassword: ""

    });

  /*
  =========================================
  LOADING
  =========================================
  */

  const [loading, setLoading] =
    useState(false);

  /*
  =========================================
  ERROR
  =========================================
  */

  const [error, setError] =
    useState("");

  /*
  =========================================
  SUCCESS
  =========================================
  */

  const [success, setSuccess] =
    useState("");

  /*
  =========================================
  ONLY THIS EMAIL ALLOWED
  =========================================
  */

  const allowedEmail =
    "nadivigyan@gmail.com";

  /*
  =========================================
  HANDLE INPUT
  =========================================
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
  =========================================
  HANDLE REGISTER
  =========================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      setSuccess("");

      /*
      EMAIL CHECK
      */

      if (
        form.email !== allowedEmail
      ) {

        setError(
          "Only authorized admin email can register."
        );

        setLoading(false);

        return;

      }

      /*
      PASSWORD CHECK
      */

      if (
        form.password !==
        form.confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        setLoading(false);

        return;

      }

      /*
      PASSWORD LENGTH
      */

      if (
        form.password.length < 6
      ) {

        setError(
          "Password must be at least 6 characters."
        );

        setLoading(false);

        return;

      }

      try {

        /*
        API REGISTER
        */

        const response =
          await axios.post(

            "/api/admin/register.php",

            {

              name:
                form.name,

              email:
                form.email,

              password:
                form.password

            }

          );

        /*
        SUCCESS
        */

        if (
          response.data?.success
        ) {

          setSuccess(
            "Admin registered successfully."
          );

          /*
          RESET FORM
          */

          setForm({

            name: "",

            email: "",

            password: "",

            confirmPassword: ""

          });

          /*
          REDIRECT
          */

          setTimeout(() => {

            navigate(
              "/admin/login"
            );

          }, 1500);

        } else {

          setError(

            response.data?.message ||

            "Registration failed."

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

            Create Admin Account

          </h1>

          <p>

            Register secure admin access
            to manage blogs,
            Ayurvedic content,
            workshop forms,
            contact inquiries
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
              Admin Register
            </h2>

            <p>
              Create your admin account
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* NAME */}
            <div className="form-group">

              <label htmlFor="name">

                Full Name

              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </div>

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
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">

              <label htmlFor="confirmPassword">

                Confirm Password

              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
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
                ? "Registering..."
                : "Register"}

            </button>

          </form>

          {/* FOOTER */}
          <div className="auth-footer">

            <p>

              Already have an account?

              {" "}

              <Link
                to="/admin/login"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}