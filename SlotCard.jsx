export default function SlotCard({ slot, onBook, booking, disabled }) {
  const isBooked = slot.isBooked;

  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-3.5 bg-slate-800/80 border-slate-700
      ${!isBooked ? "shadow-[0_10px_25px_rgba(15,23,42,0.8)]" : ""}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-slate-50">{slot.time}</p>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs ${
              isBooked ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {isBooked ? "Booked" : "Available"}
          </span>
          <span className="text-[11px] text-slate-400 px-2 py-0.5 rounded-full border border-slate-600">
            {slot.type}
          </span>
        </div>
      </div>
      <button
        type="button"
        disabled={isBooked || disabled}
        onClick={() => onBook(slot.id)}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition
          ${
            isBooked || disabled
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-emerald-500 text-slate-950 hover:bg-emerald-600"
          }`}
      >
        {isBooked ? "Booked" : booking ? "Booking..." : "Book"}
      </button>
    </div>
  );
}
