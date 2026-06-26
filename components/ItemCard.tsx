import type { Item } from "@/models/Item";
import { Span } from "next/dist/trace";

type ItemCardProps = {
  item: Item;
};


export default function ItemCard({ item }: ItemCardProps) {
  
  let buttonText = "Request Pickup";

if (item.status === "pending") {
  buttonText = "Pickup Pending";
}

if (item.status === "claimed") {
  buttonText = "Gone";
}
  
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
     <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-slate-200">
  <span className="absolute left-3 top-3 z-10 rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
    FREE
  </span>

  <img
    src={item.imageUrls[0]}
    alt={item.title}
    className="h-full w-full object-cover"
  />
</div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
          <p className="mt-2 text-slate-600">{item.description}</p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          {item.status}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-slate-600">
        <p>📍 {item.city}</p>
        <p>⏰ {item.pickupWindow}</p>
      </div>

      <button className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-700">
        {buttonText}
      </button>
    </article>
  );
}