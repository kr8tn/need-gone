"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  requested_time: string;
  status: string;
  requester_id: string;
};

type Item = {
  id: string;
  title: string;
};

export default function RequestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [itemId, setItemId] = useState("");
  const [item, setItem] = useState<Item | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [message, setMessage] = useState("Loading requests...");

  useEffect(() => {
    async function loadRequests() {
      const { id } = await params;
      setItemId(id);

      const { data: itemData } = await supabase
        .from("items")
        .select("id, title")
        .eq("id", id)
        .single();

      setItem(itemData);

      const { data: requestData, error } = await supabase
        .from("pickup_requests")
        .select("*")
        .eq("item_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setRequests(requestData ?? []);
      setMessage("");
    }

    loadRequests();
  }, [params]);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <Link href="/my-listings" className="font-semibold text-slate-600">
          ← Back to My Listings
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-slate-900">
            Pickup Requests
          </h1>

          <p className="mt-2 text-slate-600">
            For: <span className="font-semibold">{item?.title}</span>
          </p>

          {message && <p className="mt-6 text-slate-600">{message}</p>}

          {!message && requests.length === 0 && (
            <p className="mt-6 text-slate-600">No pickup requests yet.</p>
          )}

          <div className="mt-8 space-y-4">
            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="font-bold text-slate-900">
                  Requested pickup window:
                </p>

                <p className="mt-1 text-slate-700">
                  {request.requested_time}
                </p>

                <p className="mt-3 text-sm font-semibold text-slate-500">
                  Status: {request.status}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Requester ID: {request.requester_id}
                </p>

                <div className="mt-4 flex gap-3">
                  <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">
                    Approve
                  </button>

                  <button className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700">
                    Decline
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}