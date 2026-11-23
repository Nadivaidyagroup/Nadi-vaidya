// src/admin/pages/Stats.jsx — वेबसाइट पर कितने लोग आए (अपनी गिनती)

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./appointments.css";
import "./stats.css";

const SOURCE_HI = {
  direct: "सीधे (link / QR / bookmark)",
  google: "Google search",
  bing: "Bing search",
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  youtube: "YouTube",
  twitter: "X / Twitter",
  qr: "QR code",
  "nadivaidya.com": "Gurukul वेबसाइट",
};

const PAGE_HI = (p) => {
  if (p === "/") return "होम";
  if (p === "/appointment") return "अपॉइंटमेंट बुकिंग";
  if (p === "/karnal-clinic") return "करनाल क्लीनिक";
  if (p === "/vrindavan-clinic") return "वृंदावन क्लीनिक";
  if (p === "/about-us") return "About Us";
  if (p === "/contact-us") return "Contact";
  if (p === "/blog") return "स्वास्थ्य लेख (सूची)";
  if (p.startsWith("/blog/")) return "लेख: " + p.slice(6);
  return p;
};

const shortDay = (d) => {
  const [, m, day] = d.split("-");
  return `${Number(day)}/${Number(m)}`;
};

export default function Stats() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("");
    axios
      .get("/api/stats/admin-summary.php", { params: { days }, withCredentials: true })
      .then((r) => (r.data?.success ? setData(r.data) : setMsg(r.data?.message || "लोड नहीं हुआ")))
      .catch((e) => setMsg(e?.response?.status === 401 ? "Please log in again." : "Server error"));
  }, [days]);

  const daily = data?.daily || [];
  const max = Math.max(1, ...daily.map((d) => d.views));
  const today = daily[daily.length - 1];

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="appt-page">
          <div className="appt-top">
            <div>
              <h1>Visitors — वेबसाइट पर कितने लोग आए</h1>
              <p>अपनी गिनती • कोई नाम/फ़ोन/IP सेव नहीं होता • Google आदि के bots नहीं गिने जाते</p>
            </div>
            <div className="appt-quick">
              {[7, 30, 90, 365].map((d) => (
                <button key={d} type="button" onClick={() => setDays(d)} className={days === d ? "st-on" : ""}>
                  {d === 365 ? "1 साल" : `${d} दिन`}
                </button>
              ))}
            </div>
          </div>

          {msg && <div className="appt-msg">{msg}</div>}
          {!data && !msg && <p className="appt-empty">Loading…</p>}

          {data && (
            <>
              <div className="st-cards">
                <div><b>{data.totals.visitors}</b><span>अलग-अलग लोग</span></div>
                <div><b>{data.totals.visits}</b><span>बार साइट पर आए (visits)</span></div>
                <div><b>{data.totals.views}</b><span>पेज देखे गए</span></div>
                <div><b>{today?.visitors ?? 0}</b><span>आज के लोग</span></div>
              </div>

              <div className="st-box">
                <h2>रोज़ के पेज-व्यू</h2>
                <div className="st-chart">
                  {daily.map((d) => (
                    <div className="st-bar" key={d.day} title={`${d.day}: ${d.views} पेज • ${d.visitors} लोग`}>
                      <i style={{ height: `${(d.views / max) * 100}%` }} />
                      {daily.length <= 31 && <small>{shortDay(d.day)}</small>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="st-two">
                <div className="st-box">
                  <h2>लोग कहाँ से आए</h2>
                  {data.sources.length === 0 ? (
                    <p className="appt-empty">अभी कोई data नहीं</p>
                  ) : (
                    <table className="appt-table">
                      <tbody>
                        {data.sources.map((s) => (
                          <tr key={s.source}>
                            <td>{SOURCE_HI[s.source] || s.source}</td>
                            <td className="nowrap"><b>{s.visits}</b></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="st-box">
                  <h2>सबसे ज़्यादा देखे गए पेज</h2>
                  {data.pages.length === 0 ? (
                    <p className="appt-empty">अभी कोई data नहीं</p>
                  ) : (
                    <table className="appt-table">
                      <tbody>
                        {data.pages.map((p) => (
                          <tr key={p.path}>
                            <td>
                              <a href={p.path} target="_blank" rel="noopener noreferrer">{PAGE_HI(p.path)}</a>
                            </td>
                            <td className="nowrap"><b>{p.views}</b></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
