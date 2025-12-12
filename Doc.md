# MediCare-Gen-AI — Client Documentation

## Overview
- **Purpose:** The client is a single-page React application (Vite) that provides clinicians and patients an interactive dashboard to explore medical biomarker data, visualize trends, and consume AI-generated insights produced by the backend inference service.
- **Audience:** Frontend engineers, UX designers, clinical informaticians, and integrators.

## Technologies
- **Framework:** React (Vite)
- **Styling:** CSS modules / global styles (see `src/App.css`, `src/index.css`)
- **Build / Dev:** Vite

## Project Structure (client/)
- `index.html` — app entry HTML
- `src/main.jsx` — app bootstrap
- `src/App.jsx` — main app container and route handling
- `src/pages` — page-level React components: `landing`, `dashboard`, `loadingScreen`, `medicalAILoader`
- `src/pages/components` — tabbed components presenting biomarker groups, medication, lifestyle, organs, trends, etc.

## UX / UI Design Principles
- **Clarity:** Present biomarker names, units, and reference ranges clearly next to values.
- **Contextualization:** Always provide clinical context — e.g., “normal range”, “trend direction”, and short plain-language interpretations of what a change means.
- **Progressive Disclosure:** Show high-level summary first with the option to expand into details and raw data.
- **Color and Accessibility:** Use color primarily for emphasis (trends/alerts) but never rely on color alone; components meet WCAG contrast ratios and support screen readers.
- **Confidence & Uncertainty:** Display AI confidence/uncertainty where applicable (e.g., probability, model confidence score) and include brief guidance on interpretation.

## Key Screens & Components
- **Landing:** App description, login/consent flow (if applicable).
- **Dashboard:** Patient summary, top risks, and quick actions. Uses `overviewTab`, `riskTab`, `TrendsTab`.
- **Biomarkers Tab:** Shows grouped biomarkers (organ-based or system-based), units, current value, historical sparkline, delta from prior visit, and clinical interpretation.
- **Medications Tab:** Medication list, interactions/notes provided by the AI (if available), cross-checking with known medication–biomarker interactions.
- **Lifestyle Tab:** Shows lifestyle inputs (diet, exercise, smoking) and how they map to biomarkers and recommendations.

## Biological Background (Client-Facing)
This section provides non-technical biological context used by the UI to present results. The same concepts are described in the backend docs (for implementers) — this copy focuses on what the UI shows and why.

- **Biomarkers:** Quantitative measurements (e.g., HbA1c, LDL-C, Creatinine) that reflect physiological states. UI displays:
	- **Name and abbreviation** (e.g., Hemoglobin A1c — HbA1c)
	- **Value and unit** (e.g., 6.5 %)
	- **Reference range** (sex/age-specific when available)
	- **Clinical flag**: Low / Normal / High
- **Reference Ranges & Context:** Reference ranges depend on population and laboratory methods. The client displays ranges provided by the backend; when a range is missing, UI indicates "reference range not provided" and avoids definitive clinical claims.
- **Trend Interpretation:** Short phrases generated from the model such as "rising", "stable", or "decreasing" are shown with timestamps. Trends are computed from raw time-series values on the backend and rendered client-side as sparklines.
- **Risk Insights:** AI-generated risk scores (e.g., cardiovascular risk) are presented qualitatively (low/medium/high) with short plain-English rationales. The client emphasizes that these are probabilistic and not diagnostic.

## Data Flow (Client-side)
1. User action or scheduled refresh triggers a request to the backend API (`/api/patient/:id/summary`, `/api/prompt`, `/api/uploads`).
2. Client sends minimal, necessary identifiers (patient ID, auth token) — no raw sensitive documents are stored in the client beyond session memory.
3. Backend returns structured JSON: biomarker list, trends, recommendations, metadata (reference ranges, timestamps, model confidence).
4. Client renders the data, caches a short-lived copy in memory (or sessionStorage if needed), and allows the user to request deeper analysis (which triggers further prompts to `/api/prompt`).

## Integration with Backend APIs
- **Authorization:** Every request to backend APIs must include an authorization token (JWT or session cookie). Follow the backend's auth scheme.
- **Endpoints used by client:**
	- `GET /api/patient/:id/summary` — returns biomarker values, trends, and risk summaries.
	- `POST /api/prompt` — sends free-text or structured prompts to trigger AI-powered explanations or deeper analyses.
	- `POST /api/uploads` — used to upload CSVs or lab reports; upload responses return parsed metrics.

## Security & Privacy (Client Responsibilities)
- **Local Storage:** Avoid persisting PHI to localStorage. Use sessionStorage or ephemeral memory and clear data on logout.
- **Transport:** Use HTTPS for all API requests. Reject mixed-content requests.
- **Consent:** If the product handles PHI/medical decisions, ensure explicit user consent flows and show privacy notices.

## Accessibility
- All interactive elements must have keyboard focus states.
- Provide ARIA labels where semantic HTML is insufficient (charts, interactive widgets).
- Provide text alternatives for charts: a small textual summary for screen-reader users.

## Testing & Validation (Client)
- Unit tests for key components (rendering biomarker rows, tables) and integration tests for the main user flows.
- E2E tests should cover login, summary load, and prompt submission flows.

## Local Development
1. Install dependencies: `npm install` in the `client` directory.
2. Start dev server: `npm run dev` (Vite).

## UX Copy & Clinical Wording Guidelines
- Use cautious language: "suggests", "may indicate", "associated with".
- Avoid definitive diagnostic claims. Provide links to source information and instruct users to consult clinicians for medical decisions.

## References and Further Reading
- Link to backend `ReadMe.md` for technical and biological implementation details.
- Clinical references for common biomarkers (e.g., ADA for HbA1c, KDIGO for creatinine/kidney function) should be included in the product's documentation repository where appropriate.

---

