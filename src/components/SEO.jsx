// src/components/SEO.jsx

import { Helmet } from "react-helmet-async";
import seoConfig from "../config/seoConfig.js";

/* =========================================
   SEO URL HELPERS
========================================= */

const getBaseUrl = () => {
  return seoConfig.siteUrl.replace(/\/+$/, "");
};

const getAbsoluteUrl = (url = "/") => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;

  return `${getBaseUrl()}${normalizedPath}`;
};

/* =========================================
   SEO COMPONENT
========================================= */

export default function SEO({
  title,
  description = seoConfig.defaultDescription,
  path = "/",
  image = seoConfig.defaultImage,
  type = "website",
  noIndex = false,
  author = seoConfig.siteName,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  language = seoConfig.language || "en",
  locale = seoConfig.locale || "en_IN",
  siteName = seoConfig.siteName,
  canonicalUrl,
}) {
  /* =========================================
     PAGE TITLE
  ========================================= */

  const pageTitle = title
    ? title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    : seoConfig.defaultTitle;

  /* =========================================
     META DESCRIPTION
  ========================================= */

  const metaDescription =
    description?.trim() || seoConfig.defaultDescription;

  /* =========================================
     CANONICAL URL
  ========================================= */

  const canonical = canonicalUrl || getAbsoluteUrl(path);

  /* =========================================
     SOCIAL IMAGE
  ========================================= */

  const imageUrl = getAbsoluteUrl(image);

  /* =========================================
     ROBOTS DIRECTIVES
  ========================================= */

  const robotsContent = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  /* =========================================
     PAGE METADATA
  ========================================= */

  return (
    <Helmet prioritizeSeoTags>
      {/* DOCUMENT LANGUAGE */}
      <html lang={language} />

      {/* BASIC SEO */}
      <title>{pageTitle}</title>

      <meta
        name="description"
        content={metaDescription}
      />

      <meta
        name="robots"
        content={robotsContent}
      />

      <meta
        name="googlebot"
        content={robotsContent}
      />

      <meta
        name="author"
        content={author}
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <meta
        name="theme-color"
        content={seoConfig.themeColor || "#ffffff"}
      />

      <meta
        name="referrer"
        content="strict-origin-when-cross-origin"
      />

      {/* CANONICAL URL */}
      <link
        rel="canonical"
        href={canonical}
      />

      {/* FAVICON */}
      <link
        rel="icon"
        href="/favicon.ico"
      />

      <link
        rel="manifest"
        href="/site.webmanifest"
      />

      {/* OPEN GRAPH */}
      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:site_name"
        content={siteName}
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={metaDescription}
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:image:alt"
        content={`${siteName} - Ayurveda, Nadi Pariksha and Wellness`}
      />

      <meta
        property="og:locale"
        content={locale}
      />

      {/* TWITTER / X CARDS */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={pageTitle}
      />

      <meta
        name="twitter:description"
        content={metaDescription}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />

      {seoConfig.twitterHandle && (
        <meta
          name="twitter:site"
          content={seoConfig.twitterHandle}
        />
      )}

      {/* ARTICLE METADATA */}
      {type === "article" && publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}

      {type === "article" && modifiedTime && (
        <meta
          property="article:modified_time"
          content={modifiedTime}
        />
      )}

      {type === "article" && author && (
        <meta
          property="article:author"
          content={author}
        />
      )}

      {type === "article" && section && (
        <meta
          property="article:section"
          content={section}
        />
      )}

      {type === "article" &&
        tags.map((tag) => (
          <meta
            key={tag}
            property="article:tag"
            content={tag}
          />
        ))}
    </Helmet>
  );
}