"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-700">
          Signed in as {user.email}
        </span>

        <button
          onClick={signOut}
          className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
    >
      Continue with Google
    </button>
  );
}