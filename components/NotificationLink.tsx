"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NotificationLink() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function loadUnreadCount() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setUnreadCount(0);
        return;
      }

      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userData.user.id)
        .eq("is_read", false);

      if (error) {
        setUnreadCount(0);
        return;
      }

      setUnreadCount(count ?? 0);
    }

    loadUnreadCount();
  }, []);

  return (
    <Link
      href="/notifications"
      className="relative font-semibold text-slate-600 transition hover:text-slate-900"
    >
      🔔 Notifications

      {unreadCount > 0 && (
        <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}