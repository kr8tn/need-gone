"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewItemPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  async function createItem(event: React.FormEvent) {
    event.preventDefault();

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be signed in to create a listing.");
      return;
    }

    const { error } = await supabase.from("items").insert({
      title,
      description,
      location,
      owner_id: userData.user.id,
      status: "AVAILABLE",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Listing created!");
    setTitle("");
    setDescription("");
    setLocation("");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-slate-900">Create Listing</h1>

        <form onSubmit={createItem} className="mt-8 space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Item title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the item"
            className="h-32 w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Pickup location"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700">
            Create Listing
          </button>
        </form>

        {message && <p className="mt-5 font-semibold text-slate-700">{message}</p>}
      </section>
    </main>
  );
}