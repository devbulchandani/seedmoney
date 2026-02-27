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

### 1. Install Dependencies
Run the following command at the root of the project to install all root, backend, and frontend dependencies automatically:
```bash
npm install
```

### 2. Seed the Database
Before running the application for the first time, populate the MongoDB database with sample subjects and practicals:
```bash
npm run seed
```

### 3. Run the Development Servers
Start both the backend server and the frontend Vite dev server concurrently:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

## Features Included in Phase 1
- **Dashboard**: View a grid of all available subjects, displaying their names, semesters, courses, and descriptions.
- **Subject Details**: A comprehensive view of a specific subject with tabs for:
  - **Practicals**: List of practical problem statements and a collapsible view for the solution code.
  - **Notes & Resources**: Unit-wise study materials.
- **Modern UI**: Polished, minimalistic white interface with soft gray sections `#f9fafb`, subtle shadows, and rounded corners for a premium academic experience. Responsive across all devices.
