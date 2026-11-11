// src/pages/BlogPost.jsx — /blog/:slug : एक स्वास्थ्य लेख

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SEO from "../components/SEO.jsx";
import { categoryOf, hindiDate } from "../data/blogCategories.js";
import { BlogGrid } from "../components/BlogCards.jsx";
import { todaysClinic, whatsappLink } from "../data/clinics.js";
import "./clinic.css";
import "./blog.css";

// पुरानी साइट (Gurukul) के /blog/... लेख अब nadivaidya.com पर हैं
const OLD_BLOG_URL = "https://nadivaidya.com/blogs/news-blogs";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [state, setState] = useState("loading"); // loading | ok | missing | error

  useEffect(() => {
    let alive = true;
    setState("loading");
    axios
      .get("/api/clinic-blogs/get.php", { params: { slug } })
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
  }, [slug]);

  // यह लेख यहाँ नहीं है → शायद पुरानी साइट का लेख है
  useEffect(() => {
    if (state === "missing") window.location.replace(OLD_BLOG_URL);
  }, [state]);

  if (state !== "ok") {
    return (
      <div className="blog-page">
        <SEO title="स्वास्थ्य लेख | Nadi Vaidya Clinic" path={`/blog/${slug}`} noIndex />
        <div className="container blog-wrap">
          <p className="blog-note">
            {state === "loading" && "लेख लोड हो रहा है…"}
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

  const cat = categoryOf(post.category);
  const clinic = todaysClinic();
  const pageUrl = `https://nadivaidya.in/blog/${post.slug}`;
  const shareText = `${post.title}\n${pageUrl}`;

  return (
    <div className="blog-page">
      <SEO
        title={`${post.title_en || post.title} | Nadi Vaidya Clinic`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image ? `https://nadivaidya.in${post.image}` : undefined}
        type="article"
        publishedTime={post.created_at ? post.created_at.replace(" ", "T") + "+05:30" : undefined}
        modifiedTime={post.updated_at ? post.updated_at.replace(" ", "T") + "+05:30" : undefined}
        section={cat?.en}
      />

      <article className="container blog-article">
        <nav className="blog-crumb">
          <Link to="/">होम</Link> › <Link to="/blog">स्वास्थ्य लेख</Link>
          {cat && (
            <>
              {" "}› <Link to={`/blog?rog=${cat.key}`}>{cat.hi}</Link>
            </>
          )}
        </nav>

        <header className="blog-head">
          {cat && <span className="blog-chip">{cat.hi}</span>}
          <h1>{post.title}</h1>
          {post.title_en && <p className="blog-head-en">{post.title_en}</p>}
          <p className="blog-meta">
            {hindiDate(post.created_at)}
            {post.author ? ` • ${post.author}` : ""}
          </p>
        </header>

        {post.image && (
          <div className="blog-cover">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <p className="blog-disclaimer">
          यह लेख केवल सामान्य जानकारी के लिए है। कोई भी दवा या उपचार शुरू करने से पहले वैद्य से परामर्श अवश्य लें।
        </p>

        <div className="blog-cta">
          <div>
            <h2>इस समस्या के लिए नाड़ी परीक्षा परामर्श</h2>
            <p>करनाल (1–10 तारीख़) व वृंदावन (11–31 तारीख़) • सुबह 8 से दोपहर 1 बजे तक</p>
          </div>
          <div className="blog-cta-btns">
            <Link className="clinic-btn clinic-btn-book" to="/appointment">
              📅 अपॉइंटमेंट बुक करें
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
          यह लेख WhatsApp पर भेजें
        </a>
      </article>

      {related.length > 0 && (
        <section className="container blog-related">
          <h2>और लेख पढ़ें</h2>
          <BlogGrid posts={related} />
        </section>
      )}
    </div>
  );
}
