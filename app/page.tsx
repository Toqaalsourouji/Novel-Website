"use client";

import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget; // capture immediately (before await)

    const formData = new FormData(form);

    const payload = {
      full_name: String(formData.get("full_name") ?? ""),
      email: String(formData.get("email") ?? ""),
      age_range: String(formData.get("age_range") ?? ""),
      region: String(formData.get("region") ?? ""),
      language_preference: String(formData.get("language_preference") ?? ""),
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("Saved. Thank you!");
      form.reset();
      return;
    }
    if (res.status === 409) {
      setMsg("This email is already registered.");
      return;
    }
    setMsg(data?.error || "Something went wrong.");
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Cyberpunk Novel: Weekly Chapter Unlocks</h1>
      <p className="text-gray-600">
        Enter your details to join early access. We use this only for reader statistics.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" name="full_name" placeholder="Full name" required />
        <input className="w-full border p-2 rounded" name="email" type="email" placeholder="Email" required />
        <input className="w-full border p-2 rounded" name="age_range" placeholder="Age range (temporary)" required />
        <input className="w-full border p-2 rounded" name="region" placeholder="Region / Country" required />

        <select className="w-full border p-2 rounded" name="language_preference" required defaultValue="">
          <option value="" disabled>Select language preference</option>
          <option value="AR">Arabic</option>
          <option value="EN">English</option>
          <option value="BOTH">Both</option>
        </select>

        <button className="w-full bg-black text-white p-2 rounded" type="submit">
          Join
        </button>
      </form>

      {msg && <p>{msg}</p>}
    </main>
  );
}
