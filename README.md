# Aforro Dashboard

Sales-style dashboard built with **React** and **Vite** for the Aforro React assignment. It implements a multi-section layout (sidebar, header, stats, charts) and a **Users** table backed by the public **JSONPlaceholder** users API with search, sort, filter, and loading/error handling.

**Repository:** [github.com/Adityagandotra12/React-Assignment-Aforro](https://github.com/Adityagandotra12/React-Assignment-Aforro)

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+ (comes with Node)

---

## Quick start

```bash
git clone https://github.com/Adityagandotra12/React-Assignment-Aforro.git
cd React-Assignment-Aforro
npm install
npm run dev
```

Open the URL Vite prints in the terminal (typically **http://localhost:5173**).

---

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start Vite dev server with hot reload            |
| `npm run build`   | Production build to `dist/`                      |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Run ESLint on the project                        |

---

## Tech stack

| Area        | Choice                                                                 |
| ----------- | ---------------------------------------------------------------------- |
| UI          | [React 19](https://react.dev/) — functional components and hooks only  |
| Bundler     | [Vite 8](https://vite.dev/) with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) |
| Language    | JavaScript (ES modules, `.jsx`)                                        |
| Styling     | Global CSS — `src/index.css` (tokens, base), `src/App.css` (layout/UI) |
| Data        | Native [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (no Axios) |
| Linting     | ESLint 9 + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` |

No Tailwind, Bootstrap, Redux, or charting libraries.

---

## Project structure

```
React-Assignment-Aforro/
├── public/                 # Static assets (favicon, map image referenced by charts, etc.)
├── src/
│   ├── components/
│   │   ├── ChartSection.jsx    # Visitor, revenue, satisfaction, target, map, volume charts
│   │   ├── Dashboard.jsx       # Composes header + widgets + users table
│   │   ├── Header.jsx          # Title, search, language, notifications, user menu
│   │   ├── Sidebar.jsx         # Brand + nav links + “Pro” promo card
│   │   ├── StatsCards.jsx      # “Today’s Sales” summary cards
│   │   └── UsersTable.jsx      # Part 2: API table + toolbar
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Features

### Part 1 — Dashboard UI

- **Layout** aligned with the [Figma Sales Dashboard (Community)](https://www.figma.com/design/4uElaIOstOmgCYqGHMdX7C/Sales-Dashboard-Design--Community-?node-id=7922-16): sidebar, header, today’s sales strip, visitor chart, mid-row charts (revenue, satisfaction, target), bottom row (users, sales map, volume vs service level).
- **Responsive behavior:** wide screens use a fixed sidebar; narrower breakpoints collapse the sidebar into a horizontal strip; tables and wide widgets scroll horizontally where needed.
- **Charts:** SVG/CSS placeholders (lines, bars, stacked bars, map image)—no Recharts/Chart.js.

### Part 2 — Users table (JSONPlaceholder)

| Requirement        | Implementation |
| ------------------ | -------------- |
| Endpoint           | `GET https://jsonplaceholder.typicode.com/users` |
| Columns            | **Name**, **Email**, **Company name** (`company.name`), **City** (`address.city`) |
| Fetch              | `fetch` in `useEffect`, cleanup on unmount |
| Search             | Case-insensitive match on **name** or **email** |
| Sort               | **Name A–Z** / **Name Z–A** (`localeCompare`) |
| City filter        | Dropdown built from distinct cities in the loaded data; **All cities** clears filter |
| Reset              | Clears search, city, and sort (back to A–Z) |
| Loading / error    | Inline messages in the table card |

---

## API

All user rows come from:

`https://jsonplaceholder.typicode.com/users`

No API keys or `.env` file are required for this public endpoint.

---

## Static assets

The **Sales mapping** widget loads a map image from the app base URL, e.g. `public/world-map-custom.png` (referenced in `ChartSection.jsx`). Ensure any custom map file you use is placed under **`public/`** so Vite serves it at the site root.

---

## Production build

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` so you can verify the production bundle before deploy.

---

## Assumptions & decisions

- **Figma:** Used for overall structure, spacing, and hierarchy—not a pixel-perfect match.
- **Header search / notifications / language:** Presentational only (not connected to real search or APIs).
- **Navigation:** Sidebar links use in-page hashes (e.g. `#settings`); there is no client-side router.
- **Users table:** Filtering and sorting run **in the browser** on the dataset returned by the first successful fetch (no refetch per filter).

---

## License

Private / assignment use unless you add your own license.
