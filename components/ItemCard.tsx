import type { Item } from "@/models/Item";
import Link from "next/link";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {

const statusConfig = {
  AVAILABLE: {
    buttonText: "Request Pickup",
    buttonDisabled: false,
    statusBadgeClassName: "rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700",
  },
  PENDING: {
    buttonText: "Join Backup Queue",
    buttonDisabled: false,
    statusBadgeClassName: "rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700",
  },
  GONE: {
    buttonText: "Gone",
    buttonDisabled: true,
    statusBadgeClassName: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
  },
};

  let buttonText = statusConfig[item.status].buttonText;
  let buttonDisabled = statusConfig[item.status].buttonDisabled;
  let statusBadgeClassName = statusConfig[item.status].statusBadgeClassName;
 
 

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-slate-200">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
          FREE
        </span>

        {item.image_url ? (
  <img
    src={item.image_url}
    alt={item.title}
    className="mb-4 h-48 w-full rounded-xl object-cover"
  />
) : (
  <div className="mb-4 h-48 rounded-xl bg-slate-200" />
)}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
          <p className="mt-2 text-slate-600">{item.description}</p>
        </div>

        <span className={statusBadgeClassName}>{item.status}</span>
      </div>

      <div className="mt-4 space-y-1 text-slate-600">
        <p>📍 {item.city}</p>
        <p>⏰ {item.pickupWindow}</p>
      </div>

     <button
  disabled={buttonDisabled}
  className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
>
  {buttonText}
</button>
<Link href={`/items/${item.id}`}>View Details →</Link>
    </article>
  );
}