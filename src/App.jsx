
/* src/App.jsx */

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./components/Layout.jsx";

import SEO from "./components/SEO.jsx";
import StructuredData from "./components/StructuredData.jsx";

import seoConfig from "./config/seoConfig.js";

import {
  organizationSchema,
  websiteSchema,
  allClinicSchemas,
} from "./utils/seoUtils.js";

/* ADMIN */
import AdminRoutes from "./admin/AdminRoutes";

/* MAIN PAGES */
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import DoshaQuiz from "./pages/DoshaQuiz.jsx";
import ContactUs from "./pages/ContactUs.jsx";

/* CLINICS */
import ClinicPage from "./pages/ClinicPage.jsx";

/* DOSHA DIET PAGES */
import VataDiet from "./pages/VataDiet.jsx";
import PittaDiet from "./pages/PittaDiet.jsx";
import KaphaDiet from "./pages/KaphaDiet.jsx";

/* HEAL INDIA */
import HealIndia from "./pages/HealIndia.jsx";

/* =====================================================
   CANONICAL WEBSITE CONFIGURATION
===================================================== */

const SITE_URL = "https://nadivaidya.in";

const GURUKUL_URLS = {
  freeWorkshop:
    "https://nadivaidya.com/pages/nadi-pariksha-course",

  workshopProduct:
    "https://nadivaidya.com/products/advanced-nadi-pariksha-workshop",

  newsBlogs:
    "https://nadivaidya.com/blogs/news-blogs",

  gallery:
    "https://nadivaidya.com/pages/gallery",

  team:
    "https://nadivaidya.com/pages/about-us#team",
};

/* =====================================================
   PAGE SEO CONFIGURATION
===================================================== */

const PAGE_SEO = {
  "/": {
    title: "Nadi Vaidya Clinic | Nadi Pariksha in Karnal & Vrindavan",
    description:
      "Nadi Vaidya clinics in Karnal and Vrindavan — traditional Nadi Pariksha and Ayurveda consultation with the Nadi Vaidya family. OPD 8 AM–1 PM. Book on WhatsApp or call.",
  },

  "/karnal-clinic": {
    title: "Nadi Vaidya Clinic Karnal | AyurVaidya Wellness",
    description:
      "AyurVaidya Wellness, R.K. Puram, Karnal — Nadi Pariksha and Ayurveda consultation. OPD 8 AM–1 PM; Nadi Vaidya OPD 1st–10th of every month. Call 99922 42267.",
  },

  "/vrindavan-clinic": {
    title: "Nadi Vaidya Clinic Vrindavan | Swasthya Seva Kendra",
    description:
      "Vrindavan Swasthya Seva Kendra, Parikrama Marg, Vrindavan — Nadi Pariksha and Ayurveda consultation. OPD 8 AM–1 PM; Nadi Vaidya OPD 11th to month-end. Call 83960 66555.",
  },

  "/about-us": {
    title: "About Us | Nadi Vaidya Clinics",
    description:
      "Meet the Nadi Vaidya family — Nadi Vaidya Dr. Ajit Singh Yadav and team, with 36+ years of clinical experience in traditional Nadi Pariksha.",
  },

  "/dosha-quiz": {
    title: "Ayurveda Dosha Quiz | Vata, Pitta & Kapha",
    description:
      "Take a simple Ayurveda dosha quiz and learn about traditional Vata, Pitta and Kapha concepts.",
  },

  "/contact-us": {
    title: "Contact & Appointment | Nadi Vaidya Clinics",
    description:
      "Book a Nadi Pariksha appointment at our Karnal or Vrindavan clinic by WhatsApp or call. OPD 8 AM–1 PM.",
  },

  "/vata-diet": {
    title: "Vata Diet Guide | Nadi Vaidya",
    description:
      "Learn about traditional Ayurvedic dietary concepts associated with Vata dosha and balanced lifestyle practices.",
  },

  "/pitta-diet": {
    title: "Pitta Diet Guide | Nadi Vaidya",
    description:
      "Explore traditional Ayurvedic dietary concepts associated with Pitta dosha and balanced lifestyle practices.",
  },

  "/kapha-diet": {
    title: "Kapha Diet Guide | Nadi Vaidya",
    description:
      "Explore traditional Ayurvedic dietary concepts associated with Kapha dosha and balanced lifestyle practices.",
  },

  "/heal-india": {
    title: "Heal India Initiative | Nadi Vaidya",
    description:
      "Learn about Nadi Vaidya wellness awareness, community initiatives and Ayurveda education.",
  },
};

/* =====================================================
   URL HELPERS
===================================================== */

function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

function getCanonicalUrl(pathname) {
  const normalizedPath = normalizePath(pathname);

  return normalizedPath === "/"
    ? `${SITE_URL}/`
    : `${SITE_URL}${normalizedPath}`;
}

function getAbsoluteUrl(url) {
  if (!url) {
    return `${SITE_URL}/`;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/* =====================================================
   EXTERNAL REDIRECT ROUTES
===================================================== */

function getExternalRedirect(pathname) {
  const path = normalizePath(pathname);

  // Old Free Workshop URL
  if (
    path === "/free-workshop" ||
    path.startsWith("/free-workshop/")
  ) {
    return GURUKUL_URLS.freeWorkshop;
  }

  // Old Gallery URL
  if (
    path === "/gallery" ||
    path.startsWith("/gallery/")
  ) {
    return GURUKUL_URLS.gallery;
  }

  // Old Gurukul workshop pages
  if (
    path === "/workshop-schedule" ||
    path === "/nadi-pariksha-form"
  ) {
    return GURUKUL_URLS.freeWorkshop;
  }

  // Old team page
  if (path === "/team") {
    return GURUKUL_URLS.team;
  }

  // Old News & Blogs listing and blog URLs
  if (
    path === "/news-blogs" ||
    path.startsWith("/news-blogs/") ||
    path === "/blog" ||
    path.startsWith("/blog/")
  ) {
    return GURUKUL_URLS.newsBlogs;
  }

  return null;
}

/* =====================================================
   EXTERNAL REDIRECT COMPONENT
===================================================== */

function ExternalRedirect({ to }) {
  useEffect(() => {
    // Full browser navigation is required for another domain.
    window.location.replace(to);
  }, [to]);

  return (
    <div
      role="status"
      style={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      Redirecting you to the new website...
    </div>
  );
}

/* =====================================================
   GLOBAL SEO
===================================================== */

function GlobalSEO() {
  const { pathname } = useLocation();

  const normalizedPath = normalizePath(pathname);

  const isAdminRoute =
    normalizedPath === "/admin" ||
    normalizedPath.startsWith("/admin/");

  const externalRedirect = getExternalRedirect(pathname);
  const isExternalRedirect = Boolean(externalRedirect);

  const pageSEO = PAGE_SEO[normalizedPath];
  const isKnownPage = Boolean(pageSEO);

  const isNotFound =
    !isAdminRoute &&
    !isExternalRedirect &&
    !isKnownPage;

  const canonicalUrl = getCanonicalUrl(pathname);

  const pageTitle = isAdminRoute
    ? "Admin Dashboard | Nadi Vaidya"
    : pageSEO?.title || "Page Not Found | Nadi Vaidya";

  const pageDescription =
    pageSEO?.description || seoConfig.defaultDescription;

  const defaultImage = getAbsoluteUrl(seoConfig.defaultImage);

  // Do not output old-domain SEO metadata for redirected URLs.
  if (isExternalRedirect) {
    return null;
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={normalizedPath}
        image={defaultImage}
        noIndex={isAdminRoute || isNotFound}
      />

      {!isAdminRoute && !isNotFound && (
        <StructuredData
          data={[
            {
              ...organizationSchema,
              url: SITE_URL,
            },
            {
              ...websiteSchema,
              url: SITE_URL,
            },
            ...allClinicSchemas,
          ]}
        />
      )}
    </>
  );
}

/* =====================================================
   AUTO SCROLL TOP
===================================================== */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

/* =====================================================
   APP ROUTES
===================================================== */

function AppRoutes() {
  const { pathname } = useLocation();

  const externalRedirect = getExternalRedirect(pathname);

  // Redirect old Gurukul URLs to the new website.
  if (externalRedirect) {
    return (
      <>
        <ExternalRedirect to={externalRedirect} />
      </>
    );
  }

  return (
    <>
      <GlobalSEO />

      <ScrollToTop />

      <Routes>
        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />

        {/* MAIN WEBSITE */}
        <Route
          path="/"
          element={<Layout />}
        >
          {/* HOME */}
          <Route
            index
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="about-us"
            element={<AboutUs />}
          />

          {/* DOSHA QUIZ */}
          <Route
            path="dosha-quiz"
            element={<DoshaQuiz />}
          />

          {/* CONTACT */}
          <Route
            path="contact-us"
            element={<ContactUs />}
          />

          {/* CLINICS */}
          <Route
            path="karnal-clinic"
            element={<ClinicPage slug="karnal-clinic" />}
          />

          <Route
            path="vrindavan-clinic"
            element={<ClinicPage slug="vrindavan-clinic" />}
          />

          {/* VATA DIET */}
          <Route
            path="vata-diet"
            element={<VataDiet />}
          />

          {/* PITTA DIET */}
          <Route
            path="pitta-diet"
            element={<PittaDiet />}
          />

          {/* KAPHA DIET */}
          <Route
            path="kapha-diet"
            element={<KaphaDiet />}
          />

          {/* HEAL INDIA */}
          <Route
            path="heal-india"
            element={<HealIndia />}
          />
        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

/* =====================================================
   APP ENTRY
===================================================== */

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
