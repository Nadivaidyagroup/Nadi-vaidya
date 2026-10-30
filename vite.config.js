
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";
import path from "node:path";

/* =====================================================
   SITE CONFIGURATION
===================================================== */

const SITE_URL = "https://nadivaidya.in";
const SITE_HOST = new URL(SITE_URL).host;

// Optional: configure this environment variable if your
// backend provides an API returning published blog posts.
// Example: BLOG_SITEMAP_API=https://api.example.com/blogs
const BLOG_API_URL = process.env.BLOG_SITEMAP_API || "";

const MAIN_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about-us", priority: "0.8", changefreq: "monthly" },
  { path: "/gallery", priority: "0.7", changefreq: "monthly" },
  { path: "/dosha-quiz", priority: "0.8", changefreq: "monthly" },
  { path: "/news-blogs", priority: "0.9", changefreq: "weekly" },
  { path: "/contact-us", priority: "0.8", changefreq: "monthly" },
  { path: "/workshop-schedule", priority: "0.7", changefreq: "monthly" },
  { path: "/nadi-pariksha-form", priority: "0.7", changefreq: "monthly" },
  { path: "/vata-diet", priority: "0.7", changefreq: "monthly" },
  { path: "/pitta-diet", priority: "0.7", changefreq: "monthly" },
  { path: "/kapha-diet", priority: "0.7", changefreq: "monthly" },
  { path: "/heal-india", priority: "0.7", changefreq: "monthly" },
];

/* =====================================================
   HELPERS
===================================================== */

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeSitePath(value) {
  try {
    const url = new URL(value, `${SITE_URL}/`);

    // Only include URLs belonging to the canonical site.
    if (url.hostname !== SITE_HOST) return null;
    if (url.protocol !== "https:") return null;

    // Do not include query strings or URL fragments.
    let pathname = url.pathname;

    if (pathname.length > 1) {
      pathname = pathname.replace(/\/+$/, "");
    }

    return pathname;
  } catch {
    return null;
  }
}

function isIndexableBlogPath(urlPath) {
  return (
    typeof urlPath === "string" &&
    urlPath.startsWith("/blog/") &&
    urlPath.length > "/blog/".length
  );
}

function getBlogSlug(post) {
  if (!post || typeof post !== "object") return null;

  // Prefer explicit public URL or slug fields from the API.
  const value =
    post.canonicalUrl ||
    post.canonical_url ||
    post.permalink ||
    post.url ||
    post.slug ||
    post.post_name ||
    post.link;

  if (typeof value !== "string" || !value.trim()) return null;

  return value.trim();
}

function extractPostsFromApiResponse(response) {
  if (Array.isArray(response)) return response;

  if (!response || typeof response !== "object") return [];

  const candidates = [
    response.posts,
    response.blogs,
    response.data,
    response.results,
    response.items,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;

    if (candidate && typeof candidate === "object") {
      for (const key of ["posts", "blogs", "items", "results"]) {
        if (Array.isArray(candidate[key])) return candidate[key];
      }
    }
  }

  return [];
}

function isPublishedPost(post) {
  if (!post || typeof post !== "object") return false;

  // If the API exposes a status, include published posts only.
  const status = String(post.status || "").toLowerCase();

  if (status && !["publish", "published", "public"].includes(status)) {
    return false;
  }

  if (
    post.published === false ||
    post.isPublished === false ||
    post.is_published === false
  ) {
    return false;
  }

  return true;
}

/* =====================================================
   AUTOMATIC BLOG URL DISCOVERY
===================================================== */

async function readExistingSitemap(root) {
  const candidates = [
    path.join(root, "public", "sitemap.xml"),
    path.join(root, "sitemap.xml"),
  ];

  for (const filePath of candidates) {
    try {
      const xml = await fs.readFile(filePath, "utf8");
      const urls = [];

      for (const match of xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)) {
        const rawUrl = match[1]
          .trim()
          .replace(/&amp;/g, "&");

        const urlPath = normalizeSitePath(rawUrl);

        if (isIndexableBlogPath(urlPath)) {
          urls.push(urlPath);
        }
      }

      if (urls.length) {
        console.log(
          `[SEO] Read ${urls.length} blog URLs from ${path.relative(root, filePath)}`
        );
      }

      return urls;
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.warn(
          `[SEO] Could not read ${filePath}: ${error.message}`
        );
      }
    }
  }

  return [];
}

async function readPrerenderedBlogFiles(root) {
  const directories = [
    path.join(root, "_pre", "blog"),
    path.join(root, "public", "_pre", "blog"),
    path.join(root, "public", "blog"),
  ];

  const urls = [];

  for (const directory of directories) {
    let entries;

    try {
      entries = await fs.readdir(directory, {
        withFileTypes: true,
      });
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.warn(
          `[SEO] Could not scan ${directory}: ${error.message}`
        );
      }

      continue;
    }

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".html")) {
        continue;
      }

      const filename = entry.name.slice(0, -5);

      // Files such as h-94d7db6fdc7f.html are hashed Hindi
      // prerender files. Their public slugs cannot be derived
      // from the filenames, so read them from the existing
      // sitemap or blog API instead.
      if (/^h-[a-f0-9]+$/i.test(filename)) {
        continue;
      }

      // Only discover English-style slug filenames.
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(filename)) {
        continue;
      }

      urls.push(`/blog/${filename}`);
    }
  }

  if (urls.length) {
    console.log(`[SEO] Discovered ${urls.length} blog HTML files`);
  }

  return urls;
}

async function readBlogUrlsFromApi() {
  if (!BLOG_API_URL) return [];

  try {
    const response = await fetch(BLOG_API_URL, {
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`API returned HTTP ${response.status}`);
    }

    const json = await response.json();
    const posts = extractPostsFromApiResponse(json);
    const urls = [];

    for (const post of posts) {
      if (!isPublishedPost(post)) continue;

      const value = getBlogSlug(post);
      if (!value) continue;

      // Full URLs are accepted only for the canonical domain.
      // Relative slugs are converted to /blog/<slug>.
      let candidate;

      if (/^https?:\/\//i.test(value)) {
        candidate = value;
      } else if (value.startsWith("/")) {
        candidate = value;
      } else {
        candidate = `/blog/${value.replace(/^\/+/, "")}`;
      }

      const urlPath = normalizeSitePath(candidate);

      if (isIndexableBlogPath(urlPath)) {
        urls.push(urlPath);
      }
    }

    console.log(`[SEO] Discovered ${urls.length} blog URLs from API`);

    return urls;
  } catch (error) {
    // Do not silently publish an incomplete sitemap when an
    // explicitly configured API fails.
    throw new Error(
      `[SEO] Blog API failed. Sitemap build stopped: ${error.message}`
    );
  }
}

async function discoverBlogUrls(root) {
  const [sitemapUrls, prerenderedUrls, apiUrls] = await Promise.all([
    readExistingSitemap(root),
    readPrerenderedBlogFiles(root),
    readBlogUrlsFromApi(),
  ]);

  return [
    ...new Set([
      ...sitemapUrls,
      ...prerenderedUrls,
      ...apiUrls,
    ]),
  ].sort();
}

/* =====================================================
   SEO FILE GENERATION
===================================================== */

function generateSEOFiles() {
  let projectRoot;

  return {
    name: "generate-seo-files",
    apply: "build",

    configResolved(config) {
      projectRoot = config.root;
    },

    async generateBundle() {
      const blogUrls = await discoverBlogUrls(projectRoot);

      const allRoutes = [
        ...MAIN_ROUTES.map((route) => ({
          ...route,
          path: normalizeSitePath(route.path),
        })),

        ...blogUrls.map((blogPath) => ({
          path: blogPath,
          priority: "0.6",
          changefreq: "monthly",
        })),
      ];

      // Remove duplicates and any invalid paths.
      const uniqueRoutes = [
        ...new Map(
          allRoutes
            .filter((route) => route.path)
            .map((route) => [route.path, route])
        ).values(),
      ];

      /* ---------------- ROBOTS.TXT ---------------- */

      const robotsTxt = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /_pre/

Sitemap: ${SITE_URL}/sitemap.xml
`;

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robotsTxt,
      });

      /* ---------------- SITEMAP.XML ---------------- */

      const sitemapEntries = uniqueRoutes
        .map(({ path: routePath, priority, changefreq }) => {
          const loc = escapeXml(`${SITE_URL}${routePath}`);

          return `  <url>
    <loc>${loc}</loc>
    <changefreq>${escapeXml(changefreq)}</changefreq>
    <priority>${escapeXml(priority)}</priority>
  </url>`;
        })
        .join("\n");

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemapXml,
      });

      /* ---------------- SITE.WEBMANIFEST ---------------- */

      const manifest = {
        id: "/",
        name: "Nadi Vaidya Gurukul",
        short_name: "Nadi Vaidya",
        description:
          "Ayurveda education, Nadi Pariksha, wellness awareness and holistic health initiatives.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        lang: "en-IN",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "any",
            type: "image/x-icon",
          },
        ],
      };

      this.emitFile({
        type: "asset",
        fileName: "site.webmanifest",
        source: JSON.stringify(manifest, null, 2),
      });

      console.log(
        `[SEO] Generated sitemap.xml with ${uniqueRoutes.length} URLs ` +
        `(${blogUrls.length} blog URLs)`
      );
    },
  };
}

/* =====================================================
   APACHE .HTACCESS GENERATION
===================================================== */

function generateHtaccess() {
  return {
    name: "generate-htaccess",
    apply: "build",

    generateBundle() {
      const htaccess = String.raw`# =====================================================
# NADI VAIDYA - APACHE CONFIGURATION
# Canonical domain: https://nadivaidya.in
# =====================================================

Options -Indexes -MultiViews
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect www to the canonical non-www domain.
  RewriteCond %{HTTP_HOST} ^www\.nadivaidya\.in$ [NC]
  RewriteRule ^ https://nadivaidya.in%{REQUEST_URI} [R=301,L,NE]

  # Redirect HTTP to HTTPS.
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !https [NC]
  RewriteRule ^ https://nadivaidya.in%{REQUEST_URI} [R=301,L,NE]

  # Serve existing files and directories normally.
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Serve prerendered English blog pages when present.
  RewriteCond %{DOCUMENT_ROOT}/_pre/blog/$1.html -f
  RewriteRule ^blog/([a-z0-9-]+)/?$ _pre/blog/$1.html [L]

  # Serve prerendered main pages when present.
  RewriteCond %{DOCUMENT_ROOT}/_pre/$1.html -f
  RewriteRule ^([a-z0-9-]+)/?$ _pre/$1.html [L]

  # React Router fallback.
  RewriteRule ^ index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"

  # Cache static assets.
  <FilesMatch "\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Do not cache HTML for long periods.
  <FilesMatch "^(index\.html|app\.html)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 month"
</IfModule>

AddDefaultCharset UTF-8
`;

      this.emitFile({
        type: "asset",
        fileName: ".htaccess",
        source: htaccess,
      });
    },
  };
}

/* =====================================================
   VITE CONFIGURATION
===================================================== */

export default defineConfig({
  // robots.txt, sitemap.xml, site.webmanifest और .htaccess अब
  // public/ फ़ोल्डर में सीधे रखे हैं (क्लीनिक साइट के हिसाब से)।
  plugins: [react()],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
