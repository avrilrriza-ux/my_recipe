# My Recipe

> A seafood recipe browsing app built with React, Redux Toolkit, and the MealDB API. Search, filter, and explore seafood dishes — complete with scalable ingredients, step-by-step instructions, suggested recipes, and a user review system.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Group Members](#group-members)

---

## About

My Recipe is a single-page application that lets users discover and explore seafood recipes fetched live from [TheMealDB](https://www.themealdb.com/) public API. Users can search recipes by name, filter by cooking method, adjust serving sizes, and leave star-rated reviews — all without needing an account or backend.

---

## Features

- **Search & Filter** — Search recipes by name and filter by cooking method (Fried, Grilled, Steamed, Baked, Soup)
- **Pagination** — Browse recipes in pages of 9
- **Scalable Ingredients** — Adjust serving sizes (1–12) and ingredient amounts update automatically
- **Suggested Recipes** — Each detail page shows 3 randomly suggested seafood recipes
- **User Reviews** — Write star-rated reviews with a title and comment; reviews persist in localStorage
- **Responsive Layout** — Works across desktop and mobile screen sizes

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev) | UI library |
| [Vite 8](https://vite.dev) | Build tool & dev server |
| [Redux Toolkit](https://redux-toolkit.js.org) | State management |
| [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) | API data fetching & caching |
| [React Router DOM v7](https://reactrouter.com) | Client-side routing |
| [TheMealDB API](https://www.themealdb.com/api.php) | Recipe data source |

---

## Prerequisites

Make sure you have the following installed before proceeding:

| Tool | Version | Link |
|------|---------|------|
| `Node.js` | >= 18.x | [nodejs.org](https://nodejs.org) |
| `npm` | >= 9.x | [npmjs.com](https://npmjs.com) |
| `Git` | any | [git-scm.com](https://git-scm.com) |

> No API key is required. TheMealDB's public API (v1) is free and open to use.

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/avrilrriza-ux/my_recipe.git
   cd my_recipe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

---

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Project Structure

```
my_recipe/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── app/
│   │   └── store.js          # Redux store configuration
│   ├── assets/               # Static images
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Pagination.jsx
│   │   ├── RecipeCard.jsx
│   │   └── SearchBar.jsx
│   ├── features/
│   │   └── mealApi.js        # RTK Query API slice (TheMealDB)
│   ├── pages/
│   │   ├── HomePage.jsx      # Recipe listing with search & filter
│   │   └── RecipeDetailPage.jsx  # Full recipe view with reviews
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## API Reference

This project uses the free public [TheMealDB API](https://www.themealdb.com/api.php) — no authentication needed.

| Endpoint | Description |
|----------|-------------|
| `GET /filter.php?c=Seafood` | Fetch all seafood meals |
| `GET /lookup.php?i={id}` | Fetch full details of a meal by ID |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

This project is for personal/educational use. No license has been specified.

---

## Group Members
- De Leon, Rowella Marie T.
- Urriza, Avril Faye O.
- Dominguita, Arabelle M.
- Agustines, Lord Yngvvie B.
- Mendez, Jed Salvador S.
