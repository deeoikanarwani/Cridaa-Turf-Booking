import { useState } from "react";

export default function LoginBar({ onLogin, currentUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;
    onLogin(name.trim());
    setName("");
  };

  return (
    <section className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-600/50">
      <h2 className="text-sm font-semibold text-slate-100">Login</h2>
      <p className="text-xs text-slate-400 mt-1">
        Use any name to simulate a player login.
      </p>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 rounded-full bg-slate-900 border border-slate-600 text-slate-100 text-sm px-3 py-1.5 outline-none focus:border-emerald-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          onClick={handleLogin}
          className="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-950"
        >
          {currentUser ? "Switch" : "Login"}
        </button>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        {currentUser
          ? `Logged in as ${currentUser}`
          : "Not logged in. Booking will be disabled."}
      </p>
    </section>
  );
}
