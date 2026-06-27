export default function NewItemPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Create Listing</h1>
        <p className="mt-2 text-slate-600">
          Post something you need gone.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block font-semibold text-slate-700">Title</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Free couch, old desk, scrap wood..."
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">Description</label>
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              rows={5}
              placeholder="Condition, pickup notes, anything important..."
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">City</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Ignacio"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">Pickup Window</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Today after 5 PM"
            />
          </div>

          <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-700">
            Create Listing
          </button>
        </form>
      </div>
    </main>
  );
}