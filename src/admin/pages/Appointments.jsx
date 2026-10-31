// src/admin/pages/Appointments.jsx
// ऑनलाइन अपॉइंटमेंट की सूची — तारीख़/क्लीनिक से छाँटें, status बदलें, CSV निकालें

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./appointments.css";

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const CLINIC_LABEL = { karnal: "Karnal", vrindavan: "Vrindavan" };
const STATUS = [
  { v: "booked", l: "Booked" },
  { v: "visited", l: "Visited" },
  { v: "no_show", l: "No show" },
  { v: "cancelled", l: "Cancelled" },
];
const GENDER = { male: "M", female: "F", other: "O" };

export default function Appointments() {
  const [from, setFrom] = useState(todayISO());
  const [to, setTo] = useState(todayISO());
  const [clinic, setClinic] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const r = await axios.get("/api/appointments/admin-list.php", {
        params: { from, to, clinic },
        withCredentials: true,
      });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, clinic]);

  const setStatus = async (id, status) => {
    try {
      const r = await axios.post(
        "/api/appointments/admin-update.php",
        { id, status },
        { withCredentials: true }
      );
      if (r.data?.success) {
        setRows((rs) => rs.map((x) => (x.id === id ? { ...x, status } : x)));
      } else {
        setMsg(r.data?.message || "Update failed");
      }
    } catch (e) {
      setMsg(e?.response?.data?.message || "Update failed");
    }
  };

  const quick = (days) => {
    const a = new Date();
    const b = new Date();
    b.setDate(a.getDate() + days);
    const f = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setFrom(f(a));
    setTo(f(b));
  };

  const exportCsv = () => {
    const head = ["Booking No", "Date", "Time", "Clinic", "Name", "Phone", "Age", "Gender", "City", "Problem", "Status", "Booked At"];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [head.join(",")].concat(
      rows.map((r) =>
        [r.id, r.appt_date, r.time_label, CLINIC_LABEL[r.clinic], r.name, r.phone, r.age, r.gender, r.city, r.problem, r.status, r.created_at]
          .map(esc)
          .join(",")
      )
    );
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `appointments_${from}_to_${to}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const active = rows.filter((r) => r.status !== "cancelled").length;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="appt-page">
          <div className="appt-top">
            <div>
              <h1>Appointments</h1>
              <p>{active} active • {rows.length} total</p>
            </div>
            <button type="button" className="appt-btn" onClick={exportCsv} disabled={!rows.length}>
              Download CSV
            </button>
          </div>

          <div className="appt-filters">
            <label>From<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
            <label>To<input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
            <label>
              Clinic
              <select value={clinic} onChange={(e) => setClinic(e.target.value)}>
                <option value="">Both</option>
                <option value="karnal">Karnal</option>
                <option value="vrindavan">Vrindavan</option>
              </select>
            </label>
            <div className="appt-quick">
              <button type="button" onClick={() => quick(0)}>Today</button>
              <button type="button" onClick={() => quick(1)}>Today + Tomorrow</button>
              <button type="button" onClick={() => quick(7)}>Next 7 days</button>
              <button type="button" onClick={() => quick(30)}>Next 30 days</button>
            </div>
          </div>

          {msg && <div className="appt-msg" role="alert">{msg}</div>}

          {loading ? (
            <p className="appt-empty">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="appt-empty">No appointments for these dates.</p>
          ) : (
            <div className="appt-scroll">
              <table className="appt-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Clinic</th>
                    <th>Patient</th>
                    <th>Phone</th>
                    <th>Problem</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className={r.status === "cancelled" ? "is-cancelled" : ""}>
                      <td>{r.id}</td>
                      <td className="nowrap">{r.appt_date}</td>
                      <td className="nowrap"><strong>{r.time_label}</strong></td>
                      <td>{CLINIC_LABEL[r.clinic] || r.clinic}</td>
                      <td>
                        <strong>{r.name}</strong>
                        <div className="appt-sub">
                          {[r.age && `${r.age} yrs`, GENDER[r.gender], r.city].filter(Boolean).join(" • ")}
                        </div>
                      </td>
                      <td className="nowrap">
                        <a href={`tel:+91${r.phone}`}>{r.phone}</a>
                        <div>
                          <a
                            className="appt-wa"
                            href={`https://wa.me/91${r.phone}?text=${encodeURIComponent(
                              `Namaste ${r.name} ji, aapka Nadi Pariksha appointment ${r.appt_date} ko ${r.time_label} baje ${CLINIC_LABEL[r.clinic]} clinic mein confirm hai. Kripya khali pet aayein.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </td>
                      <td className="appt-problem">{r.problem}</td>
                      <td>
                        <select
                          aria-label={`Status for booking ${r.id}`}
                          value={r.status}
                          onChange={(e) => setStatus(r.id, e.target.value)}
                        >
                          {STATUS.map((s) => (
                            <option key={s.v} value={s.v}>{s.l}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
