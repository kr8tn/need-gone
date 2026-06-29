"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RequestPickupButtonProps = {
  item: {
    id: string;
    owner_id: string;
    pickup_windows?: string[] | null;
  };
};

export default function RequestPickupButton({
  item,
}: RequestPickupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [checkingApproval, setCheckingApproval] = useState(true);
  const [hasApprovedRequest, setHasApprovedRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedWindow, setSelectedWindow] = useState("");
  const [committed, setCommitted] = useState(false);

  useEffect(() => {
    async function checkApprovedRequest() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setCheckingApproval(false);
        return;
      }

      const { data } = await supabase
        .from("pickup_requests")
        .select("id")
        .eq("item_id", item.id)
        .eq("requester_id", userData.user.id)
        .eq("status", "APPROVED")
        .maybeSingle();

      if (data) {
        setHasApprovedRequest(true);
      }

      setCheckingApproval(false);
    }

    checkApprovedRequest();
  }, [item.id]);

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
      requested_time: selectedWindow,
      status: "PENDING",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "🎉 Pickup request sent! The giver will review your request. If approved, you’ll receive the exact pickup location and instructions."
    );
    setLoading(false);
  }

  if (checkingApproval) {
    return null;
  }

  if (hasApprovedRequest) {
    return null;
  }

  return (
    <>
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-lg font-bold text-slate-900">
          Choose a Pickup Window
        </h3>

        <div className="mt-4 space-y-3">
          {item.pickup_windows?.map((window) => (
            <label
              key={window}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
            >
              <input
                type="radio"
                name="pickupWindow"
                value={window}
                checked={selectedWindow === window}
                onChange={() => setSelectedWindow(window)}
              />

              <span>{window}</span>
            </label>
          ))}
        </div>

        <label className="mt-6 flex items-start gap-3">
          <input
            type="checkbox"
            checked={committed}
            onChange={(e) => setCommitted(e.target.checked)}
            className="mt-1"
          />

          <span className="text-sm text-slate-700">
            I understand I am committing to pick up this item during the selected
            pickup window. Repeated no-shows may lower my reputation.
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={requestPickup}
        disabled={loading || !selectedWindow || !committed}
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