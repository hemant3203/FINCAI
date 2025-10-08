# 💰 FincAI — Expense Tracker

## Short overview
- Full-stack expense tracker (backend + frontend) for tracking income/expense, charts, and basic auth.  
- Repo layout:
  - `backend/` — Node/Express API and DB models  
  - `frontend/expense-tracker/` — Vite + React frontend (Tailwind, Recharts, react-icons)

- **Purpose:** Helps users manage personal finances, analyze spending trends, and maintain records efficiently.  
- **Target Users:** Individuals or small businesses who want a simple and visual way to track expenses and income.

---

## ⚡ Quick start (Windows)

1. Open two terminals.  

### Backend:
- `npm install`  
- Check scripts in `package.json` then run the appropriate script:  
  - `npm run dev` (if present) or  
  - `npm start / node server.js`  
- Ensure `.env` contains required variables (see `backend/README.md`).  
- **Tip:** Test backend APIs first using Postman or curl to verify they are working before connecting the frontend.

### Frontend:
- `npm install`  
- `npm run dev`  
- Open the URL shown by Vite (usually `http://localhost:5173`)  
- **Tip:** Ensure the backend server is running and CORS is configured correctly for local development.  

- **Quick check:** Open the browser console (F12 → Console) to see if any runtime errors appear when loading the frontend.

---

## 🛠️ Where to look for problems

- **Browser console** — runtime errors stop rendering components.  
- **Dev server output** (both terminals) — check for import errors, missing modules, or port conflicts.  
- **Network tab** — verify API calls succeed (status 200) and data is returned correctly.  
- **Check `package.json` scripts** — ensure you are running the correct dev scripts for frontend and backend.

---

## 🔗 Links
- Backend README: `./backend/README.md`  
- Frontend README: `./frontend/expense-tracker/README.md`  

---

# 🏗️ Backend — FincAI (Expense Tracker)

### Overview
- **Express API** with controllers for auth, dashboard, income, expense.  
- **Mongoose models** stored in `models/`.  
- **File uploads** stored in `uploads/` (local). See `middleware/uploadMiddleware.js`.  
- **Security:** Uses JWT authentication to protect routes and ensure only authenticated users can access their own data.  
- **Scalability:** Modular route structure allows adding new features easily (e.g., reports, analytics, or additional resources).  

### Prerequisites
- Node.js (16+)  
- MongoDB (local or cloud)  
- Optional: Postman for testing APIs  

### Environment (`.env`)
Provide these values in `backend/.env` (names below are typical — confirm in `server.js` / `config/db.js`):  
- `MONGO_URI` or `DB_URI` — MongoDB connection string  
- `JWT_SECRET` — secret for signing tokens  
- `PORT` — server port (optional)  
- Any cloud/upload credentials if used  

**Tip:** Keep your `.env` file private and do not push it to GitHub.  

### Install & run (Windows)
```bash
cd c:\Users\praja\OneDrive\Desktop\FincAI\backend
npm install
npm run dev     # or npm start / node server.js
