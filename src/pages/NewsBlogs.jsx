// src/pages/NewsBlogs.jsx

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Helmet
} from "react-helmet-async";

import {
  Link
} from "react-router-dom";

import axios from "axios";

import "./newsBlogs.css";

/*
=========================================
LOCAL BLOGS
=========================================
*/

import localBlogs from "../data/cleanBlogs.json";

export default function NewsBlogs() {

  /*
  =========================================
  STATES
  =========================================
  */

  const [blogsData, setBlogsData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const postsPerPage = 9;

  /*
  =========================================
  FETCH BLOGS
  =========================================
  */

  useEffect(() => {

    fetchBlogs();

  }, []);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchBlogs =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/blogs/get-blogs.php"
          );

        /*
        =========================================
        ALWAYS SHOW LOCAL + DATABASE BLOGS
        =========================================
        */

        let apiBlogs = [];

        if (
          Array.isArray(
            response.data
          )
        ) {

          apiBlogs =
            response.data;

        }

        /*
        =========================================
        MERGE BLOGS
        =========================================
        */

        const mergedBlogs = [

          ...apiBlogs,

          ...localBlogs

        ];

        /*
        =========================================
        REMOVE DUPLICATES
        =========================================
        */

        const uniqueBlogs =
          mergedBlogs.filter(

            (blog, index, self) =>

              index ===

              self.findIndex(

                (b) =>

                  b.slug ===
                  blog.slug

              )

          );

        setBlogsData(
          uniqueBlogs
        );

      } catch (error) {

        console.error(error);

        /*
        FALLBACK ONLY
        */

        setBlogsData(
          localBlogs
        );

      } finally {

        setLoading(false);

      }

    };

  /*
  =========================================
  CATEGORIES
  =========================================
  */

  const categories = [

    "All",

    ...new Set(

      blogsData.map(

        (item) =>

          item.category ||
          "Ayurveda"

      )

    )

  ];

  /*
  =========================================
  FILTER BLOGS
  =========================================
  */

  const filteredBlogs =
    useMemo(() => {

      return [...blogsData]

        .filter((blog) => {

          const searchText =
            search.toLowerCase();

          const title =
            blog.title
              ?.toLowerCase() || "";

          const content =
            blog.content
              ?.toLowerCase() || "";

          const excerpt =
            blog.excerpt
              ?.toLowerCase() || "";

          return (

            title.includes(
              searchText
            ) ||

            content.includes(
              searchText
            ) ||

            excerpt.includes(
              searchText
            )

          );

        })

        .filter((blog) => {

          if (
            category === "All"
          ) {

            return true;

          }

          return (

            blog.category ===
            category

          );

        })

        .sort((a, b) => {

          return (

            new Date(
              b.date || 0
            ) -

            new Date(
              a.date || 0
            )

          );

        });

    }, [

      blogsData,
      search,
      category

    ]);

  /*
  =========================================
  PAGINATION
  =========================================
  */

  const totalPages =
    Math.ceil(

      filteredBlogs.length /
      postsPerPage

    );

  const currentPosts =
    filteredBlogs.slice(

      (currentPage - 1) *
      postsPerPage,

      currentPage *
      postsPerPage

    );

  /*
  =========================================
  LOADING
  =========================================
  */

  if (loading) {

    return (

      <div className="blogs-loading">

        <div className="container">

          <h2>
            Loading Blogs...
          </h2>

        </div>

      </div>

    );

  }

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Ayurveda News &
          Blogs | Nadi
          Vaidya
        </title>

      </Helmet>

      <main className="blogs-page">

        {/* HERO */}
        <section className="blogs-hero">

          <div className="container">

            <span className="blogs-tag">

              Ayurveda •
              Wellness •
              Knowledge

            </span>

            <h1>
              Ayurveda News &
              Blogs
            </h1>

            <p>

              Explore Ayurvedic
              wellness tips,
              lifestyle guidance
              and healing articles.

            </p>

          </div>

        </section>

        {/* FILTER */}
        <section className="blogs-filter-section">

          <div className="container">

            <div className="blogs-filter-wrap">

              {/* SEARCH */}
              <div className="search-box">

                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => {

                    setSearch(
                      e.target.value
                    );

                    setCurrentPage(1);

                  }}
                />

              </div>

              {/* CATEGORY */}
              <div className="category-filter">

                <select
                  value={category}
                  onChange={(e) => {

                    setCategory(
                      e.target.value
                    );

                    setCurrentPage(1);

                  }}
                >

                  {categories.map(
                    (cat) => (

                      <option
                        key={cat}
                        value={cat}
                      >

                        {cat}

                      </option>

                    )
                  )}

                </select>

              </div>

            </div>

          </div>

        </section>

        {/* BLOGS */}
        <section className="blogs-section">

          <div className="container">

            {/* RESULT */}
            <div className="result-count">

              Showing

              <strong>

                {" "}
                {filteredBlogs.length}
                {" "}

              </strong>

              articles

            </div>

            {/* GRID */}
            <div className="blogs-grid">

              {currentPosts.map(
                (blog, index) => (

                  <article
                    className="blog-card"
                    key={
                      blog.id ||
                      blog.slug ||
                      index
                    }
                  >

                    {/* IMAGE */}
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="blog-image"
                    >

                      <img

                        src={
                          blog.image ||

                          "https://picsum.photos/800/500"
                        }

                        alt={
                          blog.title ||

                          "Ayurveda Blog"
                        }

                        loading="lazy"

                      />

                    </Link>

                    {/* CONTENT */}
                    <div className="blog-content">

                      {/* CATEGORY */}
                      <span className="blog-category">

                        {blog.category ||
                          "Ayurveda"}

                      </span>

                      {/* TITLE */}
                      <h2>

                        <Link
                          to={`/blog/${blog.slug}`}
                        >

                          {blog.title}

                        </Link>

                      </h2>

                      {/* META */}
                      <div className="blog-meta">

                        <span>

                          ✍{" "}

                          {blog.author ||
                            "Nadi Vaidya"}

                        </span>

                        <span>

                          📅{" "}

                          {blog.date

                            ? new Date(
                                blog.date
                              ).toLocaleDateString()

                            : "No Date"}

                        </span>

                      </div>

                      {/* EXCERPT */}
                      <p>

                        {

                          blog.excerpt

                            ?.replace(
                              /<[^>]*>/g,
                              ""
                            )

                            ?.replace(
                              /&nbsp;/g,
                              ""

                            )

                            ?.substring(
                              0,
                              180
                            ) ||

                          "Read this Ayurveda article."

                        }

                        ...

                      </p>

                      {/* BUTTON */}
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="read-btn"
                      >

                        Read Full Article

                      </Link>

                    </div>

                  </article>

                )
              )}

            </div>

            {/* EMPTY */}
            {filteredBlogs.length === 0 && (

              <div className="no-blog">

                <h3>
                  No blogs found
                </h3>

              </div>

            )}

            {/* PAGINATION */}
            {totalPages > 1 && (

              <div className="pagination">

                {[...Array(totalPages)].map(
                  (_, index) => (

                    <button

                      key={index}

                      className={

                        currentPage ===
                        index + 1

                          ? "active"

                          : ""

                      }

                      onClick={() =>

                        setCurrentPage(
                          index + 1
                        )

                      }
                    >

                      {index + 1}

                    </button>

                  )
                )}

              </div>

            )}

          </div>

        </section>

      </main>

    </>

  );

}