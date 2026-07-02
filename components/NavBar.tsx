import Link from "next/link";
import AuthButton from "@/components/Authbutton";
import NotificationLink from "@/components/NotificationLink";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo */}
       <Link
  href="/"
  className="whitespace-nowrap text-3xl font-black tracking-tight text-slate-900 hover:text-slate-700"
>
  need gone
</Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
         

          <Link
            href="/items/new"
            className="rounded-lg px-2 py-1 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            + Create Listing
          </Link>

          <Link
            href="/my-listings"
            className="rounded-lg px-2 py-1 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            My Listings
          </Link>

          <Link
            href="/my-requests"
            className="rounded-lg px-2 py-1 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            My Requests
          </Link>
          <NotificationLink />
          <Link
            href="/profile"
            className="rounded-lg px-2 py-1 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Profile
          </Link>

          <AuthButton />
        </div>
      </nav>
    </header>
  );
}