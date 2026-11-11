// src/admin/pages/BlogEditor.jsx
// नया स्वास्थ्य लेख लिखना / पुराना लेख बदलना  (/admin/add-blog , /admin/edit-blog/:id)

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Sidebar from "../components/Sidebar";
import { BLOG_CATEGORIES } from "../../data/blogCategories.js";
import { BLOG_LANGS, postPath } from "../../data/blogLanguages.js";
import "./appointments.css";
import "./blogAdmin.css";

const EMPTY = {
  title: "",
  title_en: "",
  slug: "",
  category: "",
  excerpt: "",
  content: "",
  author: "नाड़ी वैद्य डॉ. अजीत सिंह यादव",
  status: "published",
  image: "",
};

const AUTHORS = [
  "नाड़ी वैद्य डॉ. अजीत सिंह यादव",
  "डॉ. सलोनी यादव वशिष्ठ",
  "डॉ. मोहित वशिष्ठ",
  "नाड़ी वैद्य क्लीनिक",
];

const slugify = (t) =>
  String(t || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

export default function BlogEditor() {
  const { id } = useParams();
  const [savedId, setSavedId] = useState(null); // नया लेख पहली बार सेव होने के बाद उसका id
  const postId = id || savedId;
  const isEdit = Boolean(postId);

  const [form, setForm] = useState(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [tab, setTab] = useState("hi"); // कौन-सी भाषा edit हो रही है
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    setSavedId(null);
    setTab("hi");
    setTranslations({});
    if (!id) {
      setForm(EMPTY);
      setSlugTouched(false);
      setFile(null);
      setPreview("");
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get("/api/clinic-blogs/admin-get.php", { params: { id }, withCredentials: true })
      .then((r) => {
        if (r.data?.success) {
          const { translations: tr, ...rest } = r.data.data;
          setForm({ ...EMPTY, ...rest });
          setTranslations(tr || {});
          setSlugTouched(true);
          setPreview(r.data.data.image || "");
        } else setMsg({ type: "err", text: r.data?.message || "लेख नहीं मिला" });
      })
      .catch((e) =>
        setMsg({ type: "err", text: e?.response?.status === 401 ? "Please log in again." : "लेख लोड नहीं हुआ" })
      )
      .finally(() => setLoading(false));
  }, [id]);

  const set = (name, value) =>
    setForm((f) => {
      const next = { ...f, [name]: value };
      if (name === "title_en" && !slugTouched) next.slug = slugify(value);
      return next;
    });

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setMsg({ type: "err", text: "फ़ोटो 5 MB से छोटी होनी चाहिए" });
      e.target.value = "";
      return;
    }
    setFile(f);
    setRemoveImage(false);
    setPreview(URL.createObjectURL(f));
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link"],
        ["clean"],
      ],
    }),
    []
  );

  const save = async (status) => {
    setMsg({ type: "", text: "" });
    if (!form.title.trim()) return setMsg({ type: "err", text: "लेख का हिन्दी शीर्षक लिखें" });
    if (!form.content.replace(/<[^>]*>/g, "").trim())
      return setMsg({ type: "err", text: "लेख का मुख्य भाग लिखें" });

    const fd = new FormData();
    if (postId) fd.append("id", postId);
    ["title", "title_en", "slug", "category", "excerpt", "content", "author"].forEach((k) =>
      fd.append(k, form[k] || "")
    );
    fd.append("status", status);
    if (file) fd.append("image", file);
    if (removeImage) fd.append("remove_image", "1");

    setSaving(true);
    try {
      const r = await axios.post("/api/clinic-blogs/admin-save.php", fd, { withCredentials: true });
      if (r.data?.success) {
        if (!postId) setSavedId(r.data.id);
        setForm((f) => ({ ...f, slug: r.data.slug, status: r.data.status }));
        setFile(null);
        setMsg({
          type: "ok",
          text:
            r.data.status === "published"
              ? `✅ लेख वेबसाइट पर प्रकाशित हो गया — nadivaidya.in/blog/${r.data.slug}`
              : "✅ Draft सेव हो गया (अभी वेबसाइट पर नहीं दिखेगा)",
        });
      } else setMsg({ type: "err", text: r.data?.message || "सेव नहीं हुआ" });
    } catch (e) {
      setMsg({
        type: "err",
        text: e?.response?.status === 401 ? "Login समाप्त हो गया — दोबारा login करें" : e?.response?.data?.message || "Server error — सेव नहीं हुआ",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <div className="appt-page ba-editor">
          <div className="appt-top">
            <div>
              <h1>{isEdit ? "लेख बदलें" : "नया स्वास्थ्य लेख"}</h1>
              <p>
                <Link to="/admin/blogs">← सभी लेख</Link>
                {isEdit && form.status === "published" && form.slug && (
                  <>
                    {" • "}
                    <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer">वेबसाइट पर देखें ↗</a>
                  </>
                )}
              </p>
            </div>
          </div>

          {!loading && (
            <div className="ba-tabs" role="tablist">
              {BLOG_LANGS.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  className={tab === l.code ? "on" : ""}
                  onClick={() => setTab(l.code)}
                  disabled={l.code !== "hi" && !postId}
                  title={l.code !== "hi" && !postId ? "पहले हिंदी लेख सेव करें" : l.en}
                >
                  {l.name}
                  {l.code === "hi" ? " (मूल)" : translations[l.code] ? " ✓" : ""}
                </button>
              ))}
            </div>
          )}

          {!loading && tab !== "hi" && postId ? (
            <TranslationPanel
              key={tab}
              postId={postId}
              lang={tab}
              slug={form.slug}
              base={form}
              initial={translations[tab]}
              onSaved={(tr) =>
                setTranslations((all) => {
                  const next = { ...all };
                  if (tr) next[tab] = tr;
                  else delete next[tab];
                  return next;
                })
              }
            />
          ) : loading ? (
            <p className="appt-empty">Loading…</p>
          ) : (
            <div className="ba-form">
              <label className="ba-field">
                <span>शीर्षक (हिन्दी) *</span>
                <input
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="जैसे: घुटनों के दर्द में आयुर्वेदिक उपचार"
                  maxLength={250}
                />
              </label>

              <div className="ba-two">
                <label className="ba-field">
                  <span>English शीर्षक</span>
                  <input
                    value={form.title_en}
                    onChange={(e) => set("title_en", e.target.value)}
                    placeholder="e.g. Knee Pain: Ayurvedic Treatment"
                    maxLength={250}
                  />
                  <small>Google search और लेख के link के लिए</small>
                </label>
                <label className="ba-field">
                  <span>रोग / वर्ग</span>
                  <select value={form.category} onChange={(e) => set("category", e.target.value)}>
                    <option value="">— चुनें —</option>
                    {BLOG_CATEGORIES.map((c) => (
                      <option value={c.key} key={c.key}>
                        {c.hi} ({c.en})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="ba-two">
                <label className="ba-field">
                  <span>लेखक</span>
                  <input
                    list="ba-authors"
                    value={form.author}
                    onChange={(e) => set("author", e.target.value)}
                    maxLength={120}
                  />
                  <datalist id="ba-authors">
                    {AUTHORS.map((a) => (
                      <option value={a} key={a} />
                    ))}
                  </datalist>
                </label>
                <label className="ba-field">
                  <span>Link (URL)</span>
                  <div className="ba-slug">
                    <em>nadivaidya.in/blog/</em>
                    <input
                      value={form.slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        set("slug", slugify(e.target.value) || e.target.value.toLowerCase());
                      }}
                      placeholder="knee-pain-ayurveda"
                    />
                  </div>
                  <small>English शीर्षक से अपने-आप बनता है</small>
                </label>
              </div>

              <div className="ba-field">
                <span>मुख्य फ़ोटो (cover)</span>
                <div className="ba-image">
                  {preview && !removeImage ? (
                    <img src={preview} alt="" />
                  ) : (
                    <div className="ba-noimg">कोई फ़ोटो नहीं</div>
                  )}
                  <div className="ba-image-btns">
                    <label className="appt-btn ba-file">
                      फ़ोटो चुनें
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} hidden />
                    </label>
                    {preview && !removeImage && (
                      <button
                        type="button"
                        className="ba-ghost"
                        onClick={() => {
                          setFile(null);
                          setPreview("");
                          setRemoveImage(true);
                        }}
                      >
                        फ़ोटो हटाएँ
                      </button>
                    )}
                    <small>JPG / PNG / WEBP, 5 MB तक। चौड़ी (landscape) फ़ोटो सबसे अच्छी लगती है।</small>
                  </div>
                </div>
              </div>

              <label className="ba-field">
                <span>छोटा सार (2–3 पंक्तियाँ)</span>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  maxLength={600}
                  placeholder="लेख की सूची और WhatsApp/Google पर यही दिखेगा। खाली छोड़ें तो लेख की शुरुआत से अपने-आप बन जाएगा।"
                />
              </label>

              <div className="ba-field">
                <span>पूरा लेख *</span>
                <small>
                  उप-शीर्षक के लिए toolbar में “Heading 2/3” चुनें — जैसे “रोग के कारण”, “लक्षण”, “क्या खाएँ, क्या न खाएँ”, “आयुर्वेदिक उपचार”।
                </small>
                <div className="ba-quill">
                  <ReactQuill theme="snow" value={form.content} onChange={(v) => set("content", v)} modules={modules} />
                </div>
              </div>

              {msg.text && <div className={msg.type === "ok" ? "ba-ok" : "appt-msg"}>{msg.text}</div>}

              <div className="ba-save">
                <button type="button" className="appt-btn" disabled={saving} onClick={() => save("published")}>
                  {saving ? "सेव हो रहा है…" : isEdit && form.status === "published" ? "बदलाव सेव करें" : "🚀 वेबसाइट पर प्रकाशित करें"}
                </button>
                <button type="button" className="ba-ghost" disabled={saving} onClick={() => save("draft")}>
                  {isEdit && form.status === "published" ? "वेबसाइट से हटाकर Draft करें" : "Draft सेव करें"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* =========================================
   एक भाषा का अनुवाद
========================================= */
function TranslationPanel({ postId, lang, slug, base, initial, onSaved }) {
  const L = BLOG_LANGS.find((l) => l.code === lang);
  const [tr, setTr] = useState({
    title: initial?.title || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link"],
        ["clean"],
      ],
    }),
    []
  );

  const save = async (remove = false) => {
    if (remove && !window.confirm(`${L.name} का अनुवाद हटाना है?`)) return;
    const body = remove ? { id: postId, lang, title: "", excerpt: "", content: "" } : { id: postId, lang, ...tr };
    if (!remove && !tr.content.replace(/<[^>]*>/g, "").trim()) {
      return setMsg({ type: "err", text: "अनुवाद का मुख्य भाग लिखें" });
    }
    setSaving(true);
    setMsg({ type: "", text: "" });
    try {
      const r = await axios.post("/api/clinic-blogs/admin-save-translation.php", body, { withCredentials: true });
      if (r.data?.success) {
        if (remove) {
          setTr({ title: "", excerpt: "", content: "" });
          onSaved(null);
        } else onSaved({ ...tr });
        setMsg({ type: "ok", text: "✅ " + r.data.message });
      } else setMsg({ type: "err", text: r.data?.message || "सेव नहीं हुआ" });
    } catch (e) {
      setMsg({ type: "err", text: e?.response?.status === 401 ? "Login समाप्त — दोबारा login करें" : "Server error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ba-form" lang={lang}>
      <p className="ba-tr-note">
        <strong>{L.name} ({L.en})</strong> — हिंदी लेख “{base.title}” का अनुवाद। फ़ोटो, रोग-वर्ग और link हिंदी लेख वाले ही रहते हैं।
        {initial && base.status === "published" && (
          <>
            {" "}
            <a href={postPath(slug, lang)} target="_blank" rel="noopener noreferrer">वेबसाइट पर देखें ↗</a>
          </>
        )}
      </p>
      <label className="ba-field">
        <span>शीर्षक ({L.name}) *</span>
        <input value={tr.title} onChange={(e) => setTr({ ...tr, title: e.target.value })} maxLength={250} />
      </label>
      <label className="ba-field">
        <span>छोटा सार ({L.name})</span>
        <textarea rows={3} value={tr.excerpt} onChange={(e) => setTr({ ...tr, excerpt: e.target.value })} maxLength={600} />
      </label>
      <div className="ba-field">
        <span>पूरा लेख ({L.name}) *</span>
        <div className="ba-quill">
          <ReactQuill theme="snow" value={tr.content} onChange={(v) => setTr((x) => ({ ...x, content: v }))} modules={modules} />
        </div>
      </div>
      {msg.text && <div className={msg.type === "ok" ? "ba-ok" : "appt-msg"}>{msg.text}</div>}
      <div className="ba-save">
        <button type="button" className="appt-btn" disabled={saving} onClick={() => save(false)}>
          {saving ? "सेव हो रहा है…" : `${L.name} अनुवाद सेव करें`}
        </button>
        {initial && (
          <button type="button" className="ba-ghost" disabled={saving} onClick={() => save(true)}>
            यह अनुवाद हटाएँ
          </button>
        )}
      </div>
    </div>
  );
}
