// src/pages/SingleBlog.jsx

import {
  useEffect,
  useState
} from "react";

import {
  Helmet
} from "react-helmet-async";

import {
  useParams,
  Link
} from "react-router-dom";

import axios from "axios";

import blogsData from "../data/cleanBlogs.json";

import "./singleBlog.css";

export default function SingleBlog() {

  /*
  =========================================
  PARAMS
  =========================================
  */

  const { slug } =
    useParams();

  /*
  =========================================
  STATES
  =========================================
  */

  const [blog, setBlog] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  =========================================
  FETCH BLOG
  =========================================
  */

  useEffect(() => {

    fetchBlog();

  }, [slug]);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchBlog =
    async () => {

      try {

        /*
        API CALL
        */
        const response =
          await axios.get(
            "/api/blogs/get-blogs.php"
          );

        /*
        VALIDATE
        */
        const blogs =
          Array.isArray(
            response.data
          ) &&

          response.data.length > 0

            ? response.data

            : blogsData;

        /*
        FIND BLOG
        */
        const foundBlog =
          blogs.find((item) => {

            const itemSlug =

              item.slug
                ?.toString()
                .trim()
                .toLowerCase();

            return (
              itemSlug ===
              slug?.toLowerCase()
            );

          });

        setBlog(
          foundBlog || null
        );

      } catch (error) {

        console.error(error);

        /*
        LOCAL FALLBACK
        */
        const localBlog =
          blogsData.find((item) => {

            const itemSlug =

              item.slug
                ?.toString()
                .trim()
                .toLowerCase();

            return (
              itemSlug ===
              slug?.toLowerCase()
            );

          });

        setBlog(
          localBlog || null
        );

      } finally {

        setLoading(false);

      }

    };

  /*
  =========================================
  LOADING
  =========================================
  */

  if (loading) {

    return (

      <div className="single-loading">

        <Helmet>

          <title>
            Loading Blog |
            Nadi Vaidya
          </title>

        </Helmet>

        <div className="container">

          <h2>
            Loading Blog...
          </h2>

        </div>

      </div>

    );

  }

  /*
  =========================================
  BLOG NOT FOUND
  =========================================
  */

  if (!blog) {

    return (

      <>

        <Helmet>

          <title>
            Blog Not Found |
            Nadi Vaidya
          </title>

          <meta
            name="robots"
            content="noindex, nofollow"
          />

        </Helmet>

        <div className="blog-not-found">

          <div className="container">

            <div className="not-found-box">

              <h1>
                Blog Not Found
              </h1>

              <p>
                The article you are looking for does not exist.
              </p>

              <Link
                to="/news-blogs"
                className="back-btn"
              >

                Back To Blogs

              </Link>

            </div>

          </div>

        </div>

      </>

    );

  }

  /*
  =========================================
  SEO DATA
  =========================================
  */

  const blogTitle =

    blog.title ||

    "Ayurveda Blog";

  const blogDescription =

    blog.excerpt

      ?.replace(
        /<[^>]*>/g,
        ""
      )

      ?.replace(
        /&nbsp;/g,
        " "
      )

      ?.substring(
        0,
        160
      ) ||

    "Read Ayurveda wellness blogs and holistic healing articles from Nadi Vaidya.";

  const blogImage =

    blog.image ||

    "https://www.nadivaidya.in/og-image.jpg";

  const blogUrl =

    `https://www.nadivaidya.in/blog/${blog.slug}`;

  /*
  =========================================
  RELATED BLOGS
  =========================================
  */

  const relatedBlogs =

    blogsData

      .filter(

        (item) =>

          item.slug !==
          blog.slug &&

          item.category ===
          blog.category

      )

      .slice(0, 3);

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>

          {blogTitle}
          {" "}
          |
          {" "}
          Nadi Vaidya Blogs

        </title>

        <meta
          name="description"
          content={blogDescription}
        />

        <meta
          name="keywords"
          content={`
          Ayurveda Blog,
          Nadi Pariksha,
          Holistic Healing,
          Ayurvedic Lifestyle,
          Ayurveda Wellness,
          ${blog.category || "Ayurveda"},
          ${blogTitle}
          `}
        />

        <meta
          name="author"
          content={
            blog.author ||
            "Nadi Vaidya"
          }
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href={blogUrl}
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:title"
          content={blogTitle}
        />

        <meta
          property="og:description"
          content={blogDescription}
        />

        <meta
          property="og:image"
          content={blogImage}
        />

        <meta
          property="og:url"
          content={blogUrl}
        />

        <meta
          property="og:site_name"
          content="Nadi Vaidya"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={blogTitle}
        />

        <meta
          name="twitter:description"
          content={blogDescription}
        />

        <meta
          name="twitter:image"
          content={blogImage}
        />

        {/* SCHEMA */}
        <script type="application/ld+json">

          {JSON.stringify({

            "@context":
              "https://schema.org",

            "@type":
              "BlogPosting",

            headline:
              blogTitle,

            description:
              blogDescription,

            image:
              blogImage,

            author: {

              "@type":
                "Person",

              name:
                blog.author ||
                "Nadi Vaidya"

            },

            publisher: {

              "@type":
                "Organization",

              name:
                "Nadi Vaidya",

              logo: {

                "@type":
                  "ImageObject",

                url:
                  "https://www.nadivaidya.in/logo.png"

              }

            },

            mainEntityOfPage: {

              "@type":
                "WebPage",

              "@id":
                blogUrl

            },

            datePublished:
              blog.date,

            dateModified:
              blog.date

          })}

        </script>

      </Helmet>

      <article className="single-blog-page">

        {/* HERO */}
        <section className="single-blog-hero">

          <div className="hero-overlay"></div>

          <div className="container">

            <div className="hero-content">

              <span className="single-category">

                {blog.category ||
                  "Ayurveda"}

              </span>

              <h1>

                {blog.title}

              </h1>

              <div className="single-meta">

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
                      ).toLocaleDateString(
                        "en-IN",
                        {

                          year:
                            "numeric",

                          month:
                            "long",

                          day:
                            "numeric"

                        }
                      )

                    : "No Date"}

                </span>

              </div>

            </div>

          </div>

        </section>

        {/* FEATURE IMAGE */}
        {blog.image && (

          <section className="single-image-section">

            <div className="container">

              <div className="single-image-wrapper">

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="single-image"
                  loading="lazy"
                />

              </div>

            </div>

          </section>

        )}

        {/* CONTENT */}
        <section className="single-content-section">

          <div className="container">

            <div className="single-content-wrapper">

              <div
                className="single-content"
                dangerouslySetInnerHTML={{
                  __html:

                    blog.content ||

                    blog.excerpt ||

                    ""
                }}
              />

            </div>

          </div>

        </section>

      

        {/* BACK */}
        <section className="single-back-section">

          <div className="container">

            <Link
              to="/news-blogs"
              className="back-btn"
            >

              ← Back To Blogs

            </Link>

          </div>

        </section>

      </article>

    </>

  );

}