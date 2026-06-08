# RepoExplorer

A full-stack GitHub repository explorer that allows users to search GitHub profiles, browse repositories, view repository statistics, and analyze language usage. The application uses a React frontend and an Express backend that communicates with the GitHub REST API while implementing caching and rate limiting for improved performance and reliability.

---

# Live Demo

**Frontend:** https://your-vercel-app.vercel.app

**Backend API:** https://your-render-service.onrender.com

---

# Tech Stack

## Frontend

* **React.js** – Component-based UI development.
* **Vite** – Fast development server and build tool.
* **React Router** – Client-side routing.
* **Axios** – API communication.
* **Tailwind CSS** – Utility-first styling.
* **React Icons** – Icon library for UI elements.

## Backend

* **Node.js** – JavaScript runtime.
* **Express.js** – REST API framework.
* **Axios** – GitHub API communication.
* **Node Cache** – In-memory response caching.
* **Express Rate Limit** – API protection and rate limiting.
* **dotenv** – Environment variable management.
* **CORS** – Cross-origin resource sharing.

## DevOps

* **GitHub Actions** – CI/CD pipeline.
* **Vercel** – Frontend deployment.
* **Render** – Backend deployment.
* **Git & GitHub** – Version control.

---

# Features

* Search GitHub users by username.
* View profile information and statistics.
* Browse public repositories.
* Sort repositories by update date, stars, or name.
* Language usage visualization.
* API response caching.
* Rate limiting protection.
* Responsive user interface.
* CI/CD workflow with GitHub Actions.

---

# How to Run Locally

## Prerequisites

* Node.js (v18 or later)
* Git

## Clone Repository

```bash
git clone https://github.com/your-username/repoexplorer.git
cd RepoExplorer-main
```
## Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Update the values in `.env` with your GitHub API credentials.

Start the server:

```bash
npm start
```

## Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Update the frontend environment variables if required.

Start the frontend:

```bash
npm run dev
```
## Environment Variables

Both the client and server contain a `.env.example` file that documents all required environment variables.

```text
client/.env.example
server/.env.example
```

Copy each file to `.env` and provide the appropriate values before running the application.


# API Documentation

Base URL:

```text
/api
```

---

## Get User Profile

### Request

```http
GET /api/user/:username
```

### Example

```http
GET /api/user/torvalds
```

### Response

```json
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "bio": "Software Engineer",
  "avatar_url": "https://...",
  "followers": 100000,
  "following": 0,
  "public_repos": 8,
  "location": "Portland",
  "blog": "",
  "hireable": false
}
```

---

## Get User Repositories

### Request

```http
GET /api/user/:username/repos?page=1&sort=updated
```

### Query Parameters

| Parameter | Description             |
| --------- | ----------------------- |
| page      | Repository page number  |
| sort      | updated, stars, or name |

### Example

```http
GET /api/user/torvalds/repos?page=1&sort=updated
```

### Response

```json
{
  "repos": [
    {
      "id": 123,
      "name": "linux",
      "description": "Linux kernel source tree",
      "html_url": "https://github.com/...",
      "language": "C",
      "stargazers_count": 100000,
      "forks_count": 30000,
      "open_issues_count": 500,
      "updated_at": "2025-01-01T00:00:00Z",
      "homepage": "",
      "topics": [],
      "visibility": "public"
    }
  ],
  "languages": {
    "C": 5,
    "Python": 2
  }
}
```

---

## Get Language Statistics

### Request

```http
GET /api/user/:username/languages
```

### Example

```http
GET /api/user/torvalds/languages
```

### Response

```json
{
  "C": 10,
  "Python": 3,
  "JavaScript": 2
}
```

---

## Error Response

```json
{
  "message": "User not found"
}
```

---

# Project Structure

```text
RepoExplorer-main/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── LanguageCard.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── RepoCard.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useGithubSearch.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── services/
│   │   │   └── githubApi.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formatNumber.js
│   │   │   └── sortRepos.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── data.json
│   │ 
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── cache.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   │
│   │   ├── routes/
│   │   │   └── github.js
│   │   │
│   │   ├── services/
│   │   │   └── GithubService.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

# Next Steps

If given additional time, the following enhancements would be implemented:

* Repository search and filtering.
* Infinite scrolling or pagination controls.
* Dark mode support.
* GitHub contribution graph integration.
* Repository analytics and charts.
* GitHub OAuth authentication.
* User favorites and saved profiles.
* Monitoring and logging infrastructure.

---

# Author

**Manoj Chauhan**

GitHub: https://github.com/Manoj72-dev
