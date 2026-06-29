"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PickupRequest = {
  id: string;
  item_id: string;
  requested_time: string;
  status: string;
  created_at: string;
  items: {
    title: string;
    image_url: string | null;
    public_location: string | null;
    location: string | null;
    status: string;
  } | null;
};

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<PickupRequest[]>([]);
  const [message, setMessage] = useState("Loading your requests...");

  useEffect(() => {
    async function loadRequests() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setMessage("You must be signed in to view your requests.");
        return;
      }

      const { data, error } = await supabase
        .from("pickup_requests")
        .select(
          `
          id,
          item_id,
          requested_time,
          status,
          created_at,
          items (
            title,
            image_url,
            public_location,
            location,
            status
          )
        `
        )
        .eq("requester_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setRequests((data as PickupRequest[]) ?? []);
      setMessage("");
    }

    loadRequests();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
          ← Back to listings
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-slate-900">My Requests</h1>

          <p className="mt-2 text-slate-600">
            Track items you requested and see pickup details when approved.
          </p>

          {message && <p className="mt-6 text-slate-600">{message}</p>}

          {!message && requests.length === 0 && (
            <p className="mt-6 text-slate-600">
              You have not requested any items yet.
            </p>
          )}

          <div className="mt-8 grid gap-5">
            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    {request.items?.image_url && (
                      <img
                        src={request.items.image_url}
                        alt={request.items.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {request.items?.title ?? "Deleted item"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-600">
                          📍{" "}
                          {request.items?.public_location ||
                            request.items?.location ||
                            "Location not listed"}
                        </p>
                      </div>

                      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-bold text-slate-700">
                        {request.status}
                      </span>
                    </div>

                    <p className="mt-4 text-slate-700">
                      <span className="font-semibold">Requested window:</span>{" "}
                      {request.requested_time}
                    </p>

                    {request.status === "APPROVED" && (
                      <p className="mt-2 font-semibold text-green-700">
                        Approved — open the item to view pickup details.
                      </p>
                    )}

                    {request.status === "COMPLETED" && (
                      <p className="mt-2 font-semibold text-green-700">
                        Pickup completed.
                      </p>
                    )}

                    {request.status === "DECLINED" && (
                      <p className="mt-2 font-semibold text-slate-500">
                        This request was declined.
                      </p>
                    )}

                    <Link
                      href={`/items/${request.item_id}`}
                      className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                    >
                      View Item
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}