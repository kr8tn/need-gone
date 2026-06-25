import type { Item } from "@/models/Item";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow">
      <h2 className="text-xl font-bold">{item.title}</h2>

      <p>{item.city}</p>

      <p>{item.pickupWindow}</p>

      <p>{item.description}</p>

      <p>Status: {item.status}</p>
    </div>
  );
}