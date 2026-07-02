"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Notification = {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [message, setMessage] = useState("Loading notifications...");

  useEffect(() => {
    async function loadNotifications() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setMessage("You must be signed in to view notifications.");
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }
      const { error: updateError } = await supabase
  .from("notifications")
  .update({ is_read: true })
  .eq("user_id", userData.user.id)
  .eq("is_read", false);

if (updateError) {
  setMessage(updateError.message);
  return;
}

      setNotifications(
  (data ?? []).map((notification) => ({
    ...notification,
    is_read: true,
  }))
);
      setMessage("");
    }

    loadNotifications();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
          ← Back home
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-slate-900">Notifications</h1>

          <p className="mt-2 text-slate-600">
            Updates about your listings, requests, and pickups.
          </p>

          {message && <p className="mt-6 text-slate-600">{message}</p>}

          {!message && notifications.length === 0 && (
            <p className="mt-6 text-slate-600">No notifications yet.</p>
          )}

          <div className="mt-8 space-y-4">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      🔔 {notification.title}
                    </h2>

                    <p className="mt-2 text-slate-700">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>

                  {!notification.is_read && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                      New
                    </span>
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