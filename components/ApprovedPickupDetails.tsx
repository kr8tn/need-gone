"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ApprovedPickupDetailsProps = {
  item: {
    id: string;
    private_address: string | null;
    pickup_instructions: string | null;
  };
};

export default function ApprovedPickupDetails({ item }: ApprovedPickupDetailsProps) {
  const [isApproved, setIsApproved] = useState(false);
  const [approvedWindow, setApprovedWindow] = useState("");

  useEffect(() => {
    async function checkApproval() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data } = await supabase
        .from("pickup_requests")
        .select("requested_time")
        .eq("item_id", item.id)
        .eq("requester_id", userData.user.id)
        .eq("status", "APPROVED")
        .maybeSingle();

      if (data) {
        setIsApproved(true);
        setApprovedWindow(data.requested_time);
      }
    }

    checkApproval();
  }, [item.id]);

  if (!isApproved) {
    return (
      <p className="mt-3 text-sm text-slate-500">
        Exact address and instructions are only shown after the giver approves your pickup request.
      </p>
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
      <h3 className="text-xl font-bold text-green-800">
        🎉 Pickup Approved!
      </h3>

      <p className="mt-3 text-green-700">
        You have been approved to pick up this item.
      </p>

      <p className="mt-4 font-semibold text-green-900">Pickup window:</p>
      <p className="text-green-800">{approvedWindow}</p>

      <p className="mt-4 font-semibold text-green-900">Pickup address:</p>
      <p className="text-green-800">{item.private_address || "No address provided."}</p>

      <p className="mt-4 font-semibold text-green-900">Instructions:</p>
      <p className="text-green-800">
        {item.pickup_instructions || "No special instructions provided."}
      </p>
    </div>
  );
}