// src/admin/pages/NadiForms.jsx

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";


import "./nadiForms.css";

export default function NadiForms() {

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

  const [error, setError] =
    useState("");

  const [status, setStatus] =
    useState("");

  /*
  =========================================
  FETCH FORMS
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

        setLoading(true);

        setError("");

        const response =
          await axios.get(
            "/api/forms/nadi-forms.php"
          );

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
          "Failed to load forms."
        );

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
          "Delete this form?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        await axios.post(
          "/api/forms/delete-nadi-form.php",
          { id }
        );

        setForms(

          forms.filter(
            (item) =>
              item.id !== id
          )

        );

        setStatus(
          "✅ Form deleted successfully"
        );

      } catch (error) {

        console.error(error);

        setStatus(
          "❌ Failed to delete form"
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
          ?.toString()
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
      "Gender",
      "Age",
      "Education",
      "Phone",
      "WhatsApp",
      "Email",
      "Country",
      "City",
      "State",
      "Address",
      "Message",
      "Date"

    ];

    const rows =
      filteredForms.map((item) => [

        item.id,
        item.name,
        item.gender || item.sex,
        item.age,
        item.education,
        item.phone,
        item.whatsapp,
        item.email,
        item.country,
        item.city,
        item.state,
        item.address,
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
      "nadi-forms.csv";

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
          <th>Gender</th>
          <th>Age</th>
          <th>Education</th>
          <th>Phone</th>
          <th>WhatsApp</th>
          <th>Email</th>
          <th>Country</th>
          <th>City</th>
          <th>State</th>
          <th>Address</th>
          <th>Message</th>
          <th>Date</th>

        </tr>

    `;

    filteredForms.forEach((item) => {

      table += `

        <tr>

          <td>${item.id || ""}</td>
          <td>${item.name || ""}</td>
          <td>${item.gender || item.sex || ""}</td>
          <td>${item.age || ""}</td>
          <td>${item.education || ""}</td>
          <td>${item.phone || ""}</td>
          <td>${item.whatsapp || ""}</td>
          <td>${item.email || ""}</td>
          <td>${item.country || ""}</td>
          <td>${item.city || ""}</td>
          <td>${item.state || ""}</td>
          <td>${item.address || ""}</td>
          <td>${item.message || ""}</td>
          <td>${item.created_at || ""}</td>

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
      "nadi-forms.xls";

    link.click();

  };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

    

        {/* PAGE */}
        <div className="nadi-page">

          {/* HERO */}
          <div className="nadi-hero">

            <div>

              <span className="hero-badge">

                🌿 Nadi Management

              </span>

              <h1>

                Nadi Pariksha Forms

              </h1>

              <p>

                Manage registrations,
                workshop leads and
                customer details easily.

              </p>

            </div>

            <div className="hero-count">

              <h2>

                {filteredForms.length}

              </h2>

              <span>
                Total Forms
              </span>

            </div>

          </div>

          {/* TOOLBAR */}
          <div className="toolbar">

            <div className="search-box">

              <span>
                🔍
              </span>

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

            <div className="toolbar-actions">

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

          {/* STATUS */}
          {status && (

            <div className="status-box">

              {status}

            </div>

          )}

          {/* ERROR */}
          {error && (

            <div className="error-box">

              {error}

            </div>

          )}

          {/* TABLE */}
          <div className="table-card">

            {loading ? (

              <div className="loader-wrapper">

                <div className="loader"></div>

                <p>
                  Loading Forms...
                </p>

              </div>

            ) : filteredForms.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No Forms Found
                </h3>

                <p>
                  No records available right now.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="modern-table">

                  <thead>

                    <tr>

                      <th>User</th>

                      <th>Contact</th>

                      <th>Location</th>

                      <th>Message</th>

                      <th>Date</th>

                      <th>Action</th>

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

                                  {item.name || "—"}

                                </h4>

                                <span>

                                  {item.gender || item.sex || "—"} • {item.age || "—"} yrs

                                </span>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}
                          <td>

                            <div className="contact-info">

                              <a
                                href={`tel:${item.phone}`}
                              >

                                📞 {item.phone}

                              </a>

                              <a
                                href={`mailto:${item.email}`}
                              >

                                ✉️ {item.email}

                              </a>

                            </div>

                          </td>

                          {/* LOCATION */}
                          <td>

                            <div className="location-box">

                              <strong>

                                {item.city || "—"}

                              </strong>

                              <span>

                                {item.state || "—"}, {item.country || "—"}

                              </span>

                            </div>

                          </td>

                          {/* MESSAGE */}
                          <td>

                            <div className="message-box">

                              {item.message
                                ? item.message.substring(
                                    0,
                                    80
                                  )
                                : "No message"}

                              {item.message &&
                                item.message.length > 80 &&
                                "..."}

                            </div>

                          </td>

                          {/* DATE */}
                          <td>

                            <span className="date-chip">

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

            )}

          </div>

        </div>

      </div>

    </div>

  );

}