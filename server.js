const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // parse JSON bodies

const slotsFilePath = path.join(__dirname, "slots.json");

function readSlots() {
  const raw = fs.readFileSync(slotsFilePath, "utf-8");
  return JSON.parse(raw);
}

function writeSlots(slots) {
  fs.writeFileSync(slotsFilePath, JSON.stringify(slots, null, 2));
}

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Cridaa turf booking API running" });
});

// Auth (simple, for design)
app.post("/api/auth/login", (req, res) => {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  // In real app, you would sign JWT here.
  res.json({ token: "fake-token-" + name, user: { name } });
});

// GET: Fetch available slots
app.get("/api/slots", (req, res) => {
  try {
    const slots = readSlots();
    res.json(slots);
  } catch (err) {
    console.error("Error reading slots:", err);
    res.status(500).json({ message: "Error reading slots" });
  }
});

// POST: Book a slot
app.post("/api/slots/:id/book", (req, res) => {
  try {
    const slotId = parseInt(req.params.id, 10);
    const slots = readSlots();
    const slot = slots.find((s) => s.id === slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    slot.isBooked = true;
    writeSlots(slots);

    res.json({ message: "Slot booked successfully", slot });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ message: "Error booking slot" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
