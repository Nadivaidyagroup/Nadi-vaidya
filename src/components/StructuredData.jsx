// src/components/StructuredData.jsx

import { Helmet } from "react-helmet-async";

/**
 * StructuredData Component
 *
 * Adds JSON-LD structured data to the document head.
 *
 * Supports:
 * - A single schema object
 * - An array of schema objects
 * - Organization schema
 * - Website schema
 * - Breadcrumb schema
 * - Article schema
 * - Local business schema
 * - Custom Schema.org objects
 */

export default function StructuredData({ data }) {
  if (!data) {
    return null;
  }

  const schemas = Array.isArray(data) ? data : [data];

  const validSchemas = schemas.filter(
    (schema) =>
      schema &&
      typeof schema === "object" &&
      !Array.isArray(schema) &&
      schema["@context"] === "https://schema.org" &&
      typeof schema["@type"] === "string"
  );

  if (validSchemas.length === 0) {
    return null;
  }

  return (
    <Helmet>
      {validSchemas.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema).replace(/</g, "\\u003c")}
        </script>
      ))}
    </Helmet>
  );
}