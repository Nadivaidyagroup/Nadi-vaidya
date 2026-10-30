// src/admin/pages/DoshaForms.jsx

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";


import "./doshaForms.css";

export default function DoshaForms() {

  /*
    STATE
  */
  const [forms, setForms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
    FETCH DATA
  */
  useEffect(() => {

    fetchForms();

  }, []);

  /*
    FETCH FORMS
  */
  const fetchForms =
    async () => {

      try {

        setLoading(true);

        setError("");

        /*
          API CALL
          USING VITE PROXY
        */
        const response =
          await axios.get(
            "/api/forms/dosha-forms.php"
          );

        /*
          SAFE ARRAY
        */
        if (
          Array.isArray(
            response.data
          )
        ) {

          setForms(
            response.data
          );

        } else {

          setForms([]);

        }

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load dosha forms."
        );

        setForms([]);

      } finally {

        setLoading(false);

      }

    };

  /*
    DELETE FORM
  */
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this dosha form?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        /*
          DELETE API
        */
        await axios.post(
          "/api/forms/delete-dosha-form.php",
          { id }
        );

        /*
          REMOVE UI
        */
        setForms(

          forms.filter(
            (item) =>
              item.id !== id
          )

        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete form."
        );

      }

    };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

        {/* TOPBAR */}
        

        {/* PAGE */}
        <div className="admin-page-content">

          {/* HEADER */}
          <div className="page-header">

            <div>

              <h1>
                Dosha Quiz Forms
              </h1>

              <p>
                View all Ayurvedic
                Dosha Quiz submissions
              </p>

            </div>

            <div className="form-count">

              Total:
              {" "}
              {forms.length}

            </div>

          </div>

          {/* ERROR */}
          {error && (

            <div className="error-box">

              {error}

            </div>

          )}

          {/* LOADING */}
          {loading ? (

            <div className="loading-box">

              Loading Forms...

            </div>

          ) : (

            <>
              {/* EMPTY */}
              {forms.length === 0 ? (

                <div className="empty-box">

                  No Dosha Forms Found

                </div>

              ) : (

                <div className="table-wrapper">

                  <table className="forms-table">

                    <thead>

                      <tr>

                        <th>
                          ID
                        </th>

                        <th>
                          Name
                        </th>

                        <th>
                          Email
                        </th>

                        <th>
                          Phone
                        </th>

                        <th>
                          Result
                        </th>

                        <th>
                          Date
                        </th>

                        <th>
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {forms.map(
                        (item) => (

                          <tr
                            key={item.id}
                          >

                            {/* ID */}
                            <td>

                              #{item.id}

                            </td>

                            {/* NAME */}
                            <td>

                              <div className="user-name">

                                {item.name ||
                                  "—"}

                              </div>

                            </td>

                            {/* EMAIL */}
                            <td>

                              <a
                                href={`mailto:${item.email}`}
                                className="email-link"
                              >

                                {item.email ||
                                  "—"}

                              </a>

                            </td>

                            {/* PHONE */}
                            <td>

                              <a
                                href={`tel:${item.phone}`}
                                className="phone-link"
                              >

                                {item.phone ||
                                  "—"}

                              </a>

                            </td>

                            {/* RESULT */}
                            <td>

                              <span
                                className={`dosha-badge ${
                                  item.result
                                    ? item.result.toLowerCase()
                                    : ""
                                }`}
                              >

                                {item.result ||
                                  "—"}

                              </span>

                            </td>

                            {/* DATE */}
                            <td>

                              {item.created_at
                                ? new Date(
                                    item.created_at
                                  ).toLocaleDateString()
                                : "—"}

                            </td>

                            {/* ACTION */}
                            <td>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(
                                    item.id
                                  )
                                }
                              >

                                Delete

                              </button>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}
            </>

          )}

        </div>

      </div>

    </div>

  );

}