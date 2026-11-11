# nadivaidya.in — Nadi Vaidya Clinics website (Karnal & Vrindavan)

Handoff notes for Claude. Owner talks in Hindi/Hinglish; reply in simple Hindi.

## How the site works
- React (Vite) frontend in `src/`, PHP + MySQL API in `api/` (cPanel hosting on GoDaddy, managed by the developer).
- **Auto-deploy:** every push to `main` runs `.github/workflows/deploy.yml` → builds → FTPS upload to hosting (~2–3 min). Secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `DB_PASSWORD` are set in GitHub. Never put passwords in code.
- DB password is read from `api/config/db.secret.php` (created by the deploy, not in git).
- `.npmrc` has `legacy-peer-deps=true` (bootstrap 4 vs jquery 4) — keep it.
- Old Gurukul/Pharmacy URLs are 301-redirected in `public/.htaccess`.

## Where things live
- **All clinic facts** (address, phone, OPD time/dates, doctors, celebrity line): `src/data/clinics.js`
- Therapies (13, with photos): `src/data/therapies.js`, `src/components/Therapies.jsx`, images in `src/assets/images/therapies/`
- Home: `src/pages/Home.jsx` · Clinic pages: `src/pages/ClinicPage.jsx` (`/karnal-clinic`, `/vrindavan-clinic`)
- About Us: `src/pages/AboutUs.jsx` (+ team `src/components/OurTeam.jsx`, org cards `src/components/OurOrgs.jsx`)
- Health Blog (स्वास्थ्य लेख): public `/blog` (`src/pages/Blog.jsx`) + `/blog/:slug` (`src/pages/BlogPost.jsx`), latest 3 on Home (`src/components/BlogCards.jsx`). Disease categories: `src/data/blogCategories.js`. API `api/clinic-blogs/*` (table `clinic_blogs`, auto-created; old unrelated `blogs` table — don't touch). Cover photos → `/uploads/blogs/` (deploy never touches `uploads/`). Admin: `/admin/blogs`, `/admin/add-blog` (`src/admin/pages/BlogEditor.jsx`). To publish an article from code (no admin login needed): add `api/clinic-blogs/seed/<name>.json` (+ cover in `public/blog-covers/`) — inserted once on the next API call; admin edits/deletes are never overwritten.
- Online booking: `src/pages/BookAppointment.jsx` + `api/appointments/*` (table `clinic_appointments`, auto-created; an older unrelated `appointments` table exists — don't touch). Admin list: `/admin/appointments`.

## Business rules (from the owner)
- OPD 8:00 AM–1:00 PM, both clinics. Karnal 1st–10th, Vrindavan 11th–month end (incl. 31st). All three doctors at both clinics. All therapies at both clinics.
- Booking: 15-min slots, 1 patient per slot, no closed days; WhatsApp + call also offered.
- Karnal: AyurVaidya Wellness, 4 R.K. Puram, Gali No. 10, Kunjpura Road, Karnal 132001 — 99922 42267 (map pin https://maps.app.goo.gl/z2YwcKdLS9Q5JnwS9).
- Vrindavan: Vrindavan Swasthya Seva Kendra, Shop No. 5, Radha Rani Palace, near Shri Radha Teela, Parikrama Marg, Vrindavan, Mathura 281121 — 83960 66555.
- Doctors: Dr. Ajit Singh Yadav (BAMS), Dr. Saloni Yadav Vashist (BAMS, MD (DN)), Dr. Mohit Vashist (BAMS, MD (AM)). English spelling "Vashist"; Hindi "वशिष्ठ".
- Line under doctors/hero: "बॉलीवुड, शीर्ष व्यापारिक घरानों एवं राजपरिवारों के परामर्शदाता".

## Style rules
- Hindi first and bold; English smaller, not bold.
- Therapy name spelling: "विद्धकर्म" (correct Ayurvedic name).
- Org cards (Pharmacy / Gurukul / Trust) only on About Us. No Gallery / Dosha Diet on home or menus.
- Sister sites: Gurukul = nadivaidya.com (Shopify), Pharmacy = nadivaidyapharmacy.com.

## Pending
- Make this repo Private; confirm the developer changed the DB password (old one is in git history).
- HD replacement photo for Viddhakarma with correct spelling on the board.
