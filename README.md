# PERMISSIONLENS

> **"Understand App Permissions. Protect Your Privacy."**

PermissionLens is an educational privacy-awareness web application engineered for college hackathons, computer science demonstrations, and cybersecurity workshops. It translates mobile application permissions into plain English, categorizes accessible device capabilities, and introduces the **Permission Impact Simulator** to diff and analyze permission creep between application configurations.

---

## 1. Project Overview

Mobile operating systems constantly prompt users with obscure permission consent dialogues. As applications update over time, permissions expand incrementally—a phenomenon known as **permission creep**.

PermissionLens provides:
1. **Plain-English Translations:** Transparent breakdowns of what data and hardware each permission can access (camera feeds, ambient microphone sound, GPS coordinates, address books, file storage).
2. **Permission Impact Simulator:** An interactive side-by-side comparison engine that calculates **Added**, **Removed**, and **Retained (Unchanged)** permissions between two application states.
3. **Educational Privacy Insights Engine:** A rule-based assessment that flags high-consideration capabilities and recommends questions to ask and device controls to configure.
4. **Printable Comparison Reports:** Browser-native A4/Letter formatted audit sheets ready for offline distribution and review.
5. **No External AI or Paid API Dependencies:** Fully functional locally out of the box using structured JSON datasets and clean JavaScript.

---

## 2. Technology Stack

- **Frontend:**
  - Semantic HTML5
  - Modern CSS3 (Custom design system based on Navy/Blue/Gold palette with subtle elevations and print stylesheets)
  - Modular Vanilla JavaScript (ES6+; no bundler or heavy framework required)
- **Backend:**
  - Node.js (v18+)
  - Express.js (REST API, input validation, security headers, static file serving)
- **Initial Data Storage:**
  - Local JSON datasets (`data/permissions.json`, `data/profiles.json`)
- **Future Database (Architecture Ready):**
  - Supabase PostgreSQL (Repository pattern isolates data access; see `docs/supabase-integration.md`)
- **Testing:**
  - Built-in Node.js Test Runner (`node:test`, `node:assert`) with automated API and simulation verification

---

## 3. Design System & Color Palette

Designed according to cybersecurity dashboard best practices:
- **Navy Blue:** `#173B63` (Authority, structure, primary headings)
- **Blue:** `#2F6DB2` (Interactive links, secondary highlights)
- **Soft Gold:** `#F4C542` (Urgency, key action highlights)
- **Ice Blue:** `#DCEAF7` (Surface highlights, info badges)
- **Warm White:** `#F7F4EB` (Background warmth)
- **White:** `#FFFFFF` (Surface cards)
- **Consideration Accents:** Higher (`#EF4444`), Moderate (`#F59E0B`), Lower (`#10B981`)
- **Typography:** Outfit (Headings), Inter (Body text), Source Code Pro (Technical identifiers)

---

## 4. Main Features

### A. Home Dashboard
- Hero banner with problem statement and call-to-action navigators.
- Dynamic counters derived in real time from the permission database.
- 4-step "How PermissionLens Works" educational workflow.
- Preset button to immediately launch the canonical test scenario.

### B. Permission Explorer
- 12 comprehensive categories: Camera, Microphone, Location, Contacts, Photos & Media, Files & Storage, Notifications, Calendar, Nearby Devices, Bluetooth, Phone, Sensors.
- Instant search across permission names, descriptions, categories, and accessible data.
- Detail inspector modal detailing:
  - Plain-English explanation
  - Legitimate use cases
  - What information may be accessible
  - Privacy questions users should ask before granting
  - Potential privacy considerations
  - Suggested user controls (e.g. "While using app", "Approximate location")
- One-click shortcuts to add any permission directly to the Simulator's "Before" or "After" set.

### C. Permission Impact Simulator (Core Innovation)
- Side-by-side comparison workspace:
  - **Before Configuration** (Baseline state / Illustrative profile)
  - **After Configuration** (Target state / Illustrative profile)
- Pre-built illustrative application profiles:
  - Messaging Application
  - Photo-Editing Application
  - Navigation & Maps Application
  - Video-Conferencing Application
  - Shopping & E-Commerce Application
  - Fitness & Health Application
- Interactive custom checkboxes with "Select All" and "Clear All" helpers.
- Dynamic Set Calculation:
  - **ADDED:** Present only in After (new data exposure and sensor capabilities).
  - **REMOVED:** Present only in Before (revoked access; privacy gain).
  - **UNCHANGED:** Present in both (retained access).
- Controls:
  - **Compare Permissions:** Evaluates differences via `POST /api/compare`.
  - **Swap Sets:** Inverts comparison direction to observe rollbacks.
  - **Reset Both:** Clears all selections.
  - **Canonical Demo Preset:** Evaluates `['camera', 'notifications']` vs `['camera', 'location', 'microphone', 'notifications']`.

### D. Educational Privacy Insights Engine
- Deterministic, transparent rules engine (no black-box scoring).
- Categorizes overall set posture into:
  - **Higher consideration:** Live sensor access (mic, camera) or identity data (location, contacts).
  - **Moderate consideration:** Stored files, media library, Bluetooth, motion sensors.
  - **Lower consideration:** Alerts, notifications, vibration.
- Highlights specific questions and mobile OS privacy settings (e.g., scoping photo pickers, revoking background location).

### E. Printable Comparison Report
- Dedicated browser-native print stylesheet (`@media print`).
- Formats comparisons cleanly for standard A4 and Letter paper.
- Hides interactive buttons, navigation, and inputs while preserving audit details and official educational disclaimers.

---

## 5. REST API Documentation

Base URL: `http://localhost:3000/api`

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/health` | `GET` | Returns backend operational status, version, and server uptime. |
| `/permissions` | `GET` | Returns full permission library. Supports `?q=search` and `?category=Name`. |
| `/permissions/:id` | `GET` | Returns full definition and guidance for a single permission ID. |
| `/profiles` | `GET` | Returns illustrative application profiles. |
| `/profiles/:id` | `GET` | Returns a specific illustrative profile by ID. |
| `/compare` | `POST` | Accepts `{ before: string[], after: string[] }`. Validates IDs, deduplicates, and returns added, removed, unchanged, counts, summary, and privacy considerations. |
| `/insights` | `GET` | Returns dataset-derived statistics and transparent rule descriptions. |

---

## 6. Installation & Startup Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application
```bash
# Start production server
npm start

# Or start in watch/development mode
npm run dev
```

### 3. Open in Browser
Navigate to:
```
http://localhost:3000
```

---

## 7. Running the Automated Test Suite

PermissionLens includes comprehensive unit and integration tests covering:
- Canonical comparison scenario (`camera` + `notifications` vs `camera` + `location` + `microphone` + `notifications`)
- Empty sets, identical sets, and total revocation
- Array normalization, deduplication, and case insensitivity
- Server input validation (non-strings, non-arrays, unauthorized/invalid permission IDs)
- API endpoints (`/api/health`, `/api/permissions`, `/api/profiles`, `/api/compare`, `/api/insights`)
- 404 handlers and static asset verification

Execute the tests with:
```bash
npm test
```

All 25 tests execute in under 1 second without requiring external network connections.

---

## 8. Limitations & Transparency Notice

> **Mandatory Disclaimer:**
> "PermissionLens is an educational privacy-awareness tool. It explains permission capabilities and compares selected permission sets using curated data and transparent rules. It does not automatically inspect installed applications, verify actual application behavior, or establish whether an application is malicious. Operating-system restrictions and implementation details affect how permissions are used."

---

## 9. Supabase PostgreSQL Integration

PermissionLens separates data access from business logic using the **Repository Pattern** (`src/repositories/permissionRepository.js` and `src/repositories/supabaseRepository.js`). 

Supabase PostgreSQL is fully connected:
1. **Database Tables**: `permissions`, `profiles`, and `comparison_history` have been provisioned in Supabase PostgreSQL with Row Level Security (RLS) enabled.
2. **Repository Adapter**: `src/repositories/supabaseRepository.js` handles data fetching, field mapping, and connection management using `@supabase/supabase-js`.
3. **Graceful Fallback**: If `SUPABASE_URL` or `SUPABASE_ANON_KEY` are not provided, the application seamlessly falls back to local JSON repositories (`data/permissions.json` and `data/profiles.json`).
4. **Environment Variables**: Managed via `.env` (`SUPABASE_URL` and `SUPABASE_ANON_KEY`).

---

## 10. Deployment

PermissionLens is ready for deployment on any standard Node.js hosting platform (Render, Railway, Fly.io, Heroku, or AWS Elastic Beanstalk):
- Set the environment variable `PORT` (or let the host assign it dynamically).
- Deploy using `npm start`.
