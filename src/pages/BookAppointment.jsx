// src/pages/BookAppointment.jsx
// ऑनलाइन अपॉइंटमेंट: क्लीनिक → तारीख़ → समय (15 मिनट slot) → मरीज़ की जानकारी

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { clinics, OPD_TIME } from "../data/clinics.js";
import "./clinic.css";
import "./bookAppointment.css";

const KEY = { "karnal-clinic": "karnal", "vrindavan-clinic": "vrindavan" };
const DAYS_AHEAD = 30;
const WEEKDAYS = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
const MONTHS = ["जन", "फ़र", "मार्च", "अप्रै", "मई", "जून", "जुला", "अग", "सितं", "अक्टू", "नवं", "दिसं"];

const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const openOn = (key, d) => (key === "karnal" ? d.getDate() <= 10 : d.getDate() >= 11);

function niceDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${WEEKDAYS[dt.getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

export default function BookAppointment() {
  const [params] = useSearchParams();
  const initial = params.get("clinic");
  const [clinicKey, setClinicKey] = useState(
    initial === "karnal" || initial === "vrindavan" ? initial : ""
  );
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotState, setSlotState] = useState("idle"); // idle | loading | ready | error
  const [slotErr, setSlotErr] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", age: "", gender: "", city: "", problem: "", website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  const clinic = clinics.find((c) => KEY[c.slug] === clinicKey);

  const dates = useMemo(() => {
    if (!clinicKey) return [];
    const out = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i <= DAYS_AHEAD; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (openOn(clinicKey, d)) out.push(d);
    }
    return out;
  }, [clinicKey]);

  useEffect(() => {
    setDate(dates.length ? ymd(dates[0]) : "");
    setTime("");
  }, [dates]);

  useEffect(() => {
    if (!clinicKey || !date) return;
    let cancel = false;
    setSlotState("loading");
    setTime("");
    axios
      .get("/api/appointments/slots.php", { params: { clinic: clinicKey, date } })
      .then((r) => {
        if (cancel) return;
        if (r.data?.success) {
          setSlots(r.data.slots || []);
          setSlotState("ready");
                } else {
          setSlotErr(r.data?.detail || r.data?.message || "");
          setSlotState("error");
        }
      })
      .catch((e) => {
        if (cancel) return;
        const d = e?.response?.data;
        setSlotErr(
          (d && (d.detail || d.message)) ||
            (e?.response ? `HTTP ${e.response.status}` : e?.message || "")
        );
        setSlotState("error");
      });
    return () => {
      cancel = true;
    };
  }, [clinicKey, date]);

  const freeCount = slots.filter((s) => s.available).length;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!time) {
      setError("कृपया समय चुनें।");
      return;
    }
    setSubmitting(true);
    try {
      const r = await axios.post("/api/appointments/book.php", {
        clinic: clinicKey, date, time, ...form,
      });
      if (r.data?.success) {
        setDone(r.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(r.data?.message || "कुछ गड़बड़ हुई, कृपया दोबारा कोशिश करें।");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Server से जुड़ नहीं पाए। कृपया दोबारा कोशिश करें या कॉल करें।");
      if (err?.response?.status === 409) {
        // slot ले लिया गया — slots दोबारा लाएँ
        axios
          .get("/api/appointments/slots.php", { params: { clinic: clinicKey, date } })
          .then((r) => r.data?.success && setSlots(r.data.slots || []))
          .catch(() => {});
        setTime("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    const msg = `Namaste, maine website se Nadi Pariksha appointment book kiya hai.\nBooking No: ${done.id}\nNaam: ${form.name}\nClinic: ${done.clinicName}\nTarikh: ${done.date}\nSamay: ${done.timeLabel}`;
    return (
      <div className="clinic-page">
        <section className="container book-wrap">
          <div className="book-card book-done">
            <div className="book-done-badge" aria-hidden="true">✓</div>
            <h1>आपका अपॉइंटमेंट बुक हो गया</h1>
            <p className="book-ref">बुकिंग नंबर: <strong>{done.id}</strong></p>
            <dl className="book-summary">
              <div><dt>क्लीनिक</dt><dd>{done.clinicName}</dd></div>
              <div><dt>तारीख़</dt><dd>{niceDate(done.date)}</dd></div>
              <div><dt>समय</dt><dd>{done.timeLabel}</dd></div>
              <div><dt>मरीज़</dt><dd>{form.name}</dd></div>
            </dl>
            <ul className="book-tips">
              <li>सुबह <strong>खाली पेट</strong> आएँ — नाड़ी परीक्षा के लिए यह ज़रूरी है।</li>
              <li>तय समय से 10 मिनट पहले पहुँचें, पुरानी रिपोर्ट व दवाइयाँ साथ लाएँ।</li>
              <li>न आ पाएँ तो क्लीनिक पर कॉल करके बता दें।</li>
            </ul>
            <div className="clinic-actions">
              <a
                className="clinic-btn clinic-btn-wa"
                href={`https://wa.me/91${done.clinicPhone}?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp पर पुष्टि भेजें
              </a>
              <a className="clinic-btn clinic-btn-call" href={`tel:+91${done.clinicPhone}`}>
                कॉल करें
              </a>
            </div>
            <p className="book-note">
              <Link to="/">← मुख्य पृष्ठ</Link>
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="clinic-page">
      <section className="clinic-hero">
        <div className="container">
          <p className="clinic-eyebrow">Online Appointment • ऑनलाइन अपॉइंटमेंट</p>
          <h1>
            Book Nadi Pariksha
            <span>नाड़ी परीक्षा के लिए समय बुक करें</span>
          </h1>
          <p className="clinic-lead">
            OPD {OPD_TIME.labelHi} • करनाल हर महीने 1–10 तारीख़ • वृंदावन 11 तारीख़ से महीने के अंत तक
          </p>
        </div>
      </section>

      <section className="container book-wrap">
        <form className="book-card" onSubmit={submit} noValidate>
          {/* 1. CLINIC */}
          <fieldset className="book-step">
            <legend><span className="book-num">1</span> क्लीनिक चुनें</legend>
            <div className="book-clinics">
              {clinics.map((c) => {
                const k = KEY[c.slug];
                return (
                  <button
                    type="button"
                    key={k}
                    className={`book-clinic${clinicKey === k ? " is-on" : ""}`}
                    aria-pressed={clinicKey === k}
                    onClick={() => setClinicKey(k)}
                  >
                    <strong>{c.cityHi} • {c.city}</strong>
                    <span>{c.name}</span>
                    <small>{c.opdDaysHi}</small>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 2. DATE */}
          {clinicKey && (
            <fieldset className="book-step">
              <legend><span className="book-num">2</span> तारीख़ चुनें</legend>
              {dates.length === 0 ? (
                <p className="book-muted">अगले 30 दिनों में इस क्लीनिक की कोई तारीख़ नहीं है।</p>
              ) : (
                <div className="book-dates" role="list">
                  {dates.map((d) => {
                    const v = ymd(d);
                    return (
                      <button
                        type="button"
                        role="listitem"
                        key={v}
                        className={`book-date${date === v ? " is-on" : ""}`}
                        aria-pressed={date === v}
                        onClick={() => setDate(v)}
                      >
                        <small>{WEEKDAYS[d.getDay()]}</small>
                        <strong>{d.getDate()}</strong>
                        <small>{MONTHS[d.getMonth()]}</small>
                      </button>
                    );
                  })}
                </div>
              )}
            </fieldset>
          )}

          {/* 3. TIME */}
          {clinicKey && date && (
            <fieldset className="book-step">
              <legend><span className="book-num">3</span> समय चुनें</legend>
              {slotState === "loading" && <p className="book-muted">समय देखे जा रहे हैं…</p>}
              {slotState === "error" && (
                <p className="book-error">
                  समय लोड नहीं हो पाए। कृपया page refresh करें या {clinic?.phone} पर कॉल करें।
                  {slotErr && <small className="book-errcode"> ({slotErr})</small>}
                </p>
              )}
              {slotState === "ready" && freeCount === 0 && (
                <p className="book-muted">इस दिन सभी समय भर चुके हैं — कृपया दूसरी तारीख़ चुनें।</p>
              )}
              {slotState === "ready" && freeCount > 0 && (
                <div className="book-slots">
                  {slots.map((s) => (
                    <button
                      type="button"
                      key={s.time}
                      disabled={!s.available}
                      className={`book-slot${time === s.time ? " is-on" : ""}`}
                      aria-pressed={time === s.time}
                      onClick={() => setTime(s.time)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {/* 4. DETAILS */}
          {time && (
            <fieldset className="book-step">
              <legend><span className="book-num">4</span> मरीज़ की जानकारी</legend>
              <div className="book-grid">
                <label className="book-field book-span2">
                  <span>पूरा नाम *</span>
                  <input required value={form.name} onChange={set("name")} autoComplete="name" />
                </label>
                <label className="book-field">
                  <span>मोबाइल नंबर *</span>
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10 अंक"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </label>
                <label className="book-field">
                  <span>उम्र</span>
                  <input inputMode="numeric" value={form.age} onChange={set("age")} />
                </label>
                <label className="book-field">
                  <span>लिंग</span>
                  <select value={form.gender} onChange={set("gender")}>
                    <option value="">चुनें</option>
                    <option value="male">पुरुष</option>
                    <option value="female">महिला</option>
                    <option value="other">अन्य</option>
                  </select>
                </label>
                <label className="book-field">
                  <span>शहर</span>
                  <input value={form.city} onChange={set("city")} autoComplete="address-level2" />
                </label>
                <label className="book-field book-span2">
                  <span>मुख्य तकलीफ़ (वैकल्पिक)</span>
                  <textarea rows={3} value={form.problem} onChange={set("problem")} />
                </label>
                <label className="book-hp" aria-hidden="true">
                  Website
                  <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </label>
              </div>

              <div className="book-review">
                <strong>{clinic?.name}</strong> • {niceDate(date)} •{" "}
                {slots.find((s) => s.time === time)?.label}
              </div>

              {error && <p className="book-error" role="alert">{error}</p>}

              <button className="clinic-btn clinic-btn-call book-submit" type="submit" disabled={submitting}>
                {submitting ? "बुक हो रहा है…" : "अपॉइंटमेंट पक्का करें"}
              </button>
              <p className="book-muted">
                नाड़ी परीक्षा के लिए सुबह खाली पेट आएँ। आपकी जानकारी केवल अपॉइंटमेंट के लिए उपयोग होगी।
              </p>
            </fieldset>
          )}
        </form>
      </section>
    </div>
  );
}
