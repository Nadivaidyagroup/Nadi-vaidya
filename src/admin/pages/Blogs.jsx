// src/admin/pages/Blogs.jsx
// स्वास्थ्य लेख (ब्लॉग) की सूची — देखें, बदलें, हटाएँ

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { categoryOf, hindiDate } from "../../data/blogCategories.js";
import "./appointments.css";
import "./blogAdmin.css";

export default function Blogs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const r = await axios.get("/api/clinic-blogs/admin-list.php", { withCredentials: true });
      setRows(r.data?.success ? r.data.data : []);
      if (!r.data?.success) setMsg(r.data?.message || "Could not load");
    } catch (e) {
      setRows([]);
      setMsg(e?.response?.status === 401 ? "Please log in again." : "Server error while loading.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (row) => {
    if (!window.confirm(`यह लेख हमेशा के लिए हटाना है?\n\n${row.title}`)) return;
    try {
      const r = await axios.post("/api/clinic-blogs/admin-delete.php", { id: row.id }, { withCredentials: true });
      if (r.data?.success) setRows((rs) => rs.filter((x) => x.id !== row.id));
      else setMsg(r.data?.message || "Delete failed");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Delete failed");
    }
  };

  const published = rows.filter((r) => r.status === "published").length;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="appt-page">
          <div className="appt-top">
            <div>
              <h1>स्वास्थ्य लेख (Blog)</h1>
              <p>
                {published} प्रकाशित • {rows.length - published} draft •{" "}
                <a href="/blog" target="_blank" rel="noopener noreferrer">वेबसाइट पर देखें ↗</a>
              </p>
            </div>
            <Link to="/admin/add-blog" className="appt-btn ba-link-btn">
              + नया लेख लिखें
            </Link>
          </div>

          {msg && <div className="appt-msg">{msg}</div>}

          {loading ? (
            <p className="appt-empty">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="appt-empty">
              अभी कोई लेख नहीं है। ऊपर “+ नया लेख लिखें” दबाकर पहला लेख लिखें।
            </p>
          ) : (
            <div className="ba-list">
              {rows.map((r) => (
                <div className="ba-row" key={r.id}>
                  <div className="ba-thumb">
                    {r.image ? <img src={r.image} alt="" /> : <span>🌿</span>}
                  </div>
                  <div className="ba-info">
                    <div className="ba-title">{r.title}</div>
                    <div className="appt-sub">
                      {categoryOf(r.category)?.hi || "—"} • {hindiDate(r.created_at)} • 🌐 {r.langs?.length || 1}/12 भाषाएँ{" "}
                      {r.status === "draft" ? (
                        <span className="ba-draft">Draft (वेबसाइट पर नहीं दिखेगा)</span>
                      ) : (
                        <span className="ba-live">Published</span>
                      )}
                    </div>
                  </div>
                  <div className="ba-actions">
                    {r.status === "published" && (
                      <a href={`/blog/${r.slug}`} target="_blank" rel="noopener noreferrer">देखें</a>
                    )}
                    <Link to={`/admin/edit-blog/${r.id}`}>बदलें</Link>
                    <button type="button" onClick={() => remove(r)}>हटाएँ</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
