# BugWise AI

AI-assisted bug analysis web application that helps developers analyze
software bug reports and generate structured debugging insights.

BugWise AI uses a React.js frontend, Node.js/Express backend, Google Gemini
for AI-assisted analysis, and MongoDB for storing successful analyses.

## Features

- Submit structured software bug reports
- AI-assisted bug analysis using Google Gemini
- Bug categorization
- Severity and priority classification
- Possible cause analysis
- Suggested fixes
- Developer advice
- Testing suggestions
- Analysis history
- Search and filtering
- Save and delete analyses
- REST API architecture
- Input validation and error handling
- Responsive dashboard interface

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB

### AI Integration

- Google Gemini API

### Development Tools

- Git
- GitHub
- VS Code
- npm

## Project Architecture

```text
BugWise AI
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```
