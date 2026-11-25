// src/data/videos.js
// Home page के वीडियो। नया वीडियो जोड़ना हो तो सबसे ऊपर एक पंक्ति जोड़ें (सबसे नया ऊपर)।
// driveId: Google Drive वीडियो का ID (link .../file/d/<ID>/view) — Drive में "Anyone with the link → Viewer" होना चाहिए।
// youtubeId: YouTube पर हो तो उसका ID (driveId की जगह)।
// blogSlug: इस विषय का स्वास्थ्य लेख (हो तो "पूरा लेख पढ़ें" बटन दिखेगा)।

export const VIDEOS = [
  {
    driveId: "1i3XV8FRfm_VGO9QZds7cVK4aVM3-_vFp",
    titleHi: "डायबिटीज़ (मधुमेह) — नाड़ी वैद्य की सलाह",
    titleEn: "Diabetes — advice from the Nadi Vaidya",
    blogSlug: "diabetes-ayurveda-diet-lifestyle",
  },
];

export const videoEmbedUrl = (v) =>
  v.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`
    : `https://drive.google.com/file/d/${v.driveId}/preview`;
