# BugWise AI

BugWise AI is a standalone, API-first bug analysis platform. It sends structured bug reports to Google Gemini, validates the JSON response, stores successful analyses in MongoDB, and provides a responsive dashboard for review.

## Setup

### Backend

```bash
cd backend
npm install
copy .env.example .env
```

Set `MONGODB_URI` and `GEMINI_API_KEY` in `backend/.env`, then run:

```bash
node server.js
```

The API runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server runs at the URL shown in the terminal.

## API

- `GET /api/health` checks server availability.
- `POST /api/analyze-bug` analyzes and stores a report. Required fields: `title`, `description`, `programmingLanguage`. Optional fields: `errorMessage`, `expectedBehavior`, `actualBehavior`, `stepsToReproduce`.
- `GET /api/analyses` lists analyses. Supports `search`, `category`, `severity`, `priority`, and `programmingLanguage` query filters.
- `GET /api/analyses/:id` returns one analysis.
- `PATCH /api/analyses/:id/saved` accepts `{ "isSaved": true }` or `{ "isSaved": false }`.
- `DELETE /api/analyses/:id` deletes an analysis.

The analysis response contains `category`, `programmingLanguage`, `severity`, `priority`, `summary`, `possibleCause`, `suggestedFix`, `developerAdvice`, and `testingSuggestions`. Gemini is accessed only by the backend; API keys are never sent to the browser.

MongoDB is required for analysis persistence. If it is unavailable, the API returns `503` with a clear message while the server remains available for health checks.
