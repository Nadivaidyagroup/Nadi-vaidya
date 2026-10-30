// src/admin/pages/ContactForms.jsx

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";


import "./contactForms.css";

export default function ContactForms() {

  /*
  =========================================
  STATE
  =========================================
  */

  const [forms, setForms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  /*
  =========================================
  FETCH DATA
  =========================================
  */

  useEffect(() => {

    fetchForms();

  }, []);

  /*
  =========================================
  FETCH API
  =========================================
  */

  const fetchForms =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/forms/contact-forms.php"
          );

        if (

          response.data.success &&

          Array.isArray(
            response.data.data
          )

        ) {

          setForms(
            response.data.data
          );

        } else {

          setForms([]);

        }

      } catch (error) {

        console.error(error);

        setForms([]);

      } finally {

        setLoading(false);

      }

    };

  /*
  =========================================
  DELETE FORM
  =========================================
  */

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this contact form?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        const response =
          await axios.post(
            "/api/forms/delete-contact-form.php",
            { id }
          );

        if (
          response.data.success
        ) {

          setForms(

            forms.filter(
              (item) =>
                item.id !== id
            )

          );

          setStatus(
            "✅ Contact form deleted successfully"
          );

        } else {

          setStatus(
            response.data.message ||
            "❌ Failed to delete form"
          );

        }

      } catch (error) {

        console.error(error);

        setStatus(
          "❌ Server error while deleting form"
        );

      }

    };

  /*
  =========================================
  FILTER FORMS
  =========================================
  */

  const filteredForms =
    forms.filter((item) => {

      const keyword =
        search.toLowerCase();

      return (

        item.name
          ?.toLowerCase()
          .includes(keyword) ||

        item.email
          ?.toLowerCase()
          .includes(keyword) ||

        item.phone
          ?.toLowerCase()
          .includes(keyword)

      );

    });

  /*
  =========================================
  EXPORT CSV
  =========================================
  */

  const exportCSV = () => {

    const headers = [

      "ID",
      "Name",
      "Email",
      "Phone",
      "Message",
      "Date"

    ];

    const rows =
      filteredForms.map((item) => [

        item.id,
        item.name,
        item.email,
        item.phone,
        item.message,
        item.created_at

      ]);

    const csvContent = [

      headers.join(","),

      ...rows.map((row) =>

        row.map((field) =>

          `"${field || ""}"`

        ).join(",")

      )

    ].join("\n");

    const blob =
      new Blob(

        [csvContent],

        {
          type:
            "text/csv;charset=utf-8;"
        }

      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "contact-forms.csv";

    link.click();

  };

  /*
  =========================================
  EXPORT EXCEL
  =========================================
  */

  const exportExcel = () => {

    let table = `

      <table>

        <tr>

          <th>ID</th>

          <th>Name</th>

          <th>Email</th>

          <th>Phone</th>

          <th>Message</th>

          <th>Date</th>

        </tr>

    `;

    filteredForms.forEach((item) => {

      table += `

        <tr>

          <td>${item.id}</td>

          <td>${item.name}</td>

          <td>${item.email}</td>

          <td>${item.phone}</td>

          <td>${item.message}</td>

          <td>${item.created_at}</td>

        </tr>

      `;

    });

    table += `</table>`;

    const blob =
      new Blob(

        [table],

        {

          type:
            "application/vnd.ms-excel"

        }

      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "contact-forms.xls";

    link.click();

  };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

        {/* TOPBAR */}
        

        {/* PAGE */}
        <div className="contact-page">

          {/* TOP */}
          <div className="contact-top-bar">

            <div>

              <h1>
                Contact Forms
              </h1>

              <p>
                Manage all customer inquiries
              </p>

            </div>

            <div className="top-actions">

              <button
                className="export-btn csv-btn"
                onClick={exportCSV}
              >

                Export CSV

              </button>

              <button
                className="export-btn excel-btn"
                onClick={exportExcel}
              >

                Export Excel

              </button>

            </div>

          </div>

          {/* SEARCH */}
          <div className="search-box">

            <input
              type="text"
              placeholder="Search forms..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* STATUS */}
          {status && (

            <div className="status-box">

              {status}

            </div>

          )}

          {/* LOADING */}
          {loading ? (

            <div className="loader-box">

              <div className="loader"></div>

              <p>
                Loading Forms...
              </p>

            </div>

          ) : (

            <>
              {/* EMPTY */}
              {filteredForms.length === 0 ? (

                <div className="empty-box">

                  No Contact Forms Found

                </div>

              ) : (

                <div className="table-card">

                  <div className="table-scroll">

                    <table className="contact-table">

                      <thead>

                        <tr>

                          <th>
                            User
                          </th>

                          <th>
                            Contact
                          </th>

                          <th>
                            Message
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

                        {filteredForms.map(
                          (item) => (

                            <tr
                              key={item.id}
                            >

                              {/* USER */}
                              <td>

                                <div className="user-box">

                                  <div className="avatar">

                                    {item.name
                                      ?.charAt(0)
                                      ?.toUpperCase()}

                                  </div>

                                  <div>

                                    <h4>

                                      {item.name}

                                    </h4>

                                    <span>

                                      #{item.id}

                                    </span>

                                  </div>

                                </div>

                              </td>

                              {/* CONTACT */}
                              <td>

                                <div className="contact-links">

                                  <a
                                    href={`mailto:${item.email}`}
                                  >

                                    {item.email}

                                  </a>

                                  <a
                                    href={`tel:${item.phone}`}
                                  >

                                    {item.phone}

                                  </a>

                                </div>

                              </td>

                              {/* MESSAGE */}
                              <td>

                                <div className="message-box">

                                  {item.message
                                    ? item.message.substring(
                                        0,
                                        100
                                      )
                                    : "No Message"}

                                  {item.message &&
                                    item.message.length > 100 &&
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

                </div>

              )}
            </>

          )}

        </div>

      </div>

    </div>

  );

}