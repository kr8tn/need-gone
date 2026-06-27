import ItemCard from "@/components/ItemCard";
import type { Item } from "@/models/Item";

const items: Item[] = [
  {
    id: 1,
    userId: 1,
    title: "Free 55 inch TV",
    description: "Works great. No remote. Bring two people to carry.",
    city: "Ignacio",
    pickupWindow: "Today after 5 PM",
    status: "AVAILABLE",
    imageUrls: ['/images/tv.jpg'],

  },
  {
    id: 2,
    userId: 2,
    title: "Wood Bookshelf",
    description: "Solid wood bookshelf. Heavy but in good shape.",
    city: "Durango",
    pickupWindow: "Saturday morning",
    status: "PENDING",
    imageUrls: ['/images/tv.jpg'],
  },
  {
    id: 3,
    userId: 3,
    title: "Kids Bicycle",
    description: "Needs new tires but frame is good.",
    city: "Bayfield",
    pickupWindow: "This weekend",
    status: "GONE",
    imageUrls: ['/images/tv.jpg'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Crayton Labs · Project #001
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Need Gone
          </h1>

          <p className="mt-4 max-w-2xl text-xl text-slate-600">
            A better way to give away useful stuff locally without Marketplace chaos.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
