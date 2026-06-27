import Link from "next/link";
import { supabase } from "@/lib/supabase";

type ItemDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemDetailsPage({ params }: ItemDetailsPageProps) {
  const { id } = await params;

  const { data: item } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">Item not found</h1>
          <Link href="/" className="mt-6 inline-block font-semibold text-slate-700">
            ← Back home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
          ← Back to listings
        </Link>

        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="mt-6 h-96 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="mt-6 h-96 w-full rounded-2xl bg-slate-200" />
        )}

        <div className="mt-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900">{item.title}</h1>
            <p className="mt-3 text-lg text-slate-600">{item.location}</p>
          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            {item.status}
          </span>
        </div>

        <p className="mt-8 text-lg leading-8 text-slate-700">{item.description}</p>

        <button className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-bold text-white hover:bg-slate-700">
          Request Pickup
        </button>
      </section>
    </main>
  );
}