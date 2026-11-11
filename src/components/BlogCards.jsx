// src/components/BlogCards.jsx
// ब्लॉग लेखों के कार्ड — ब्लॉग पेज, लेख के नीचे "और लेख", और होम पेज पर।

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { categoryOf, hindiDate } from "../data/blogCategories.js";
import "../pages/blog.css";

export function BlogCard({ post }) {
  const cat = categoryOf(post.category);
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-img">
        {post.image ? (
          <img src={post.image} alt={post.title} loading="lazy" />
        ) : (
          <div className="blog-card-noimg" aria-hidden="true">🌿</div>
        )}
      </div>
      <div className="blog-card-body">
        {cat && <span className="blog-chip">{cat.hi}</span>}
        <h3>{post.title}</h3>
        {post.title_en && <p className="blog-card-en">{post.title_en}</p>}
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
        <span className="blog-card-meta">
          {hindiDate(post.created_at)} • <span className="blog-read">पूरा पढ़ें →</span>
        </span>
      </div>
    </Link>
  );
}

export function BlogGrid({ posts }) {
  return (
    <div className="blog-grid">
      {posts.map((p) => (
        <BlogCard post={p} key={p.id} />
      ))}
    </div>
  );
}

// होम पेज: नए 3 लेख (कोई लेख न हो तो यह हिस्सा दिखता ही नहीं)
export function LatestArticles() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let alive = true;
    axios
      .get("/api/clinic-blogs/list.php", { params: { limit: 3 } })
      .then((r) => {
        if (alive && r.data?.success) setPosts(r.data.data || []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!posts.length) return null;

  return (
    <section className="home-blog">
      <div className="container">
        <h2 className="home-section-title">स्वास्थ्य लेख</h2>
        <p className="home-section-sub">
          रोगों पर नाड़ी वैद्य की सलाह • <Link to="/blog">सभी लेख देखें →</Link>
        </p>
        <BlogGrid posts={posts} />
      </div>
    </section>
  );
}
