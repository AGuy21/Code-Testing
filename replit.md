# Multi-Project Repository

## Overview
This repository contains multiple projects the user is working on, including web apps, mobile apps (React Native/Expo), and Python scripts.

## Current State
The main runnable project is **CSNHS** - a React/Vite web application for the Computer Science National Honor Society.

## Project Structure
- **CSNHS/** - React + Vite + TypeScript + Tailwind CSS web app (main project, running on port 5000)
- **Astronomy/** - React + Vite web app with Firebase
- **Electrathon/** - React + Vite web app with Firebase
- **Learning-React-JS/** - React + Vite learning project
- **App/, Budget_Buddy/, Canvas_Connect/, Test/, Themes/** - React Native/Expo mobile apps
- **Python/** - Python scripts
- **pet-adopt-app/, Youtube-Copy/** - Additional projects
- **clerkApp/** - Clerk authentication app

## Running the Project
The CSNHS project is configured as the main workflow and runs on port 5000 with:
```bash
cd CSNHS && npm run dev
```

## Tech Stack (CSNHS)
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM

## Deployment
Static deployment configured for CSNHS - builds to `CSNHS/dist`.
