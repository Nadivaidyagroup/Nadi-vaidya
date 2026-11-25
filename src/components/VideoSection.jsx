// src/components/VideoSection.jsx — Home page: नाड़ी वैद्य के वीडियो

import { Link } from "react-router-dom";
import { VIDEOS, videoEmbedUrl } from "../data/videos.js";
import "./videoSection.css";

export default function VideoSection() {
  if (!VIDEOS.length) return null;
  const [main, ...rest] = VIDEOS;

  const Card = ({ v, big }) => (
    <figure className={`vid-card ${big ? "vid-big" : ""}`}>
      <div className="vid-frame">
        <iframe
          src={videoEmbedUrl(v)}
          title={v.titleHi}
          loading="lazy"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      <figcaption>
        <strong>{v.titleHi}</strong>
        {v.titleEn && <span>{v.titleEn}</span>}
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
              <Card v={v} key={v.driveId || v.youtubeId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
