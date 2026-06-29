import ItemCard from "@/components/ItemCard";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AuthButton from "@/components/Authbutton";

export default async function Home() {
const { data: items } = await supabase
  .from("items")
  .select("*")
  .eq("status", "AVAILABLE")
  .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black tracking-tight text-slate-900">
            Need Gone
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-slate-600">
            Post it. Someone picks it up. It’s gone.
            <br />
            A simple way to give away useful stuff locally.
          </p>

          <Link
            href="/items/new"
            className="mt-8 inline-block rounded-xl bg-slate-900 px-8 py-4 text-lg font-bold text-white hover:bg-slate-700"
          >
            + Create Listing
          </Link>
          <AuthButton />
          <Link href="/my-listings">My Listings</Link>
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search free items..."
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-lg shadow-sm focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Listings
            </h2>
            <p className="mt-1 text-slate-600">
              {items?.length ?? 0} items currently available nearby
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items?.map((item) => (
  <ItemCard key={item.id} item={item} />
))}
        </div>
      </section>
    </main>
  );
}