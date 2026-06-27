import { items } from "@/data/items";

type ItemDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemDetailsPage({
  params,
}: ItemDetailsPageProps) {
  const { id } = await params;

  const item = items.find((item) => item.id === Number(id));

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
  <main className="min-h-screen bg-slate-50 px-6 py-10">
    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm">
      <img
        src={item.imageUrls[0]}
        alt={item.title}
        className="h-96 w-full object-cover"
      />

      <div className="p-8">
        <p className="text-sm font-semibold text-slate-500">Item ID: {id}</p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          {item.title}
        </h1>

        <div className="mt-4 space-y-1 text-slate-600">
          <p>📍 {item.city}</p>
          <p>⏰ {item.pickupWindow}</p>
          <p>🏷️ {item.status}</p>
        </div>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          {item.description}
        </p>

        <button className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-700">
          Request Pickup
        </button>
      </div>
    </div>
  </main>
);
}