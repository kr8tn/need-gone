"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type RequestPickupButtonProps = {
  item: {
    id: string;
    owner_id: string;
    pickup_window?: string | null;
  };
};

export default function RequestPickupButton({
  item,
}: RequestPickupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function requestPickup() {
    setLoading(true);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be signed in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("pickup_requests").insert({
      item_id: item.id,
      requester_id: userData.user.id,
      owner_id: item.owner_id,
      requested_time: item.pickup_window ?? "Not specified",
      status: "PENDING",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("✅ Pickup request submitted!");
    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={requestPickup}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-bold text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Request Pickup"}
      </button>

      {message && (
        <p className="mt-4 text-center font-semibold text-slate-700">
          {message}
        </p>
      )}
    </>
  );
}