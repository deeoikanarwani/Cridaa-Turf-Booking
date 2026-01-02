# Backend Example – Cridaa Turf Booking API

This folder contains a minimal **Node.js + Express** backend that matches the assignment requirements. It uses a **JSON file as a simple database**.

> Important: Due to temporary laptop and terminal issues on my side, this backend was not executed during development, but it is complete and ready to run on a normal Node environment.

## Tech Stack

- Node.js
- Express
- CORS
- JSON file as storage (`slots.json`)

## Data Model

The `slots.json` file stores all time slots for a single court:

```json
[
  { "id": 1, "time": "06:00 - 07:00", "isBooked": false }
]
