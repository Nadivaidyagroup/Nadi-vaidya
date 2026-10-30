import {
  useState
} from "react";

import axios from "axios";

import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";

import Sidebar from "../components/Sidebar";


import "./addBlog.css";

export default function AddBlog() {

  /*
  =========================================
  FORM STATE
  =========================================
  */

  const [form, setForm] =
    useState({

      title: "",

      slug: "",

      category: "",

      author: "Nadi Vaidya",

      image: "",

      excerpt: "",

      content: ""

    });

  /*
  =========================================
  IMAGE FILE
  =========================================
  */

  const [imageFile, setImageFile] =
    useState(null);

  /*
  =========================================
  LOADING
  =========================================
  */

  const [loading, setLoading] =
    useState(false);

  /*
  =========================================
  STATUS
  =========================================
  */

  const [status, setStatus] =
    useState("");

  /*
  =========================================
  HANDLE CHANGE
  =========================================
  */

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    /*
    AUTO SLUG
    */

    if (name === "title") {

      const slug = value

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
  HANDLE IMAGE
  =========================================
  */

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setImageFile(file);

      setForm((prev) => ({

        ...prev,

        image:
          URL.createObjectURL(file)

      }));

    };

  /*
  =========================================
  HANDLE CONTENT
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
  SUBMIT
  =========================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setStatus("");

      try {

        const formData =
          new FormData();

        formData.append(
          "title",
          form.title
        );

        formData.append(
          "slug",
          form.slug
        );

        formData.append(
          "category",
          form.category
        );

        formData.append(
          "author",
          form.author
        );

        formData.append(
          "excerpt",
          form.excerpt
        );

        formData.append(
          "content",
          form.content
        );

        /*
        IMAGE
        */

        if (imageFile) {

          formData.append(
            "image",
            imageFile
          );

        }

        /*
        API
        */

        const response =
          await axios.post(

            "/api/blogs/add-blog.php",

            formData,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data"

              }

            }

          );

        /*
        SUCCESS
        */

        if (
          response.data.success
        ) {

          setStatus(
            "✅ Blog Published Successfully"
          );

          /*
          RESET
          */

          setForm({

            title: "",

            slug: "",

            category: "",

            author:
              "Nadi Vaidya",

            image: "",

            excerpt: "",

            content: ""

          });

          setImageFile(null);

        } else {

          setStatus(

            response.data.message ||

            "❌ Failed To Publish Blog"

          );

        }

      } catch (error) {

        console.log(error);

        setStatus(
          "❌ Server Error"
        );

      } finally {

        setLoading(false);

      }

    };

  /*
  =========================================
  QUILL TOOLBAR
  =========================================
  */

  const modules = {

    toolbar: [

      [{ header: [1, 2, 3, false] }],

      ["bold", "italic", "underline"],

      [{ list: "ordered" }, { list: "bullet" }],

      ["link", "image"],

      ["clean"]

    ]

  };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="admin-main">

        {/* TOPBAR */}
        

        {/* PAGE */}
        <div className="admin-page">

          {/* HEADER */}
          <div className="page-header">

            <div>

              <span className="page-badge">

                ✨ Blog Management

              </span>

              <h1>
                Create New Blog
              </h1>

              <p>
                Publish modern SEO friendly
                Ayurvedic blog articles
              </p>

            </div>

          </div>

          {/* FORM */}
          <form
            className="blog-form-card"
            onSubmit={handleSubmit}
          >

            {/* GRID */}
            <div className="blog-form-grid">

              {/* TITLE */}
              <div className="form-group">

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
                />

              </div>

            </div>

            {/* IMAGE */}
            <div className="form-group upload-group">

              <label>
                Featured Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

            </div>

            {/* IMAGE PREVIEW */}
            {form.image && (

              <div className="image-preview">

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
                name="excerpt"
                rows="5"
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
                  modules={modules}
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="publish-btn"
              disabled={loading}
            >

              {loading
                ? "Publishing..."
                : "🚀 Publish Blog"}

            </button>

            {/* STATUS */}
            {status && (

              <div className="status-msg">

                {status}

              </div>

            )}

          </form>

        </div>

      </div>

    </div>

  );

}