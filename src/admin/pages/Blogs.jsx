// src/admin/pages/Blogs.jsx

import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import axios from "axios";

import Sidebar from "../components/Sidebar";


import "./blogs.css";

export default function Blogs() {

  /*
    BLOG STATE
  */
  const [blogs, setBlogs] =
    useState([]);

  /*
    LOADING
  */
  const [loading, setLoading] =
    useState(true);

  /*
    SEARCH
  */
  const [search, setSearch] =
    useState("");

  /*
    STATUS
  */
  const [status, setStatus] =
    useState("");

  /*
    FETCH BLOGS
  */
  useEffect(() => {

    fetchBlogs();

  }, []);

  /*
    FETCH FUNCTION
  */
  const fetchBlogs =
    async () => {

      try {

        /*
          USING VITE PROXY
        */
        const response =
          await axios.get(
            "/api/blogs/get-blogs.php"
          );

        /*
          ARRAY CHECK
        */
        if (
          Array.isArray(
            response.data
          )
        ) {

          setBlogs(
            response.data
          );

        } else {

          setBlogs([]);

        }

      } catch (error) {

        console.error(error);

        setBlogs([]);

      } finally {

        setLoading(false);

      }

    };

  /*
    DELETE BLOG
  */
  const deleteBlog =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this blog?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        /*
          USING VITE PROXY
        */
        const response =
          await axios.post(

            "/api/blogs/delete-blog.php",

            { id }

          );

        /*
          SUCCESS
        */
        if (
          response.data.success
        ) {

          /*
            REMOVE UI
          */
          setBlogs(

            blogs.filter(
              (item) =>
                item.id !== id
            )

          );

          setStatus(
            "Blog deleted successfully."
          );

        } else {

          setStatus(
            response.data.message ||
            "Failed to delete blog."
          );

        }

      } catch (error) {

        console.error(error);

        setStatus(
          "Server error while deleting blog."
        );

      }

    };

  /*
    FILTER BLOGS
  */
  const filteredBlogs =
    blogs.filter((blog) => {

      const title =
        blog.title
          ?.toLowerCase() || "";

      const category =
        blog.category
          ?.toLowerCase() || "";

      const keyword =
        search.toLowerCase();

      return (

        title.includes(keyword) ||

        category.includes(keyword)

      );

    });

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

        {/* TOPBAR */}
        

        {/* PAGE */}
        <div className="admin-page-content">

          {/* HEADER */}
          <div className="blogs-header">

            <div>

              <h1>
                Blogs Management
              </h1>

              <p>
                Create, manage,
                edit and delete
                Ayurvedic blogs
              </p>

            </div>

            <Link
              to="/admin/add-blog"
              className="add-blog-btn"
            >

              + Add New Blog

            </Link>

          </div>

          {/* SEARCH */}
          <div className="blogs-search-box">

            <input
              type="text"
              placeholder="Search blog by title or category..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* STATUS */}
          {status && (

            <div className="status-message">

              {status}

            </div>

          )}

          {/* LOADING */}
          {loading ? (

            <div className="blogs-loading">

              Loading Blogs...

            </div>

          ) : (

            <>
              {/* EMPTY */}
              {filteredBlogs.length ===
              0 ? (

                <div className="empty-blog">

                  No Blogs Found

                </div>

              ) : (

                <div className="blogs-table-wrap">

                  <table className="blogs-table">

                    <thead>

                      <tr>

                        <th>
                          Image
                        </th>

                        <th>
                          Title
                        </th>

                        <th>
                          Category
                        </th>

                        <th>
                          Author
                        </th>

                        <th>
                          Date
                        </th>

                        <th>
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredBlogs.map(
                        (blog) => (

                          <tr
                            key={blog.id}
                          >

                            {/* IMAGE */}
                            <td>

                              <img

                                src={
                                  blog.image ||
                                  "https://via.placeholder.com/100x70"
                                }

                                alt={
                                  blog.title
                                }

                                className="blog-thumb"

                                loading="lazy"

                              />

                            </td>

                            {/* TITLE */}
                            <td>

                              <div className="blog-title">

                                {blog.title}

                              </div>

                            </td>

                            {/* CATEGORY */}
                            <td>

                              <span className="blog-category">

                                {blog.category ||
                                  "Ayurveda"}

                              </span>

                            </td>

                            {/* AUTHOR */}
                            <td>

                              {blog.author ||
                                "Admin"}

                            </td>

                            {/* DATE */}
                            <td>

                              {blog.date
                                ? new Date(
                                    blog.date
                                  ).toLocaleDateString()
                                : "—"}

                            </td>

                            {/* ACTIONS */}
                            <td>

                              <div className="table-actions">

                                {/* EDIT */}
                                <Link

                                  to={`/admin/edit-blog/${blog.id}`}

                                  className="edit-btn"

                                >

                                  Edit

                                </Link>

                                {/* DELETE */}
                                <button

                                  className="delete-btn"

                                  onClick={() =>
                                    deleteBlog(
                                      blog.id
                                    )
                                  }

                                >

                                  Delete

                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}
            </>

          )}

        </div>

      </div>

    </div>

  );

}