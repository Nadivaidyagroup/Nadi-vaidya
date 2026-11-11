// src/pages/Blog.jsx — /blog : स्वास्थ्य लेखों की सूची, रोग के अनुसार छाँटें

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BLOG_CATEGORIES } from "../data/blogCategories.js";
import { BlogGrid } from "../components/BlogCards.jsx";
import { BLOG_LANGS, saveLang, savedLang } from "../data/blogLanguages.js";
import "./clinic.css";
import "./blog.css";

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const active = params.get("rog") || "";
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState({});
  const [state, setState] = useState("loading"); // loading | ok | error
  const [lang, setLang] = useState(savedLang);

  useEffect(() => {
    let alive = true;
    setState("loading");
    axios
      .get("/api/clinic-blogs/list.php", { params: active ? { category: active, lang } : { lang } })
      .then((r) => {
        if (!alive) return;
        if (r.data?.success) {
          setPosts(r.data.data || []);
          if (!active) setCounts(r.data.categories || {});
          setState("ok");
        } else setState("error");
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, [active, lang]);

  // वही रोग-वर्ग दिखाओ जिन पर लेख हैं
  const cats = BLOG_CATEGORIES.filter((c) => counts[c.key] || c.key === active);

  const choose = (key) => {
    if (key) setParams({ rog: key });
    else setParams({});
  };

  return (
    <div className="blog-page">
      <section className="clinic-hero blog-hero">
        <div className="container">
          <p className="clinic-eyebrow">नाड़ी वैद्य क्लीनिक • करनाल व वृंदावन</p>
          <h1>
            स्वास्थ्य लेख
            <span>Health Blog — रोग, कारण और आयुर्वेदिक उपचार</span>
          </h1>
          <p className="clinic-lead">
            अलग-अलग रोगों पर नाड़ी वैद्य की सरल भाषा में जानकारी — रोग क्यों होता है, क्या खाएँ-क्या न खाएँ, और आयुर्वेद में उपचार।
          </p>
        </div>
      </section>

      <div className="container blog-wrap">
        <div className="blog-langs blog-langs-list-page">
          <span className="blog-langs-label">🌐 भाषा चुनें · Language</span>
          <div className="blog-langs-list">
            {BLOG_LANGS.map((l) => (
              <button
                type="button"
                key={l.code}
                lang={l.code}
                className={l.code === lang ? "on" : ""}
                onClick={() => {
                  setLang(l.code);
                  saveLang(l.code);
                }}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {cats.length > 0 && (
          <div className="blog-filter" role="tablist" aria-label="रोग के अनुसार लेख">
            <button type="button" className={!active ? "on" : ""} onClick={() => choose("")}>
              सभी लेख
            </button>
            {cats.map((c) => (
              <button
                type="button"
                key={c.key}
                className={active === c.key ? "on" : ""}
                onClick={() => choose(c.key)}
              >
                {c.hi}
              </button>
            ))}
          </div>
        )}

        {state === "loading" && <p className="blog-note">लेख लोड हो रहे हैं…</p>}
        {state === "error" && (
          <p className="blog-note">लेख अभी लोड नहीं हो पाए। कृपया थोड़ी देर बाद पेज फिर खोलें।</p>
        )}
        {state === "ok" && posts.length === 0 && (
          <p className="blog-note">जल्द ही यहाँ नए स्वास्थ्य लेख आएँगे।</p>
        )}
        {state === "ok" && posts.length > 0 && <BlogGrid posts={posts} />}
      </div>
    </div>
  );
}
