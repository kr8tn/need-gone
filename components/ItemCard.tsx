import type { Item } from "@/models/Item";
import Link from "next/link";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  const statusConfig = {
    AVAILABLE: {
      label: "AVAILABLE",
      buttonText: "Request Pickup",
      buttonClassName:
        "mt-5 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center font-bold text-white hover:bg-slate-700",
      badgeClassName:
        "rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700",
    },
    PENDING: {
      label: "PENDING",
      buttonText: "Pickup Pending",
      buttonClassName:
        "mt-5 block w-full rounded-xl bg-yellow-100 px-4 py-3 text-center font-bold text-yellow-800",
      badgeClassName:
        "rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700",
    },
    COMPLETED: {
      label: "GONE",
      buttonText: "Picked Up",
      buttonClassName:
        "mt-5 block w-full rounded-xl bg-slate-100 px-4 py-3 text-center font-bold text-slate-500",
      badgeClassName:
        "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
    },
    GONE: {
      label: "GONE",
      buttonText: "Gone",
      buttonClassName:
        "mt-5 block w-full rounded-xl bg-slate-100 px-4 py-3 text-center font-bold text-slate-500",
      badgeClassName:
        "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
    },
  };

  const config =
    statusConfig[item.status as keyof typeof statusConfig] ??
    statusConfig.AVAILABLE;

  const pickupSummary =
    item.pickup_windows && item.pickup_windows.length > 0
      ? item.pickup_windows[0]
      : item.pickup_window || "Pickup window not set";

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
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
          <p className="mt-2 text-slate-600">{item.description}</p>
        </div>

        <span className={config.badgeClassName}>{config.label}</span>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p>📍 {item.public_location || item.location}</p>

        {item.pickup_type === "PORCH" && <p>🏡 {pickupSummary}</p>}

        {item.pickup_type === "PUBLIC_MEETUP" && (
          <p>🤝 Public meetup • {pickupSummary}</p>
        )}
      </div>

      {item.status === "AVAILABLE" ? (
        <Link href={`/items/${item.id}`} className={config.buttonClassName}>
          {config.buttonText}
        </Link>
      ) : (
        <div className={config.buttonClassName}>{config.buttonText}</div>
      )}

      <Link
        href={`/items/${item.id}`}
        className="mt-3 inline-block font-semibold text-slate-700 hover:text-slate-900"
      >
        View Details →
      </Link>
    </article>
  );
}