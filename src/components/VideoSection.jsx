// src/components/VideoSection.jsx — Home page: नाड़ी वैद्य के वीडियो

import { Link } from "react-router-dom";
import { VIDEOS } from "../data/videos.js";
import "./videoSection.css";

export default function VideoSection() {
  if (!VIDEOS.length) return null;
  const [main, ...rest] = VIDEOS;

  const Card = ({ v, big }) => (
    <figure className={`vid-card ${big ? "vid-big" : ""}`}>
      <div className="vid-frame">
        {v.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`}
            title={v.titleHi}
            loading="lazy"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={v.src} poster={v.poster} controls preload="none" playsInline controlsList="nodownload">
            आपका browser यह वीडियो नहीं चला पा रहा।
          </video>
        )}
      </div>
      <figcaption>
        <strong>{v.titleHi}</strong>
        {v.titleEn && <span>{v.titleEn}</span>}
        <small className="vid-note">दवा में कोई भी बदलाव केवल डॉक्टर/वैद्य की सलाह से करें।</small>
        {v.blogSlug && (
          <Link to={`/blog/${v.blogSlug}`} className="vid-read">
            📖 इस विषय पर पूरा लेख पढ़ें →
          </Link>
        )}
      </figcaption>
    </figure>
  );

  return (
    <section className="home-videos">
      <div className="container">
        <h2 className="home-section-title">📺 वीडियो</h2>
        <p className="home-section-sub">रोगों पर नाड़ी वैद्य की सलाह — देखें और परिवार के साथ साझा करें</p>
        <Card v={main} big />
        {rest.length > 0 && (
          <div className="vid-grid">
            {rest.map((v) => (
              <Card v={v} key={v.src || v.youtubeId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
