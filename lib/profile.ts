import { supabase } from "@/lib/supabase";

export async function ensureProfile() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return null;
  }

  const user = userData.user;

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "Need Gone User";

  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (existingProfile) {
    return existingProfile;
  }

  const { data: newProfile, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      display_name: displayName,
      city: "",
      state: "",
      avatar_url: user.user_metadata?.avatar_url || null,
    })
    .select("*")
    .single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return newProfile;
}