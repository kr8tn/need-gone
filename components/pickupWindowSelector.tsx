"use client";

import { useState } from "react";

type PickupWindowSelectorProps = {
  pickupWindows: string[];
  setPickupWindows: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function PickupWindowSelector({
    
  pickupWindows,
  setPickupWindows,
}: PickupWindowSelectorProps) {
    const [selectedDay, setSelectedDay] = useState("Today");
    const [selectedTime, setSelectedTime] = useState("4:00 PM - 6:00 PM");
  function addPickupWindow() {
  const newWindow = `${selectedDay} • ${selectedTime}`;

  if (pickupWindows.includes(newWindow)) {
    return;
  }

  setPickupWindows([...pickupWindows, newWindow]);
}
    return (
    <div>
      <h3 className="font-bold text-slate-900">
    Pickup Windows
    </h3>
    <p className="mt-1 text-sm text-slate-600">
  Add one or more pickup windows. Requesters will choose one when requesting your item.
</p>
<div className="mt-4 grid gap-3 md:grid-cols-2">
<select
  value={selectedDay}
  onChange={(e) => setSelectedDay(e.target.value)}
  className="rounded-xl border border-slate-300 px-4 py-3"
>
  <option>Today</option>
  <option>Tomorrow</option>
</select>

 <select
  value={selectedTime}
  onChange={(e) => setSelectedTime(e.target.value)}
  className="rounded-xl border border-slate-300 px-4 py-3"
>
  <option>8:00 AM - 10:00 AM</option>
  <option>10:00 AM - 12:00 PM</option>
  <option>12:00 PM - 2:00 PM</option>
  <option>2:00 PM - 4:00 PM</option>
  <option>4:00 PM - 6:00 PM</option>
  <option>6:00 PM - 8:00 PM</option>
</select>
</div>
<button
  type="button"
  onClick={addPickupWindow}
  className="mt-4 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
>
  + Add Pickup Window
</button>
{pickupWindows.length > 0 && (
  <div className="mt-4 space-y-2">
    {pickupWindows.map((window) => (
      <div
        key={window}
        className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2"
      >
        <span>{window}</span>

        <button
          type="button"
          onClick={() =>
            setPickupWindows(
              pickupWindows.filter((w) => w !== window)
            )
          }
          className="font-semibold text-red-600"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  );
}