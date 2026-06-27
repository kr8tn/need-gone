"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewItemPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [pickupType, setPickupType] = useState("PORCH");
  const [publicLocation, setPublicLocation] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [pickupInstructions, setPickupInstructions] = useState("");
  const [pickupWindow, setPickupWindow] = useState("");
  const [meetupLocation, setMeetupLocation] = useState("");
  const [meetupTimeOptions, setMeetupTimeOptions] = useState("");

  async function createItem(event: React.FormEvent) {
    event.preventDefault();

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be signed in to create a listing.");
      return;
    }
let imageUrl = null;

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
    const { error } = await supabase.from("items").insert({
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
      pickup_window: pickupType === "PORCH" ? pickupWindow : null,

      meetup_location:
        pickupType === "PUBLIC_MEETUP" ? meetupLocation : null,

      meetup_time_options:
        pickupType === "PUBLIC_MEETUP"
          ? meetupTimeOptions
              .split("\n")
              .map((time) => time.trim())
              .filter(Boolean)
          : null,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Listing created!");
    setTitle("");
    setDescription("");
    setLocation("");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-slate-900">Create Listing</h1>

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
            placeholder="Pickup location"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <h2 className="text-xl font-bold text-slate-900">Pickup Setup</h2>
  <p className="mt-1 text-sm text-slate-600">
    Set the pickup rules up front so you do not have to message back and forth.
  </p>

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

      <input
        value={pickupWindow}
        onChange={(e) => setPickupWindow(e.target.value)}
        placeholder="Pickup window, e.g. Today 4 PM - 8 PM"
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
    <div className="mt-4 space-y-4">
      <input
        value={meetupLocation}
        onChange={(e) => setMeetupLocation(e.target.value)}
        placeholder="Meetup location, e.g. Ignacio Library parking lot"
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

      <textarea
        value={meetupTimeOptions}
        onChange={(e) => setMeetupTimeOptions(e.target.value)}
        placeholder={"Time options, one per line\nToday 5:30 PM\nTomorrow 12:00 PM\nTomorrow 6:00 PM"}
        className="h-32 w-full rounded-xl border border-slate-300 px-4 py-3"
      />
    </div>
  )}
</div>
          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700">
            Create Listing
          </button>
        </form>

        {message && <p className="mt-5 font-semibold text-slate-700">{message}</p>}
      </section>
    </main>
  );
}