"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ensureProfile } from "@/lib/profile";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

 useEffect(() => {
  async function loadUser() {
    const { data } = await supabase.auth.getUser();

    setUser(data.user);

    if (data.user) {
      await ensureProfile();
    }
  }

  loadUser();
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
      <div className="flex items-center gap-2">
       <span className="hidden font-semibold text-slate-700 lg:inline">
  {user.email}
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