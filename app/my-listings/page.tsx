"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Item = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  image_url: string | null;
};

export default function MyListingsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMyListings();
  }, []);

  async function loadMyListings() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be signed in to view your listings.");
      return;
    }

    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("owner_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setItems(data ?? []);
  }

  async function markGone(id: string) {
    const { error } = await supabase
      .from("items")
      .update({ status: "GONE" })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadMyListings();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black text-slate-900">My Listings</h1>

          <Link href="/" className="font-semibold text-slate-700">
            ← Back home
          </Link>
        </div>

        {message && <p className="mb-6 font-semibold text-slate-700">{message}</p>}

        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-28 w-28 rounded-xl object-cover"
                />
              ) : (
                <div className="h-28 w-28 rounded-xl bg-slate-200" />
              )}

              <div className="flex flex-1 items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                  <p className="text-slate-600">{item.location}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {item.status}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/items/${item.id}`}
                    className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700"
                  >
                    View
                  </Link>
                  <Link
  href={`/my-listings/${item.id}/requests`}
  className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700"
>
  Requests
</Link>

                  {item.status !== "GONE" && (
                    <button
                      onClick={() => markGone(item.id)}
                      className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white"
                    >
                      Mark Gone
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}