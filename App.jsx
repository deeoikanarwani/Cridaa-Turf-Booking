import { useEffect, useState } from "react";
import LoginBar from "./components/LoginBar.jsx";
import SlotCard from "./components/SlotCard.jsx";

const API_BASE_URL = "http://localhost:5000";

function App() {
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentUser, setCurrentUser] = useState(null);

  const fetchSlots = async () => {
    try {
      setLoadingSlots(true);
      const res = await fetch(`${API_BASE_URL}/api/slots`);
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to load slots." });
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleLogin = async (name) => {
    try {
      // In real world call /api/auth/login with fetch
      // Here we just set local state to simulate auth
      setCurrentUser(name);
      setMessage({
        type: "success",
        text: `Welcome, ${name}. You can now book a slot.`
      });
    } catch (err) {
      setMessage({ type: "error", text: "Login failed." });
    }
  };

  const handleBook = async (id) => {
    if (!currentUser) {
      setMessage({ type: "error", text: "Please login before booking." });
      return;
    }

    try {
      setBookingId(id);
      setMessage({ type: "", text: "" });

      const res = await fetch(`${API_BASE_URL}/api/slots/${id}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // Authorization: `Bearer ${token}` in real app
        }
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Booking failed." });
      } else {
        setMessage({
          type: "success",
          text: `Slot booked successfully by ${currentUser}.`
        });
        fetchSlots();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Booking failed." });
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-6 bg-slate-900">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900/80 border border-slate-700 shadow-[0_20px_50px_rgba(15,23,42,0.9)] p-4 sm:p-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-50">
            Cridaa Turf Booking
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            View available time slots for Court A and book your preferred time.
          </p>
        </header>

        <LoginBar onLogin={handleLogin} currentUser={currentUser} />

        <section className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">
              Today · Court A
            </h2>
            <span className="text-[11px] text-slate-400">
              Demo aligned with Cridaa use-case
            </span>
          </div>

          {loadingSlots ? (
            <p className="text-sm text-slate-400">Loading slots...</p>
          ) : (
            <div className="flex flex-col gap-2">
              {slots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  onBook={handleBook}
                  booking={bookingId === slot.id}
                  disabled={bookingId === slot.id}
                />
              ))}
              {slots.length === 0 && (
                <p className="text-sm text-slate-500">
                  No slots configured. Please check backend.
                </p>
              )}
            </div>
          )}
        </section>

        <div className="mt-3 min-h-[20px] text-xs">
          {message.text && (
            <p
              className={
                message.type === "error"
                  ? "text-red-400"
                  : message.type === "success"
                  ? "text-emerald-400"
                  : "text-slate-400"
              }
            >
              {message.text}
            </p>
          )}
        </div>

        <footer className="mt-4 text-[11px] text-slate-500 text-center">
          Full Stack Intern assignment · Frontend: React + Tailwind · Backend:
          Express + JSON file.
        </footer>
      </div>
    </div>
  );
}

export default App;
