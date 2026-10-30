// src/admin/pages/Dashboard.jsx

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";


import "./dashboard.css";

export default function Dashboard() {

  /*
  =========================================
  STATS
  =========================================
  */

  const [stats, setStats] =
    useState({

      blogs: 0,

      contactForms: 0,

      nadiForms: 0,

      doshaForms: 0

    });

  /*
  =========================================
  RECENT CONTACTS
  =========================================
  */

  const [
    recentContacts,
    setRecentContacts
  ] = useState([]);

  /*
  =========================================
  LOADING
  =========================================
  */

  const [loading, setLoading] =
    useState(true);

  /*
  =========================================
  ERROR
  =========================================
  */

  const [error, setError] =
    useState("");

  /*
  =========================================
  FETCH DASHBOARD
  =========================================
  */

  useEffect(() => {

    fetchDashboard();

  }, []);

  /*
  =========================================
  FETCH DATA
  =========================================
  */

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        setError("");

        const [

          blogsRes,

          contactRes,

          nadiRes,

          doshaRes

        ] = await Promise.all([

          axios.get(
            "/api/blogs/get-blogs.php"
          ),

          axios.get(
            "/api/forms/contact-forms.php"
          ),

          axios.get(
            "/api/forms/nadi-forms.php"
          ),

          axios.get(
            "/api/forms/dosha-forms.php"
          )

        ]);

        /*
        BLOGS
        */

        const blogs =
          Array.isArray(
            blogsRes.data
          )
            ? blogsRes.data
            : [];

        /*
        CONTACTS
        */

        const contacts =

          contactRes.data?.success &&
          Array.isArray(
            contactRes.data.data
          )

            ? contactRes.data.data

            : [];

        /*
        NADI
        */

        const nadi =
          Array.isArray(
            nadiRes.data
          )
            ? nadiRes.data
            : [];

        /*
        DOSHA
        */

        const dosha =
          Array.isArray(
            doshaRes.data
          )
            ? doshaRes.data
            : [];

        /*
        SET STATS
        */

        setStats({

          blogs:
            blogs.length,

          contactForms:
            contacts.length,

          nadiForms:
            nadi.length,

          doshaForms:
            dosha.length

        });

        /*
        RECENT CONTACTS
        */

        setRecentContacts(

          contacts.slice(0, 5)

        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load dashboard data."
        );

      } finally {

        setLoading(false);

      }

    };

  /*
  =========================================
  LOADING
  =========================================
  */

  if (loading) {

    return (

      <div className="dashboard-loader">

        <div className="loader-card">

          <div className="loader-circle"></div>

          <p>
            Loading Dashboard...
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

        {/* TOPBAR */}
        

        {/* PAGE */}
        <div className="dashboard-page">

          {/* HERO */}
          <div className="dashboard-hero">

            <div>

              <span className="dashboard-badge">

                ✨ Admin Panel

              </span>

              <h1>

                Welcome Back 👋

              </h1>

              <p>

                Manage your
                Nadi Vaidya platform
                easily with real-time
                insights and submissions.

              </p>

            </div>

            <button
              className="refresh-btn"
              onClick={fetchDashboard}
            >

              🔄 Refresh

            </button>

          </div>

          {/* ERROR */}
          {error && (

            <div className="dashboard-error">

              {error}

            </div>

          )}

          {/* STATS */}
          <div className="stats-grid">

            <div className="modern-card blogs">

              <div className="card-icon">
                📝
              </div>

              <div>

                <span>
                  Total Blogs
                </span>

                <h2>
                  {stats.blogs}
                </h2>

              </div>

            </div>

            <div className="modern-card contacts">

              <div className="card-icon">
                📩
              </div>

              <div>

                <span>
                  Contact Forms
                </span>

                <h2>
                  {stats.contactForms}
                </h2>

              </div>

            </div>

            <div className="modern-card nadi">

              <div className="card-icon">
                🌿
              </div>

              <div>

                <span>
                  Nadi Forms
                </span>

                <h2>
                  {stats.nadiForms}
                </h2>

              </div>

            </div>

            <div className="modern-card dosha">

              <div className="card-icon">
                🧘
              </div>

              <div>

                <span>
                  Dosha Forms
                </span>

                <h2>
                  {stats.doshaForms}
                </h2>

              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="table-card">

            <div className="table-top">

              <div>

                <h2>
                  Recent Contact Forms
                </h2>

                <p>
                  Latest website inquiries
                </p>

              </div>

            </div>

            <div className="table-responsive">

              <table className="dashboard-table">

                <thead>

                  <tr>

                    <th>
                      User
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Phone
                    </th>

                    <th>
                      Message
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentContacts.length > 0 ? (

                    recentContacts.map(
                      (item) => (

                        <tr
                          key={item.id}
                        >

                          {/* USER */}
                          <td>

                            <div className="user-box">

                              <div className="user-avatar">

                                {item.name
                                  ?.charAt(0)
                                  ?.toUpperCase()}

                              </div>

                              <div>

                                <strong>

                                  {item.name}

                                </strong>

                              </div>

                            </div>

                          </td>

                          {/* EMAIL */}
                          <td>

                            <a
                              href={`mailto:${item.email}`}
                              className="table-link"
                            >

                              {item.email}

                            </a>

                          </td>

                          {/* PHONE */}
                          <td>

                            <a
                              href={`tel:${item.phone}`}
                              className="table-link"
                            >

                              {item.phone}

                            </a>

                          </td>

                          {/* MESSAGE */}
                          <td>

                            <div className="message-box">

                              {item.message
                                ? item.message.substring(
                                    0,
                                    70
                                  )
                                : "No Message"}

                              {item.message &&
                                item.message.length > 70 &&
                                "..."}

                            </div>

                          </td>

                          {/* DATE */}
                          <td>

                            <span className="date-badge">

                              {item.created_at
                                ? new Date(
                                    item.created_at
                                  ).toLocaleDateString()
                                : "—"}

                            </span>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="empty-data"
                      >

                        No Contact Forms Found

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}