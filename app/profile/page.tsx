"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ensureProfile } from "@/lib/profile";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [message, setMessage] = useState("Loading profile...");

  useEffect(() => {
    async function loadProfile() {
      const profile = await ensureProfile();

      if (!profile) {
        setMessage("You must be signed in to edit your profile.");
        return;
      }

      setDisplayName(profile.display_name ?? "");
      setCity(profile.city ?? "");
      setStateName(profile.state ?? "");
      setMessage("");
    }

    loadProfile();
  }, []);

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setMessage("Saving profile...");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be signed in.");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        city,
        state: stateName,
      })
      .eq("id", userData.user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Profile saved!");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
          ← Back home
        </Link>

        <h1 className="mt-6 text-4xl font-black text-slate-900">My Profile</h1>

        <p className="mt-2 text-slate-600">
          This information helps givers know who is requesting their items.
        </p>

        <form onSubmit={saveProfile} className="mt-8 space-y-5">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City, e.g. Ignacio"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

          <input
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            placeholder="State, e.g. CO"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700">
            Save Profile
          </button>
        </form>

        {message && <p className="mt-5 font-semibold text-slate-700">{message}</p>}
      </section>
    </main>
  );
}