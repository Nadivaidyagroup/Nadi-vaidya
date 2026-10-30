import React from "react";

import { createRoot } from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";

import "bootstrap/dist/css/bootstrap.min.css";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import App from "./App.jsx";

import "./style.css";

/*
=========================================
GLOBAL ERROR HANDLER
=========================================
*/

window.onerror = function (
  message,
  source,
  lineno,
  colno,
  error
) {

  console.error(
    "Global Error:",
    error
  );

};

/*
=========================================
ROOT
=========================================
*/

const rootElement =
  document.getElementById("root");

/*
=========================================
RENDER APP
=========================================
*/

if (rootElement) {

  createRoot(rootElement).render(

    <HelmetProvider>

      <App />

    </HelmetProvider>

  );

}