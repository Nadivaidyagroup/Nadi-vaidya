// src/pages/BlogPost.jsx — /blog/:slug (हिंदी) और /blog/:slug/:lang (अनुवाद)

import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import SEO from "../components/SEO.jsx";
import { categoryOf, hindiDate } from "../data/blogCategories.js";
import { BASE_LANG, BLOG_LANGS, blogText, isLang, langDate, langOf, postPath, saveLang } from "../data/blogLanguages.js";
import { BlogGrid } from "../components/BlogCards.jsx";
import { todaysClinic, whatsappLink } from "../data/clinics.js";
import "./clinic.css";
import "./blog.css";

// पुरानी साइट (Gurukul) के /blog/... लेख अब nadivaidya.com पर हैं
const OLD_BLOG_URL = "https://nadivaidya.com/blogs/news-blogs";
const SITE = "https://nadivaidya.in";

export default function BlogPost() {
  const { slug, lang: langParam } = useParams();
  const wanted = langParam || BASE_LANG;
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [state, setState] = useState("loading"); // loading | ok | missing | error

  useEffect(() => {
    if (!isLang(wanted)) return;
    let alive = true;
    setState((s) => (s === "ok" ? "ok" : "loading"));
    axios
      .get("/api/clinic-blogs/get.php", { params: { slug, lang: wanted } })
      .then((r) => {
        if (!alive) return;
        if (r.data?.success) {
          setPost(r.data.data);
          setRelated(r.data.related || []);
          setState("ok");
        } else setState("missing");
      })
      .catch((e) => alive && setState(e?.response?.status === 404 ? "missing" : "error"));
    return () => {
      alive = false;
    };
  }, [slug, wanted]);

  // यह लेख यहाँ नहीं है → शायद पुरानी साइट का लेख है
  useEffect(() => {
    if (state === "missing") window.location.replace(OLD_BLOG_URL);
  }, [state]);

  // गलत भाषा-कोड या /hi → साफ़ हिंदी link पर
  if (langParam && (!isLang(langParam) || langParam === BASE_LANG)) {
    return <Navigate to={`/blog/${slug}`} replace />;
  }

  if (state !== "ok" || !post) {
    return (
      <div className="blog-page">
        <SEO title="स्वास्थ्य लेख | Nadi Vaidya Clinic" path={`/blog/${slug}`} noIndex />
        <div className="container blog-wrap">
          <p className="blog-note">
            {state === "loading" && "…"}
            {state === "missing" && "यह लेख यहाँ नहीं मिला…"}
            {state === "error" && (
              <>
                लेख अभी लोड नहीं हो पाया। <Link to="/blog">सभी लेख देखें →</Link>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  const lang = post.lang || BASE_LANG; // जो भाषा सच में दिख रही है
  const t = blogText(lang);
  const L = langOf(lang);
  const langs = BLOG_LANGS.filter((l) => (post.langs || [BASE_LANG]).includes(l.code));
  const cat = categoryOf(post.category);
  const clinic = todaysClinic();
  const path = postPath(post.slug, lang);
  const shareText = `${post.title}\n${SITE}${path}`;
  const date = lang === BASE_LANG ? hindiDate(post.created_at) : langDate(post.created_at, lang);

  return (
    <div className="blog-page">
      <SEO
        title={`${lang === BASE_LANG ? post.title_en || post.title : post.title} | Nadi Vaidya Clinic`}
        description={post.excerpt}
        path={path}
        image={post.image ? `${SITE}${post.image}` : undefined}
        type="article"
        language={lang}
        locale={L.locale.replace("-", "_")}
        noIndex={lang !== wanted}
        publishedTime={post.created_at ? post.created_at.replace(" ", "T") + "+05:30" : undefined}
        modifiedTime={post.updated_at ? post.updated_at.replace(" ", "T") + "+05:30" : undefined}
        section={cat?.en}
      />
      <Helmet>
        {langs.length > 1 &&
          langs.map((l) => (
            <link rel="alternate" hrefLang={l.code} href={`${SITE}${postPath(post.slug, l.code)}`} key={l.code} />
          ))}
        {langs.length > 1 && <link rel="alternate" hrefLang="x-default" href={`${SITE}${postPath(post.slug, BASE_LANG)}`} />}
      </Helmet>

      <article className="container blog-article" lang={lang}>
        <nav className="blog-crumb">
          <Link to="/">{t.home}</Link> › <Link to="/blog">{t.blog}</Link>
          {cat && (
            <>
              {" "}› <Link to={`/blog?rog=${cat.key}`}>{lang === BASE_LANG ? cat.hi : cat.en}</Link>
            </>
          )}
        </nav>

        {langs.length > 1 && (
          <div className="blog-langs" role="navigation" aria-label={t.chooseLang}>
            <span className="blog-langs-label">🌐 {t.chooseLang}</span>
            <div className="blog-langs-list">
              {langs.map((l) => (
                <Link
                  key={l.code}
                  to={postPath(post.slug, l.code)}
                  lang={l.code}
                  className={l.code === lang ? "on" : ""}
                  aria-current={l.code === lang ? "page" : undefined}
                  onClick={() => saveLang(l.code)}
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <header className="blog-head">
          {cat && <span className="blog-chip">{lang === BASE_LANG ? cat.hi : cat.en}</span>}
          <h1>{post.title}</h1>
          {lang === BASE_LANG && post.title_en && <p className="blog-head-en">{post.title_en}</p>}
          <p className="blog-meta">
            {date}
            {lang === BASE_LANG && post.author ? ` • ${post.author}` : ""}
          </p>
        </header>

        {post.image && (
          <div className="blog-cover">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        {t.translated && <p className="blog-translated">{t.translated}</p>}

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <p className="blog-disclaimer">{t.disclaimer}</p>

        <div className="blog-cta">
          <div>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <div className="blog-cta-btns">
            <Link className="clinic-btn clinic-btn-book" to="/appointment">
              {t.book}
            </Link>
            <a
              className="clinic-btn clinic-btn-wa"
              href={whatsappLink(clinic.phone, `${clinic.city} clinic`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <a
          className="blog-share"
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.share}
        </a>
      </article>

      {related.length > 0 && (
        <section className="container blog-related">
          <h2>{t.more}</h2>
          <BlogGrid posts={related} />
        </section>
      )}
    </div>
  );
}
