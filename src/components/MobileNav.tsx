"use client";
import * as React from "react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="h-10 px-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
        Menu
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-100 rounded-l-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">DetailFlow</span>
              <button onClick={() => setOpen(false)} className="h-9 px-3 rounded-lg border border-gray-300">Close</button>
            </div>
            <a href="#features" className="py-2 text-gray-700" onClick={() => setOpen(false)}>Features</a>
            <a href="#pricing" className="py-2 text-gray-700" onClick={() => setOpen(false)}>Pricing</a>
            <a href="#faq" className="py-2 text-gray-700" onClick={() => setOpen(false)}>FAQ</a>
            <div className="mt-auto flex gap-2">
              <a href="/signin" className="flex-1 h-10 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center">Sign in</a>
              <a href="#pricing" className="flex-1 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">Start Free Trial</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


