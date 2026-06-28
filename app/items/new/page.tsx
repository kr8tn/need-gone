"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import PickupWindowSelector from "@/components/pickupWindowSelector";

export default function NewItemPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [pickupType, setPickupType] = useState("PORCH");
  const [publicLocation, setPublicLocation] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [pickupInstructions, setPickupInstructions] = useState("");
  const [meetupLocation, setMeetupLocation] = useState("");
  const [createdItemId, setCreatedItemId] = useState<string | null>(null);

  const [pickupWindows, setPickupWindows] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("4:00 PM - 6:00 PM");

  function addPickupWindow() {
    const newWindow = `${selectedDay} ${selectedTime}`;

    if (pickupWindows.includes(newWindow)) return;

    setPickupWindows([...pickupWindows, newWindow]);
  }

  async function createItem(event: React.FormEvent) {
    event.preventDefault();

    setMessage("");
    setCreatedItemId(null);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be signed in to create a listing.");
      return;
    }

    if (pickupWindows.length === 0) {
      setMessage("Please add at least one pickup window.");
      return;
    }

    let imageUrl: string | null = null;

    if (imageFile) {
      const filePath = `${userData.user.id}/${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("item-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("item-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const { data: newItem, error } = await supabase
      .from("items")
      .insert({
        title,
        description,
        location,
        owner_id: userData.user.id,
        status: "AVAILABLE",
        image_url: imageUrl,
        pickup_type: pickupType,
        public_location: publicLocation,
        private_address: pickupType === "PORCH" ? privateAddress : null,
        pickup_instructions: pickupType === "PORCH" ? pickupInstructions : null,
        pickup_window: pickupType === "PORCH" ? pickupWindows.join(", ") : null,
        meetup_location: pickupType === "PUBLIC_MEETUP" ? meetupLocation : null,
        pickup_windows: pickupWindows,
        meetup_time_options:
          pickupType === "PUBLIC_MEETUP" ? pickupWindows : null,
      })
      .select("id")
      .single();

    if (error || !newItem) {
      setMessage(error?.message ?? "Something went wrong creating the listing.");
      return;
    }

    setCreatedItemId(newItem.id);
    setMessage("Listing is live!");

    setTitle("");
    setDescription("");
    setLocation("");
    setImageFile(null);
    setPublicLocation("");
    setPrivateAddress("");
    setPickupInstructions("");
    setMeetupLocation("");
    setPickupWindows([]);
    setSelectedDay("Today");
    setSelectedTime("4:00 PM - 6:00 PM");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-black text-slate-900">Create Listing</h1>

          <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
            ← Back home
          </Link>
        </div>

        <form onSubmit={createItem} className="mt-8 space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Item title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the item"
            className="h-32 w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="General location, e.g. Ignacio"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
          

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">Pickup Setup</h2>

            <div className="mt-4 grid gap-3">
              <label className="flex items-center gap-3 rounded-xl bg-white p-4">
                <input
                  type="radio"
                  name="pickupType"
                  value="PORCH"
                  checked={pickupType === "PORCH"}
                  onChange={(e) => setPickupType(e.target.value)}
                />
                <span>
                  <strong>Porch Pickup</strong>
                  <br />
                  <span className="text-sm text-slate-600">
                    Approved person gets the address and instructions.
                  </span>
                </span>
              </label>

              <label className="flex items-center gap-3 rounded-xl bg-white p-4">
                <input
                  type="radio"
                  name="pickupType"
                  value="PUBLIC_MEETUP"
                  checked={pickupType === "PUBLIC_MEETUP"}
                  onChange={(e) => setPickupType(e.target.value)}
                />
                <span>
                  <strong>Public Meetup</strong>
                  <br />
                  <span className="text-sm text-slate-600">
                    Meet at a public place with preset time options.
                  </span>
                </span>
              </label>
            </div>

            <input
              value={publicLocation}
              onChange={(e) => setPublicLocation(e.target.value)}
              placeholder="Public location shown on listing, e.g. Ignacio, CO"
              className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />

            {pickupType === "PORCH" && (
              <div className="mt-4 space-y-4">
                <input
                  value={privateAddress}
                  onChange={(e) => setPrivateAddress(e.target.value)}
                  placeholder="Private pickup address, only shown after approval"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

                <textarea
                  value={pickupInstructions}
                  onChange={(e) => setPickupInstructions(e.target.value)}
                  placeholder="Pickup instructions, e.g. On porch by blue chair"
                  className="h-24 w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>
            )}

            {pickupType === "PUBLIC_MEETUP" && (
              <input
                value={meetupLocation}
                onChange={(e) => setMeetupLocation(e.target.value)}
                placeholder="Meetup location, e.g. Ignacio Library parking lot"
                className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            )}

            <PickupWindowSelector
  pickupWindows={pickupWindows}
  setPickupWindows={setPickupWindows}
/>
          </div>

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700">
            Create Listing
          </button>
        </form>

        {message && <p className="mt-5 font-semibold text-slate-700">{message}</p>}

        {createdItemId && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            <h2 className="text-xl font-bold text-green-800">Listing is live!</h2>
            <p className="mt-2 text-green-700">
              Your item has been posted and people can now request pickup.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/items/${createdItemId}`}
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
              >
                View Listing
              </Link>

              <button
                type="button"
                onClick={() => {
                  setCreatedItemId(null);
                  setMessage("");
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
              >
                Create Another
              </button>

              <Link
                href="/"
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
              >
                Back Home
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}