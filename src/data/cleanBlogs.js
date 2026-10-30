import fs from "fs";
import csv from "csv-parser";

const results = [];

/* =========================
   CLEAN TEXT
========================= */

function cleanText(text = "") {

  return text
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

}

/* =========================
   CREATE SLUG
========================= */

function createSlug(title = "") {

  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

}

/* =========================
   GET IMAGE
========================= */

function getImage(row) {

  /*
    FEATURED IMAGE
  */

  if (row["Image Featured"]) {

    return row["Image Featured"]
      .split("|")[0]
      .trim();

  }

  /*
    IMAGE URL
  */

  if (row["Image URL"]) {

    return row["Image URL"]
      .split("|")[0]
      .trim();

  }

  /*
    ATTACHMENT URL
  */

  if (row["Attachment URL"]) {

    return row["Attachment URL"]
      .split("|")[0]
      .trim();

  }

  /*
    CONTENT IMAGE
  */

  const content = row["Content"] || "";

  const regex =
    /<img[^>]+src=["']([^"']+)["']/i;

  const match = content.match(regex);

  if (match && match[1]) {

    return match[1].replace(
      /-\d+x\d+(?=\.(jpg|jpeg|png|webp))/i,
      ""
    );

  }

  /*
    DEFAULT
  */

  return "https://nadivaidya.in/wp-content/uploads/2022/12/11.png";

}

/* =========================
   READ CSV
========================= */

fs.createReadStream("./oldpost.csv")
  .pipe(csv())

  .on("data", (row) => {

    /*
      SKIP EMPTY TITLES
    */

    if (!row.Title) {
      return;
    }

    const content =
      row.Content || "";

    const cleanContent =
      cleanText(content);

    const excerpt =
      cleanContent.length > 0
        ? cleanContent.substring(0, 220) + "..."
        : row.Title;

    results.push({

      id:
        row.ID || "",

      title:
        row.Title || "",

      slug:
        row.Slug ||
        createSlug(row.Title),

      author:
        row["Author Username"] ||
        "nadivaidya",

      date:
        row.Date || "",

      category:
        row.Categories ||
        "Ayurveda",

      image:
        getImage(row),

      excerpt,

      content

    });

  })

  .on("end", () => {

    fs.writeFileSync(
      "./cleanBlogs.json",
      JSON.stringify(results, null, 2),
      "utf8"
    );

    console.log(
      `✅ cleanBlogs.json generated successfully (${results.length} posts)`
    );

  });