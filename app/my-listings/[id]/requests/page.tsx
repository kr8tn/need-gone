"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  requested_time: string;
  status: string;
  requester_id: string;
  profiles: {
    display_name: string | null;
    city: string | null;
    state: string | null;
    created_at: string | null;
  } | null;
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
  .select(`
    id,
    requested_time,
    status,
    requester_id,
   profiles!pickup_requests_requester_profile_fkey (
  display_name,
  city,
  state,
  created_at
)
  `)
  .eq("item_id", id)
  .order("created_at", { ascending: false });

  if (error) {
    setMessage(error.message);
    return;
  }

  setRequests(requestData ?? []);
  setMessage("");
}

useEffect(() => {
  loadRequests();
}, [params]);
async function approveRequest(requestId: string) {
  setMessage("Approving request...");

  const { error: approveError } = await supabase
    .from("pickup_requests")
    .update({ status: "APPROVED" })
    .eq("id", requestId);

  if (approveError) {
    setMessage(approveError.message);
    return;
  }

  const { error: declineError } = await supabase
    .from("pickup_requests")
    .update({ status: "DECLINED" })
    .eq("item_id", itemId)
    .neq("id", requestId);

  if (declineError) {
    setMessage(declineError.message);
    return;
  }

  const { error: itemError } = await supabase
    .from("items")
    .update({ status: "PENDING" })
    .eq("id", itemId);

  if (itemError) {
    setMessage(itemError.message);
    return;
  }

  setMessage("Request approved.");
  await loadRequests();
}

async function markPickedUp(requestId: string) {
  setMessage("Marking picked up...");

  const { error: requestError } = await supabase
    .from("pickup_requests")
    .update({ status: "COMPLETED" })
    .eq("id", requestId);

  if (requestError) {
    setMessage(requestError.message);
    return;
  }

  const { error: itemError } = await supabase
    .from("items")
    .update({ status: "COMPLETED" })
    .eq("id", itemId);

  if (itemError) {
    setMessage(itemError.message);
    return;
  }

  setMessage("Item marked as picked up.");
  await loadRequests();
}
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

                <div className="mt-4 rounded-xl bg-white p-4">
  <p className="font-bold text-slate-900">
    👤 {request.profiles?.display_name || "Need Gone User"}
  </p>

  <p className="mt-1 text-sm text-slate-600">
    📍{" "}
    {request.profiles?.city || request.profiles?.state
      ? `${request.profiles?.city || "Unknown city"}, ${
          request.profiles?.state || "Unknown state"
        }`
      : "Location not added yet"}
  </p>

  <p className="mt-1 text-xs text-slate-500">
    Member since{" "}
    {request.profiles?.created_at
      ? new Date(request.profiles.created_at).toLocaleDateString()
      : "recently"}
  </p>
</div>

                <div className="mt-4 flex gap-3">
  {request.status === "PENDING" && (
    <>
      <button
        onClick={() => approveRequest(request.id)}
        className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white"
      >
        Approve
      </button>

      <button className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700">
        Decline
      </button>
    </>
  )}

  {request.status === "APPROVED" && (
    <button
      onClick={() => markPickedUp(request.id)}
      className="rounded-xl bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
    >
      Mark Picked Up
    </button>
  )}

  {request.status === "COMPLETED" && (
    <p className="font-semibold text-green-700">
      ✅ Pickup completed
    </p>
  )}

  {request.status === "DECLINED" && (
    <p className="font-semibold text-slate-500">
      Request declined
    </p>
  )}
</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}