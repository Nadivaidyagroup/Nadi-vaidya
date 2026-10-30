// src/hooks/useSEO.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  const normalizedPath = url.startsWith("/")
    ? url
    : `/${url}`;

  return `${getBaseUrl()}${normalizedPath}`;
};

/* =========================================
   META TAG HELPER
========================================= */

const updateMetaTag = ({
  name,
  property,
  content,
}) => {
  if (!content) return;

  let selector = name
    ? `meta[name="${name}"]`
    : `meta[property="${property}"]`;

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");

    if (name) {
      element.setAttribute("name", name);
    }

    if (property) {
      element.setAttribute("property", property);
    }

    document.head.appendChild(element);
  }

  element.setAttribute("content", String(content));
};

/* =========================================
   LINK TAG HELPER
========================================= */

const updateLinkTag = ({
  rel,
  href,
}) => {
  if (!href) return;

  let element = document.head.querySelector(
    `link[rel="${rel}"]`
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

/* =========================================
   SEO HOOK
========================================= */

export default function useSEO({
  title,
  description = seoConfig.defaultDescription,
  path,
  image = seoConfig.defaultImage,
  type = "website",
  noIndex = false,
  author = seoConfig.siteName,
  keywords = [],
  canonicalUrl,
  locale = seoConfig.locale || "en_IN",
  language = seoConfig.language || "en",
  siteName = seoConfig.siteName,
  twitterHandle = seoConfig.twitterHandle,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
} = {}) {
  const location = useLocation();

  const pathname = path ?? location.pathname;

  useEffect(() => {
    if (typeof document === "undefined") return;

    /* =========================================
       PAGE TITLE
    ========================================= */

    const pageTitle = title
      ? title.includes(siteName)
        ? title
        : `${title} | ${siteName}`
      : seoConfig.defaultTitle;

    document.title = pageTitle;

    /* =========================================
       DESCRIPTION & ROBOTS
    ========================================= */

    const metaDescription =
      description?.trim() ||
      seoConfig.defaultDescription;

    const robotsContent = noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    updateMetaTag({
      name: "description",
      content: metaDescription,
    });

    updateMetaTag({
      name: "robots",
      content: robotsContent,
    });

    updateMetaTag({
      name: "googlebot",
      content: robotsContent,
    });

    updateMetaTag({
      name: "author",
      content: author,
    });

    updateMetaTag({
      name: "theme-color",
      content: seoConfig.themeColor || "#ffffff",
    });

    updateMetaTag({
      name: "referrer",
      content: "strict-origin-when-cross-origin",
    });

    /* =========================================
       HTML LANGUAGE
    ========================================= */

    document.documentElement.lang = language;

    /* =========================================
       CANONICAL URL
    ========================================= */

    const normalizedPath =
      pathname === "/"
        ? "/"
        : pathname.replace(/\/+$/, "");

    const canonical =
      canonicalUrl ||
      getAbsoluteUrl(normalizedPath);

    updateLinkTag({
      rel: "canonical",
      href: canonical,
    });

    /* =========================================
       OPEN GRAPH
    ========================================= */

    const imageUrl = getAbsoluteUrl(image);

    updateMetaTag({
      property: "og:type",
      content: type,
    });

    updateMetaTag({
      property: "og:site_name",
      content: siteName,
    });

    updateMetaTag({
      property: "og:title",
      content: pageTitle,
    });

    updateMetaTag({
      property: "og:description",
      content: metaDescription,
    });

    updateMetaTag({
      property: "og:url",
      content: canonical,
    });

    updateMetaTag({
      property: "og:image",
      content: imageUrl,
    });

    updateMetaTag({
      property: "og:image:alt",
      content: `${siteName} - Ayurveda, Nadi Pariksha and Wellness`,
    });

    updateMetaTag({
      property: "og:locale",
      content: locale,
    });

    /* =========================================
       TWITTER / X
    ========================================= */

    updateMetaTag({
      name: "twitter:card",
      content: "summary_large_image",
    });

    updateMetaTag({
      name: "twitter:title",
      content: pageTitle,
    });

    updateMetaTag({
      name: "twitter:description",
      content: metaDescription,
    });

    updateMetaTag({
      name: "twitter:image",
      content: imageUrl,
    });

    if (twitterHandle) {
      updateMetaTag({
        name: "twitter:site",
        content: twitterHandle,
      });
    }

    /* =========================================
       KEYWORDS
       Optional; not a Google ranking factor.
    ========================================= */

    if (keywords.length > 0) {
      updateMetaTag({
        name: "keywords",
        content: keywords.join(", "),
      });
    }

    /* =========================================
       ARTICLE METADATA
    ========================================= */

    if (type === "article") {
      if (publishedTime) {
        updateMetaTag({
          property: "article:published_time",
          content: publishedTime,
        });
      }

      if (modifiedTime) {
        updateMetaTag({
          property: "article:modified_time",
          content: modifiedTime,
        });
      }

      if (author) {
        updateMetaTag({
          property: "article:author",
          content: author,
        });
      }

      if (section) {
        updateMetaTag({
          property: "article:section",
          content: section,
        });
      }

      tags.forEach((tag, index) => {
        updateMetaTag({
          property: `article:tag-${index}`,
          content: tag,
        });
      });
    }
  }, [
    title,
    description,
    pathname,
    image,
    type,
    noIndex,
    author,
    keywords,
    canonicalUrl,
    locale,
    language,
    siteName,
    twitterHandle,
    publishedTime,
    modifiedTime,
    section,
    tags,
  ]);
}