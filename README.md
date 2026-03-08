# SeedMoney MVP

SeedMoney is a modern university academic platform MVP built with the MERN stack (MongoDB, Express, React, Node.js). It provides a clean, minimalistic white-themed UI for students to view subjects, practicals, and notes.

## Tech Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS (v4), React Router DOM, Axios
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose)

## Architecture
Three-tier architecture: Frontend (React) → Express API (Backend) → MongoDB

## Prerequisites
- Node.js (v18+ recommended)

## Setup and Running the Project

The project is structured as a monorepo with `frontend` and `backend` directories. You can manage everything from the root directory.

### 1. Environment Variable Setup
Before starting, ensure you have correctly configured the backend variables. Navigate to `/backend/.env` and insert your MongoDB URI and Piston API URL:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
PISTON_URL=http://localhost:2000/api/v2/execute
```

Note: The project uses Piston API for code execution. You can either:
- Run Piston locally using Docker: `docker run -p 2000:2000 ghcr.io/engineer-man/piston`
- Use a hosted Piston instance

### 2. Install Dependencies
Run the following command at the root of the project to install all root, backend, and frontend dependencies automatically:
```bash
npm install
```

### 3. Seed the Database
Before running the application for the first time, populate the MongoDB database with sample subjects and practicals:
```bash
npm run seed
```

### 4. Run the Development Servers
Start both the backend server and the frontend Vite dev server concurrently:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5001`

## Features Included in Phase 1 & 2
- **Dashboard**: View a grid of all available subjects with advanced filtering and search capabilities:
  - Search subjects by name or description
  - Filter by semester
  - Filter by course (B.Tech, BCA, B.Sc CS)
  - Active filter indicators
  - Responsive grid layout with modern card design
- **Subject Details**: A comprehensive view of a specific subject with tabs for:
  - **Practicals**: List of practical problem statements with "Open IDE" button that launches a full-screen split-view coding environment
  - **Notes & Resources**: Drive links to study materials organized by units
  - **Interview Questions (PYQs)**: Company-specific previous year questions with two types:
    - **MCQ Questions**: Multiple choice questions that open in a new tab with interactive answer submission and instant feedback
    - **Coding Questions**: Opens in a full-screen IDE with problem statement and code editor
  - **Viva Questions**: MCQ-based viva questions with difficulty levels, instant feedback, and explanations
- **Interactive Code Editor**: Full-screen IDE experience with:
  - Split-view layout (problem on left, code editor on right)
  - Real-time code execution powered by Piston API
  - Support for C, C++, Java, and Python
  - Syntax highlighting with CodeMirror
  - Solution hints available on demand
- **MCQ System**: Interactive multiple-choice question interface with:
  - Four options per question
  - Submit and instant feedback
  - Correct answer highlighting
  - Detailed explanations
  - Try again functionality
  - Opens in new tab for focused practice
- **Modern UI**: Premium, minimalistic design with:
  - Gradient accents and modern color schemes
  - Smooth animations and transitions
  - Rounded corners and soft shadows
  - Responsive across all devices
  - Improved typography and spacing
  - Color-coded difficulty badges (Easy/Medium/Hard)
