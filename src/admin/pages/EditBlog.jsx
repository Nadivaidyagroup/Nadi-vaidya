// src/admin/pages/EditBlog.jsx

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import axios from "axios";

import Sidebar from "../components/Sidebar";


import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";

import "./editBlog.css";

export default function EditBlog() {

  /*
  =========================================
  ROUTER
  =========================================
  */

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  /*
  =========================================
  FORM
  =========================================
  */

  const [form, setForm] =
    useState({

      title: "",

      slug: "",

      category: "",

      author: "",

      image: "",

      excerpt: "",

      content: ""

    });

  /*
  =========================================
  STATES
  =========================================
  */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /*
  =========================================
  FETCH BLOG
  =========================================
  */

  useEffect(() => {

    if (id) {

      fetchBlog();

    }

  }, [id]);

  /*
  =========================================
  GET BLOG
  =========================================
  */

  const fetchBlog =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.get(

            `/api/blogs/get-single-blog.php?id=${id}`

          );

        if (
          response.data.success
        ) {

          setForm(
            response.data.blog
          );

        } else {

          setError(
            "Blog not found"
          );

        }

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load blog"
        );

      } finally {

        setLoading(false);

      }

    };

  /*
  =========================================
  HANDLE CHANGE
  =========================================
  */

  const handleChange =
    (e) => {

      const {
        name,
        value
      } = e.target;

      /*
      AUTO SLUG
      */

      if (name === "title") {

        const slug =
          value

            .toLowerCase()

            .trim()

            .replace(/[^\w\s-]/g, "")

            .replace(/\s+/g, "-");

        setForm((prev) => ({

          ...prev,

          title: value,

          slug

        }));

        return;

      }

      setForm((prev) => ({

        ...prev,

        [name]: value

      }));

    };

  /*
  =========================================
  CONTENT CHANGE
  =========================================
  */

  const handleContentChange =
    (value) => {

      setForm((prev) => ({

        ...prev,

        content: value

      }));

    };

  /*
  =========================================
  IMAGE UPLOAD
  =========================================
  */

  const handleImageUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      try {

        setUploading(true);

        const response =
          await axios.post(

            "/api/blogs/upload-image.php",

            formData,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data"

              }

            }

          );

        if (
          response.data.success
        ) {

          setForm((prev) => ({

            ...prev,

            image:
              response.data.image

          }));

        } else {

          setError(
            response.data.message
          );

        }

      } catch (error) {

        console.log(error);

        setError(
          "Image upload failed"
        );

      } finally {

        setUploading(false);

      }

    };

  /*
  =========================================
  UPDATE BLOG
  =========================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setSaving(true);

      setError("");

      setSuccess("");

      try {

        const response =
          await axios.post(

            "/api/blogs/update-blog.php",

            {

              id,

              ...form

            },

            {

              headers: {

                "Content-Type":
                  "application/json"

              }

            }

          );

        if (
          response.data.success
        ) {

          setSuccess(
            "✅ Blog Updated Successfully"
          );

          setTimeout(() => {

            navigate(
              "/admin/blogs"
            );

          }, 1200);

        } else {

          setError(

            response.data.message ||

            "Failed To Update Blog"

          );

        }

      } catch (error) {

        console.log(error);

        setError(
          "Server Error"
        );

      } finally {

        setSaving(false);

      }

    };

  /*
  =========================================
  LOADING
  =========================================
  */

  if (loading) {

    return (

      <div className="edit-loader-wrapper">

        <div className="edit-loader-card">

          <div className="edit-loader"></div>

          <p>
            Loading Blog...
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

    

        {/* PAGE */}
        <div className="edit-page">

          {/* HERO */}
          <div className="edit-hero">

            <div>

              <span className="edit-badge">

                ✍️ Blog Editor

              </span>

              <h1>

                Edit Blog Post

              </h1>

              <p>

                Update your blog details,
                content and featured image.

              </p>

            </div>

            <button
              className="back-btn"
              onClick={() =>
                navigate(
                  "/admin/blogs"
                )
              }
            >

              ← Back

            </button>

          </div>

          {/* ALERTS */}
          {error && (

            <div className="alert error-alert">

              {error}

            </div>

          )}

          {success && (

            <div className="alert success-alert">

              {success}

            </div>

          )}

          {/* FORM */}
          <div className="edit-card">

            <form
              className="edit-form"
              onSubmit={handleSubmit}
            >

              {/* GRID */}
              <div className="form-grid">

                {/* TITLE */}
                <div className="form-group full">

                  <label>
                    Blog Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    required
                  />

                </div>

                {/* SLUG */}
                <div className="form-group">

                  <label>
                    Blog Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="blog-slug"
                    required
                  />

                </div>

                {/* CATEGORY */}
                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Ayurveda"
                  />

                </div>

                {/* AUTHOR */}
                <div className="form-group">

                  <label>
                    Author
                  </label>

                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />

                </div>

                {/* IMAGE */}
                <div className="form-group">

                  <label>
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  {uploading && (

                    <small className="uploading-text">

                      Uploading Image...

                    </small>

                  )}

                </div>

              </div>

              {/* IMAGE PREVIEW */}
              {form.image && (

                <div className="image-preview-box">

                  <img
                    src={form.image}
                    alt="Preview"
                  />

                </div>

              )}

              {/* EXCERPT */}
              <div className="form-group">

                <label>
                  Short Description
                </label>

                <textarea
                  rows="4"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="Write short description..."
                ></textarea>

              </div>

              {/* CONTENT */}
              <div className="form-group">

                <label>
                  Blog Content
                </label>

                <div className="editor-wrapper">

                  <ReactQuill
                    theme="snow"
                    value={form.content}
                    onChange={handleContentChange}
                  />

                </div>

              </div>

              {/* ACTIONS */}
              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    navigate(
                      "/admin/blogs"
                    )
                  }
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >

                  {saving
                    ? "Updating..."
                    : "Update Blog"}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}