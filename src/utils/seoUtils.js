// src/utils/seoUtils.js

import seoConfig from "../config/seoConfig.js";

/* =========================================
   URL HELPERS
========================================= */

export const getBaseUrl = () => {
  return seoConfig.siteUrl.replace(/\/+$/, "");
};

export const getAbsoluteUrl = (path = "/") => {
  if (!path) {
    return `${getBaseUrl()}/`;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${getBaseUrl()}${normalizedPath}`;
};

export const getCanonicalUrl = (path = "/") => {
  const normalizedPath =
    path === "/" ? "/" : path.replace(/\/+$/, "");

  return getAbsoluteUrl(normalizedPath);
};

/* =========================================
   ORGANIZATION SCHEMA
========================================= */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: seoConfig.organization?.name || seoConfig.siteName,

  alternateName:
    seoConfig.organization?.alternateName || seoConfig.siteName,

  url: `${getBaseUrl()}/`,

  logo: getAbsoluteUrl(seoConfig.logo),

  description: seoConfig.defaultDescription,

  email: seoConfig.organization?.email,

  telephone: seoConfig.organization?.phone,

  sameAs: seoConfig.socialLinks || [],

  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: seoConfig.organization?.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

/* =========================================
   WEBSITE SCHEMA
========================================= */

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: seoConfig.siteName,

  alternateName: seoConfig.organization?.alternateName,

  url: `${getBaseUrl()}/`,

  description: seoConfig.defaultDescription,

  inLanguage: seoConfig.language || "en",

  publisher: {
    "@type": "Organization",
    name: seoConfig.organization?.name || seoConfig.siteName,
    url: `${getBaseUrl()}/`,
  },
};

/* =========================================
   LOCAL BUSINESS SCHEMA
   Use only if the organization has a real,
   publicly accessible business location.
========================================= */

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",

  name: "AyurVaidya Wellness",

  url: `${getBaseUrl()}/`,

  description:
    "Ayurveda education and wellness services offered by Nadi Vaidya.",

  telephone: "+91 99922 42267",

  address: {
    "@type": "PostalAddress",
    addressLocality:
      seoConfig.organization?.address?.city || "Karnal",
    addressRegion:
      seoConfig.organization?.address?.state || "Haryana",
    addressCountry:
      seoConfig.organization?.address?.country || "India",
  },
};

/* =========================================
   BREADCRUMB SCHEMA
========================================= */

export const createBreadcrumbSchema = (items = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
};

/* =========================================
   ARTICLE SCHEMA
========================================= */

export const createArticleSchema = ({
  title,
  description,
  path,
  image = seoConfig.defaultImage,
  author = seoConfig.siteName,
  publishedTime,
  modifiedTime,
}) => {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: title,

    description,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(path),
    },

    url: getCanonicalUrl(path),

    image: getAbsoluteUrl(image),

    author: {
      "@type": "Organization",
      name: author,
    },

    publisher: {
      "@type": "Organization",
      name: seoConfig.organization?.name || seoConfig.siteName,
      url: `${getBaseUrl()}/`,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl(seoConfig.logo),
      },
    },
  };

  if (publishedTime) {
    article.datePublished = publishedTime;
  }

  if (modifiedTime) {
    article.dateModified = modifiedTime;
  }

  return article;
};

/* =========================================
   WEB PAGE SCHEMA
========================================= */

export const createWebPageSchema = ({
  title,
  description,
  path = "/",
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: title,

    description,

    url: getCanonicalUrl(path),

    isPartOf: {
      "@type": "WebSite",
      name: seoConfig.siteName,
      url: `${getBaseUrl()}/`,
    },

    inLanguage: seoConfig.language || "en",
  };
};

/* =========================================
   FAQ SCHEMA
========================================= */

export const createFAQSchema = (questions = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,

      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

/* =========================================
   VALIDATE SCHEMA
========================================= */

export const validateSchema = (schema) => {
  if (!schema || typeof schema !== "object") {
    return false;
  }

  if (Array.isArray(schema)) {
    return schema.every(validateSchema);
  }

  return (
    schema["@context"] === "https://schema.org" &&
    typeof schema["@type"] === "string"
  );
};

/* =========================================
   EXPORT DEFAULT SEO UTILITIES
========================================= */

const seoUtils = {
  getBaseUrl,
  getAbsoluteUrl,
  getCanonicalUrl,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  createBreadcrumbSchema,
  createArticleSchema,
  createWebPageSchema,
  createFAQSchema,
  validateSchema,
};

export default seoUtils;