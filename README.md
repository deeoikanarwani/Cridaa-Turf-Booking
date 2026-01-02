# Cridaa Turf Booking – Full Stack Mini App

Mini turf / court booking application for Full Stack Developer Intern assignment.

## Objective

- Allow a user to:
  - View available time slots for a single court/turf.
  - Select a slot and book it.
- Implement a Node.js API with basic persistence using a JSON file.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express, CORS  
- **Storage:** JSON file (`slots.json`) acting as a simple database

## Frontend

- React app under `frontend/`
- Pages:
  - Single booking page
- Features:
  - View slots (`GET /api/slots`)
  - Book slot (`POST /api/slots/:id/book`)
  - Simple login bar to simulate authentication (user name required before booking)
  - Mobile responsive UI built with Tailwind CSS

## Backend

- Express app under `backend/`
- Endpoints:
  - `GET /api/slots` – fetch all slots
  - `POST /api/slots/:id/book` – book a slot (update `isBooked`)
  - `POST /api/auth/login` – example login endpoint (returns fake token)

- Data persisted in `backend/slots.json`.

## How to Run (when environment allows)

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
