import ItemCard from "@/components/ItemCard";
import type { Item } from "@/models/Item"

const items: Item[] = [
  {
  id: 1,
  userId: 1,
  title: "Free 55 inch TV",
  description: "Works great. No remote.",
  city: "Ignacio",
  pickupWindow: "Today after 5 PM",
  status: "available",
},
{   id: 2,
    userId: 2,
    title: "Wood Bookshelf",
    description: "Solid wood. Heavy.",
    city: "Durango",
    pickupWindow: "Saturday Morning",
    status: "pending",
},
  {
    id: 3,
    userId: 3,
    title: "Kids Bicycle",
    description: "Needs new tires.",
    city: "Bayfield",
    pickupWindow: "This Weekend",
    status: "claimed",
  },
];


export default function Home() {
  return (
   <main className="mx-auto mt-10 max-w-3xl">
    <h1 className="mb-8 text-4xl font-bold">
      Need Gone
    </h1>

    {items.map((item) => (
  <ItemCard key={item.id} item={item} />
))}

  </main>
  );
}
