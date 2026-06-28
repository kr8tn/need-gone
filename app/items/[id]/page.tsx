import Link from "next/link";
import { supabase } from "@/lib/supabase";
import RequestPickupButton from "@/components/RequestPickupButton";

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
<div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <h2 className="text-xl font-bold text-slate-900">Pickup Details</h2>

  <p className="mt-3 text-slate-700">
    <span className="font-semibold">Pickup type:</span>{" "}
    {item.pickup_type === "PUBLIC_MEETUP" ? "Public Meetup" : "Porch Pickup"}
  </p>

  <p className="mt-2 text-slate-700">
    <span className="font-semibold">Public location:</span>{" "}
    {item.public_location || item.location}
  </p>

  {item.pickup_type === "PORCH" && (
    <>
      <p className="mt-2 text-slate-700">
        <span className="font-semibold">Pickup window:</span>{" "}
        {item.pickup_window || "Not specified"}
      </p>

      <p className="mt-3 text-sm text-slate-500">
        Exact address and instructions are only shown after the giver approves your pickup request.
      </p>
    </>
  )}

  {item.pickup_type === "PUBLIC_MEETUP" && (
    <>
      <p className="mt-2 text-slate-700">
        <span className="font-semibold">Meetup location:</span>{" "}
        {item.meetup_location || "Not specified"}
      </p>

      {item.meetup_time_options?.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold text-slate-700">Available times:</p>
          <ul className="mt-2 list-inside list-disc text-slate-600">
            {item.meetup_time_options.map((time: string) => (
              <li key={time}>{time}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )}
</div>
        <RequestPickupButton item={item} />
      </section>
    </main>
  );
}